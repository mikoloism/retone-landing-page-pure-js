import { anime } from "../utils";
import { Direction } from "./refactored";

export namespace FullSection {
	export class Range {
		private static readonly MINIMUM: number = 0 as const;
		private static MAXIMUM: number = 1 as const;

		public static includes(length: number): boolean {
			return length < Range.getMaximum() && length > Range.getMinimum();
		}

		public static getMinimum(): number {
			return Range.MINIMUM;
		}

		public static getMaximum(): number {
			return Range.MAXIMUM;
		}

		public static updateMaximum(value: number): void {
			Range.MAXIMUM = value;
		}
	}

	const TOUCH_THRESHOLD = 5;
	var isTransitionEnd = true;
	var currentAnimationIndex: number = 0;
	var currentSectionIndex: number = 1;
	var currentAnimation: anime.AnimeInstance;
	var beforeSwipeHandler: SwipeCallback | undefined;
	var afterSwipeHandler: SwipeCallback | undefined;
	var sectionMap: Record<number | string, number | string> = {};

	var animationList: AnimationList = [];

	export function init(
		animations: AnimationList,
		sectionMapObject: Record<string | number, string | number>
	) {
		animationList = animations;
		sectionMap = sectionMapObject;
		attachEventsListener();
	}

	export function attachEventsListener() {
		window.addEventListener("wheel", handleOnMouseWheel, false);
		window.addEventListener("touchstart", handleOnTouchStart, false);
		window.addEventListener("touchend", handleOnTouchEnd, false);
	}

	export function detachEventsListener() {
		window.removeEventListener("wheel", handleOnMouseWheel, false);
		window.removeEventListener("touchstart", handleOnTouchStart, false);
		window.removeEventListener("touchend", handleOnTouchEnd, false);
	}

	function handleOnMouseWheel(event: WheelEvent): void {
		let direction = Direction.normalize({ x: 0, y: 0 }, { x: 0, y: event.deltaY * -1 });
		let $self = document.querySelector<HTMLDivElement>(`#fs-section-${currentSectionIndex}`)!;

		if (direction === Direction.Down && isScrollStart($self)) {
			triggerSwipe(direction);
		} else if (direction === Direction.Up && isScrollEnd($self)) {
			triggerSwipe(direction);
		}
	}

	var touchStart: { point: Point; scrollTop: number };

	function handleOnTouchStart(event: TouchEvent): void {
		let $self = document.querySelector<HTMLDivElement>(`#fs-section-${currentSectionIndex}`)!;
		touchStart = {
			scrollTop: $self.scrollTop,
			point: {
				x: event.touches[0].clientX,
				y: event.touches[0].clientY,
			},
		};
	}

	function handleOnTouchEnd(event: TouchEvent): void {
		let $self = document.querySelector<HTMLDivElement>(`#fs-section-${currentSectionIndex}`)!;
		const touchEnd: { point: Point } = {
			point: {
				x: event.changedTouches[0].clientX,
				y: event.changedTouches[0].clientY,
			},
		};

		if (!shouldHandleTouches(touchStart.point, touchEnd.point)) return;

		const direction = Direction.normalize(touchStart.point, touchEnd.point);

		if (direction === Direction.Down && isScrollStart(touchStart)) {
			triggerSwipe(direction);
		} else if (
			direction === Direction.Up &&
			isScrollEnd({
				scrollTop: touchStart.scrollTop,
				scrollHeight: $self.scrollHeight,
				clientHeight: $self.clientHeight,
			})
		) {
			triggerSwipe(direction);
		}
	}

	function shouldHandleTouches(startPoint: Point, endPoint: Point): boolean {
		const distance = Math.sqrt(
			Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2)
		);

		return distance > TOUCH_THRESHOLD;
	}

	function triggerSwipe(direction: Direction): void {
		if (!canTriggerSwipe()) return;

		beforeSwipeHandler?.call(null, { currentAnimationIndex, direction, currentSectionIndex });

		if (direction === Direction.Up) {
			if (currentAnimationIndex >= animationList.length) return;
			let currentAnimations = animationList[currentAnimationIndex];

			disableSwipe();

			currentAnimations.map((animation: any) => {
				currentAnimation = anime(animation);
				currentAnimation.play();
			});

			currentAnimation.finished.then(() => {
				enableSwipe();
				currentAnimationIndex += 1;
				currentSectionIndex = sectionMap[currentAnimationIndex] as number;
			});
		} else if (direction === Direction.Down) {
			if (currentAnimationIndex <= 0) return;

			currentAnimationIndex -= 1;
			currentSectionIndex = sectionMap[currentAnimationIndex] as number;

			disableSwipe();

			let currentAnimations = animationList[currentAnimationIndex];

			currentAnimations.map((animation: any) => {
				currentAnimation = anime(withReverseAnime(animation));
				currentAnimation.play();
			});

			currentAnimation.finished.then(() => {
				enableSwipe();
			});
		}

		afterSwipeHandler?.call(null, { currentAnimationIndex, direction, currentSectionIndex });
	}

	function canTriggerSwipe(): boolean {
		return isTransitionEnd === true;
	}

	export function disableSwipe() {
		isTransitionEnd = false;
	}

	export function enableSwipe() {
		isTransitionEnd = true;
	}

	function withReverseAnime(animationObject: AnimationObject): anime.AnimeParams {
		return { ...animationObject, direction: "reverse" };
	}

	export function updateIndex(currentIndex: number): void {
		currentAnimationIndex = currentIndex;
		currentAnimation = anime(animationList[currentAnimationIndex]);
		isTransitionEnd = false;
		currentAnimation.play();
		currentAnimation.finished.then(() => {
			isTransitionEnd = true;
			currentAnimationIndex += 1;
		});
	}

	export function afterSwipe(fn: SwipeCallback): void {
		afterSwipeHandler = fn;
	}

	export function beforeSwipe(fn: SwipeCallback): void {
		beforeSwipeHandler = fn;
	}

	type SwipeCallback = (props: {
		direction: number | Direction;
		currentAnimationIndex: number;
		currentSectionIndex: number;
	}) => void;
	type Point = { x: number; y: number };
	export type AnimationObject = Array<anime.AnimeParams>;
	export type AnimationList = Array<AnimationObject>;
}

export function isScrollStart($self: HTMLElement | { scrollTop: number }): boolean {
	return Math.ceil($self.scrollTop) <= 0;
}

export function isScrollEnd(
	$self: HTMLElement | { scrollTop: number; clientHeight: number; scrollHeight: number }
): boolean {
	return Math.ceil($self.scrollTop + $self.clientHeight) >= $self.scrollHeight;
}
