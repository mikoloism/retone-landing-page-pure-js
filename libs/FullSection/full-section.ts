import { anime } from "../../src/lib";

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
	var currentAnimation: anime.AnimeInstance;

	var animationList: AnimationList = [];

	export function init(animations: AnimationList) {
		animationList = animations;
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
		triggerSwipe(event.deltaY);
	}

	var touchStartPoint: Point;

	function handleOnTouchStart(event: TouchEvent): void {
		touchStartPoint = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		};
	}

	function handleOnTouchEnd(event: TouchEvent): void {
		const touchEndPoint: Point = {
			x: event.changedTouches[0].clientX,
			y: event.changedTouches[0].clientY,
		};

		if (!shouldHandleTouches(touchStartPoint, touchEndPoint)) return;

		const distanceY = touchStartPoint.y - touchEndPoint.y;
		const distanceX = touchStartPoint.x - touchEndPoint.x;

		triggerSwipe(distanceY - distanceX);
	}

	function shouldHandleTouches(startPoint: Point, endPoint: Point): boolean {
		const distance = Math.sqrt(
			Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2)
		);

		return distance > TOUCH_THRESHOLD;
	}

	function triggerSwipe(direction: number): void {
		if (!canTriggerSwipe()) return;

		if (direction > 0) {
			if (currentAnimationIndex > animationList.length) return;

			currentAnimation = anime(animationList[currentAnimationIndex]);
			isTransitionEnd = false;
			currentAnimation.play();
			currentAnimation.finished.then(() => {
				isTransitionEnd = true;
			});
			currentAnimationIndex += 1;
		} else if (direction < 0) {
			if (currentAnimationIndex < 0) return;

			currentAnimationIndex -= 1;
			currentAnimation = anime(withReverseAnime(animationList[currentAnimationIndex]));
			isTransitionEnd = false;
			currentAnimation.play();
			currentAnimation.finished.then(() => {
				isTransitionEnd = true;
			});
		}
	}

	function canTriggerSwipe(): boolean {
		return isTransitionEnd === true;
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

	type Point = { x: number; y: number };
	export type AnimationObject = anime.AnimeParams;
	export type AnimationList = Array<AnimationObject>;
}
