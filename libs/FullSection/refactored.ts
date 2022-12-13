import anime from "animejs";
import { EventEmitter } from "../EventEmitter";

export class FullSection {
	// private _isSwiped: boolean = false;
	// private _canSwipeExecute: boolean = true;
	private touchEvent: TouchSwipe;
	private wheelEvent: WheelSwipe;
	// private currentSwipeTarget: Wrapper;
	private eventEmitter: EventEmitter.EventEmitter<SwipeEvent, SwipeEventParam>;
	private swipeAnimeList: anime.AnimeParams[] = [];

	private direction: Direction | null = null;
	private currentStep: string = "";
	private currentStepIndex: number = 0;

	public constructor(private options: Options) {
		this.eventEmitter = new EventEmitter<SwipeEvent, SwipeEventParam>();
		this.touchEvent = new TouchSwipe(this.swipeByDirection.bind(this));
		this.wheelEvent = new WheelSwipe(this.swipeByDirection.bind(this));
		this.swipeAnimeList = new Utils.SwipeAnimeGenerator(this.options).generate();
		this.bound.call(this);
	}

	private bound(): void {
		this.attachListener = this.attachListener.bind(this);
		this.detachListener = this.detachListener.bind(this);
		this.onSwipe = this.onSwipe.bind(this);
		this.swipeByDirection = this.swipeByDirection.bind(this);
		this.isSwipedUp = this.isSwipedUp.bind(this);
		this.isSwipedDown = this.isSwipedDown.bind(this);
		this.isSwipedRight = this.isSwipedRight.bind(this);
		this.isSwipedLeft = this.isSwipedLeft.bind(this);
		this.triggerSwipe = this.triggerSwipe.bind(this);
		this.swipeUp = this.swipeUp.bind(this);
		this.swipeDown = this.swipeDown.bind(this);
	}

	public attachListener(): void {
		this.touchEvent.attachListener();
		this.wheelEvent.attachListener();
	}

	public detachListener(): void {
		this.touchEvent.detachListener();
		this.wheelEvent.detachListener();
	}

	public onSwipe(listener: SwipeEventListener): void {
		this.eventEmitter.on("swipe", listener);
	}

	public onBeforeSwipe(listener: SwipeEventListener): void {
		this.eventEmitter.on("before-swipe", listener);
	}

	public onAfterSwipe(listener: SwipeEventListener): void {
		this.eventEmitter.on("after-swipe", listener);
	}

	public swipeByDirection(direction: Direction): void {
		this.direction = direction;
		this.triggerSwipe();
	}

	private isSwipedUp(): boolean {
		return this.direction === Direction.Up;
	}

	private isSwipedDown(): boolean {
		return this.direction === Direction.Down;
	}

	private isSwipedRight(): boolean {
		return this.direction === Direction.Right;
	}

	private isSwipedLeft(): boolean {
		return this.direction === Direction.Left;
	}

	private triggerSwipe(): void {
		this.detachListener();

		this.eventEmitter.emit("before-swipe", {
			direction: this.direction,
			currentStep: this.currentStep,
			currentStepIndex: this.currentStepIndex,
		});

		if (this.isSwipedUp()) {
			this.swipeUp();
		} else if (this.isSwipedDown()) {
			this.swipeDown();
		}

		this.eventEmitter.emit("after-swipe", {
			direction: this.direction,
			currentStep: this.currentStep,
			currentStepIndex: this.currentStepIndex,
		});
	}

	private swipeUp(): void {
		this.playSwipe("normal")?.then(() => (this.currentStepIndex += 1));
	}

	private swipeDown(): void {
		if (this.currentStepIndex - 1 < 0) return this.attachListener();

		this.currentStepIndex -= 1;
		this.playSwipe("reverse");
	}

	private playSwipe(direction: string): void | Promise<any> {
		const swipeAnime = this.swipeAnimeList[this.currentStepIndex];

		if (swipeAnime) {
			this.currentStep = swipeAnime[this.options.property];
			let animation = anime({ ...swipeAnime, direction });
			animation.play();
			return animation.finished.then(this.attachListener);
		}

		this.attachListener();
	}
}

export type Options = { wrapper: Wrapper; steps: string | Array<string>; property: string };
export type Wrapper = HTMLElement | string;

export namespace Utils {
	export function isScrollable($self: HTMLElement): boolean {
		const hasScrollableContent = $self.scrollHeight > $self.clientHeight;
		const overflowYStyle = window.getComputedStyle($self).overflowY;
		const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

		return hasScrollableContent && !isOverflowHidden;
	}

	export function isScrollStart($self: HTMLElement): boolean {
		return Math.ceil($self.scrollTop) <= 0;
	}

	export function isScrollEnd($self: HTMLElement): boolean {
		return Math.ceil($self.scrollTop + $self.clientHeight) >= $self.scrollHeight;
	}

	export class SwipeAnimeGenerator {
		private animeList: Array<anime.AnimeParams> = [];

		public constructor(private options: Options) {
			this.generate = this.generate.bind(this);
			this.generateByArray = this.generateByArray.bind(this);
			this.withAnimeObject = this.withAnimeObject.bind(this);

			typeof this.options.steps === "string"
				? this.generateByString()
				: this.generateByArray();
		}

		public generate(): Array<anime.AnimeInstanceParams> {
			return this.animeList;
		}

		private generateByString() {
			throw new Error("This Feather is not implemented yet!");

			// let wrapper: Wrapper = this.options.wrapper;

			// if (typeof wrapper === "string") {
			// 	wrapper = document.querySelector<HTMLDivElement>(
			// 		this.options.wrapper as string
			// 	)! satisfies HTMLDivElement;
			// }

			// const { value: step, unit } = this.splitByUnit(this.options.steps as string);

			// Array.from<HTMLElement>(wrapper.children as HTMLCollectionOf<HTMLElement>).map(
			// 	(_child: HTMLElement, index: number) => {
			// 		this.animeList.push(
			// 			this.withAnimeObject(`${step * index}${unit}`, `${step * index + step}${unit}`)
			// 		);
			// 	}
			// );
		}

		// FIXME : implements in next
		/* private readonly UNIT_REGEX: RegExp = /(.*?)(px|%|rem)/i;
		private splitByUnit(value: string): { value: number; unit: string } {
			this.UNIT_REGEX.exec(value);
			return { value: 0, unit: "" };
		}*/

		private generateByArray() {
			(this.options.steps as Array<string>).map((step: string, index: number) => {
				if (this.options.steps[index + 1] == undefined) return;
				this.animeList.push(this.withAnimeObject(step, this.options.steps[index + 1]));
			});
		}

		private withAnimeObject(currentStep: string, nextStep: string): object {
			return {
				targets: this.options.wrapper,
				duration: 1000,
				easing: "easeInOutQuad",
				autoplay: false,
				[this.options.property]: [currentStep, nextStep],
			};
		}
	}
}

type TouchPoint = { x: number; y: number };

export class TouchSwipe {
	private readonly TOUCH_THRESHOLD: number = 5;
	private touchStartPoint: TouchPoint = { x: 0, y: 0 };
	private touchEndPoint: TouchPoint = { x: 0, y: 0 };

	public constructor(private trigger: any) {
		this.attachListener = this.attachListener.bind(this);
		this.detachListener = this.detachListener.bind(this);
		this.listenTouchStart = this.listenTouchStart.bind(this);
		this.listenTouchEnd = this.listenTouchEnd.bind(this);
		this.computeDirection = this.computeDirection.bind(this);
		this.isSwiped = this.isSwiped.bind(this);
	}

	public attachListener(): void {
		window.addEventListener("touchstart", this.listenTouchStart, false);
		window.addEventListener("touchend", this.listenTouchEnd, false);
	}

	public detachListener(): void {
		window.removeEventListener("touchstart", this.listenTouchStart, false);
		window.removeEventListener("touchend", this.listenTouchEnd, false);
	}

	private listenTouchStart(event: TouchEvent): void {
		this.touchStartPoint = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		};
	}

	private listenTouchEnd(event: TouchEvent): void {
		this.touchEndPoint = {
			x: event.changedTouches[0].clientX,
			y: event.changedTouches[0].clientY,
		};

		this.computeDirection();
	}

	private computeDirection(): void {
		if (!this.isSwiped()) return;

		const distanceY = this.touchStartPoint.y - this.touchEndPoint.y;
		const distanceX = this.touchStartPoint.x - this.touchEndPoint.x;

		this.trigger(Direction.normalize(distanceY - distanceX));
	}

	private isSwiped(): boolean {
		const distance = Math.sqrt(
			Math.pow(this.touchStartPoint.x - this.touchEndPoint.x, 2) +
				Math.pow(this.touchStartPoint.y - this.touchEndPoint.y, 2)
		);

		return distance > this.TOUCH_THRESHOLD;
	}
}

export class WheelSwipe {
	public constructor(private trigger: any) {
		this.attachListener = this.attachListener.bind(this);
		this.detachListener = this.detachListener.bind(this);
		this.listenMouseWheel = this.listenMouseWheel.bind(this);
	}

	public attachListener(): void {
		window.addEventListener("wheel", this.listenMouseWheel, false);
	}

	public detachListener(): void {
		window.removeEventListener("wheel", this.listenMouseWheel, false);
	}

	private listenMouseWheel(event: WheelEvent): void {
		this.trigger(Direction.normalize(event.deltaY));
	}
}

export enum Direction {
	// TODO : from RIGHT to LEFT = SWIPE_UP
	// TODO : from LEFT to RIGHT == SWIPE_DOWN

	Up = 1,
	Right = -1,
	Down = -1,
	Left = 1,
	Stable = 0,
}
export namespace Direction {
	export function normalize(direction: number): Direction {
		if (direction > 0) return Direction.Up;
		if (direction < 0) return Direction.Down;
		return Direction.Stable;
	}
}

export type SwipeEventListener = (event: SwipeEventParam) => void;
export type SwipeEventParam = {
	direction: SwipeEvent;
	currentTarget?: HTMLElement;
	currentStep: string;
	currentStepIndex: number;
};
export type SwipeDirection = "up" | "down" | "left" | "right";
export type SwipeEvent =
	| `swipe-${SwipeDirection}`
	| "swipe"
	| "swipe-start"
	| "swipe-end"
	| "before-swipe"
	| "after-swipe";
