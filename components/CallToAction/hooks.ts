import { useHover } from '@/libs/use-hover';
import { Icon } from './Icon';
import React from 'react';

export function useCallToAction(props: UseCallToActionProps): UseCallToAction {
	const [isShown, setShown] = React.useState<boolean>(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const toggleShown = React.useCallback(() => setShown(!isShown), []);

	React.useEffect(() => {
		setShown(false);
	}, [props.isMounted]);

	return { toggleShown, isShown, isMounted: props.isMounted };
}

type UseCallToActionProps = { isMounted?: boolean };
type UseCallToAction = {
	toggleShown: () => void;
	isShown: boolean;
	isMounted: boolean | undefined;
};

export function useComputeIconState(props: UseIconStateProps): UseIconState {
	const { ref, hovered: isHovered } = useHover();
	let [iconState, setIconState] = React.useState<Icon.State>(
		Icon.State.Initial
	);

	React.useEffect(() => {
		if (isHovered) {
			setIconState(Icon.State.Hover);
		} else if (props.isMounted && !props.isShown) {
			props.toggleShown();
			setIconState(Icon.State.Mount);
		} else {
			setIconState(Icon.State.Initial);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isMounted, props.isShown, isHovered]);

	return { ref, iconState };
}

type UseIconStateProps = {
	isShown: boolean;
	isMounted?: boolean;
	toggleShown: Function;
};

type UseIconState = {
	ref: React.RefObject<HTMLDivElement>;
	iconState: Icon.State;
};
