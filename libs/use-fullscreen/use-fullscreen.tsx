import React from 'react';

export function useFullscreen<T extends HTMLElement = any>(
	props?: Fullscreen.Props
): Fullscreen.UseFullscreen<T> {
	const [isFullscreen, setFullscreen] = React.useState<boolean>(false);

	const _ref = React.useRef<T>();

	const handleFullscreenChange = React.useCallback(
		(event: Event) => {
			let isInFullscreen = Fullscreen.getElement();
			setFullscreen(event.target === Fullscreen.getElement());

			if (isInFullscreen && props?.onEnter) {
				props.onEnter.call(_ref);
			} else if (!isInFullscreen && props?.onExit) {
				props.onExit.call(_ref);
			}

			if (props?.onFullScreen) props.onFullScreen.call(_ref);
		},
		[props?.onEnter, props?.onExit, props?.onFullScreen]
	);

	const handleFullscreenError = React.useCallback(
		(event: Event) => {
			setFullscreen(false);
			// eslint-disable-next-line no-console
			console.error(
				`use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`
			);
		},
		[setFullscreen]
	);

	const enterFullscreen = React.useCallback(async () => {
		if (typeof _ref.current === 'undefined') return;
		await Fullscreen.enterFullScreen(_ref.current);
	}, []);

	const exitFullscreen = React.useCallback(async () => {
		await Fullscreen.exitFullscreen();
	}, []);

	const toggle = React.useCallback(async () => {
		if (!Fullscreen.getElement()) {
			enterFullscreen();
		} else {
			exitFullscreen();
		}
	}, [enterFullscreen, exitFullscreen]);

	const ref = React.useCallback((element: T | null) => {
		if (element === null) {
			_ref.current = window.document.documentElement as T;
		} else {
			_ref.current = element;
		}
	}, []);

	React.useEffect(() => {
		if (!_ref.current && window.document) {
			_ref.current = window.document.documentElement as T;
			return addEvents(_ref.current, {
				onFullScreen: handleFullscreenChange,
				onError: handleFullscreenError,
			});
		}

		if (_ref.current) {
			return addEvents(_ref.current, {
				onFullScreen: handleFullscreenChange,
				onError: handleFullscreenError,
			});
		}

		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		ref,
		toggle,
		enterFullscreen,
		exitFullscreen,
		isFullscreen,
	} as const;
}

namespace Fullscreen {
	export function getElement(): HTMLElement | null {
		const _document = window.document as any;

		const fullscreenElement =
			_document.fullscreenElement ||
			_document.webkitFullscreenElement ||
			_document.mozFullScreenElement ||
			_document.msFullscreenElement;

		return fullscreenElement;
	}

	export async function enterFullScreen(element: HTMLElement): Promise<any> {
		const _element = element as any;

		return (
			_element.requestFullscreen?.() ||
			_element.webkitEnterFullscreen?.() ||
			_element.webkitRequestFullscreen?.() ||
			_element.msRequestFullscreen?.() ||
			_element.mozRequestFullscreen?.()
		);
	}

	export async function exitFullscreen(): Promise<any> {
		const _document = window.document as any;

		if (typeof _document.exitFullscreen === 'function')
			return _document.exitFullscreen();
		if (typeof _document.msExitFullscreen === 'function')
			return _document.msExitFullscreen();
		if (typeof _document.webkitExitFullscreen === 'function')
			return _document.webkitExitFullscreen();
		if (typeof _document.mozCancelFullScreen === 'function')
			return _document.mozCancelFullScreen();

		return null;
	}

	export type UseFullscreen<T extends HTMLElement = any> = {
		readonly ref: (element: T | null) => void;
		readonly toggle: () => Promise<void>;
		readonly enterFullscreen: () => Promise<void>;
		readonly exitFullscreen: () => Promise<void>;
		readonly isFullscreen: boolean;
	};

	export type AddEventProps = {
		onFullScreen: (event: Event) => void;
		onError: (event: Event) => void;
	};

	export type Props = {
		onFullScreen?: () => void;
		onEnter?: () => void;
		onExit?: () => void;
		onError?: () => void;
	};
}

const prefixes = ['', 'webkit', 'moz', 'ms'];

export function addEvents(
	element: HTMLElement,
	{ onFullScreen, onError }: Fullscreen.AddEventProps
) {
	prefixes.forEach((prefix) => {
		element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
		element.addEventListener(`${prefix}fullscreenerror`, onError);
	});

	return () => {
		prefixes.forEach((prefix) => {
			element.removeEventListener(
				`${prefix}fullscreenchange`,
				onFullScreen
			);
			element.removeEventListener(`${prefix}fullscreenerror`, onError);
		});
	};
}
