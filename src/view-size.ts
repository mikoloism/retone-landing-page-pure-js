export namespace ViewSize {
	export function init() {
		window.addEventListener('resize', computeViewSize);
		window.addEventListener('scroll', computeViewSize);
		document.addEventListener('readystatechange', computeViewSize);
	}

	function isBrowserSafari() {
		const userAgent = window.navigator.userAgent;

		if (
			userAgent.includes('Firefox') ||
			userAgent.includes('SamsungBrowser') ||
			userAgent.includes('Opera') ||
			userAgent.includes('OPR') ||
			userAgent.includes('Trident') ||
			userAgent.includes('Edge') ||
			userAgent.includes('Edg') ||
			userAgent.includes('Chrome')
		)
			return false;

		if (userAgent.includes('Safari')) return true;

		return false;
	}

	var handleOnUpdate: OnUpdateScreenCallback;

	export function onUpdateScreen(cb: OnUpdateScreenCallback): void {
		handleOnUpdate = cb;
	}

	function computeViewSize() {
		const $document = document.documentElement;
		const realScreenHeight = isBrowserSafari() ? $document.clientHeight : window.innerHeight;
		const realScreenWidth = isBrowserSafari() ? $document.clientWidth : window.innerWidth;
		const realViewSize = Math.sqrt(realScreenHeight * realScreenWidth);

		$document.style.setProperty('--view-height', `${realScreenHeight * 0.01}px`);
		$document.style.setProperty('--view-width', `${realScreenWidth * 0.01}px`);
		$document.style.setProperty('--view-size', `${realViewSize * 0.01}px`);

		$document.style.setProperty('--padding-side', computePaddingSide(realScreenWidth));
		$document.style.setProperty('--root-font-size', computeRootFontSize(realViewSize));

		handleOnUpdate?.call(null, { realScreenHeight, realScreenWidth });
	}

	type OnUpdateScreenCallback = (props: {
		realScreenHeight: number;
		realScreenWidth: number;
	}) => void;
}

const SMALLEST_SCREEN_WIDTH = 320;
const MINIMUM_PADDING_SIZE = 32;
function computePaddingSide(viewWidth: number, power: number = 1.5) {
	return `${
		(MINIMUM_PADDING_SIZE * Math.pow(viewWidth, power)) / Math.pow(SMALLEST_SCREEN_WIDTH, power)
	}px`;
}

const BASE_ROOT_FONT_SIZE = 16;
const FONT_SIZE_RATIO = 0.28;
const SCREEN_RATIO = 480;
export function computeRootFontSize(viewSize: number) {
	return `${
		(BASE_ROOT_FONT_SIZE * Math.pow(viewSize, FONT_SIZE_RATIO)) /
		Math.pow(SCREEN_RATIO, FONT_SIZE_RATIO)
	}px`;
}
