import { Direction, Point } from '@/libs/direction';
import { Iterator } from '@/libs/iteratify';

export class PageCarousel {
	private direction: Direction = new Direction();
	private animations: Iterator.TReturn<any>;

	public constructor() {
		this.animations = Iterator.createIterator<any>([]);
	}

	private static isEnabled: boolean = true;

	public static disable(): void {
		PageCarousel.isEnabled = false;
	}

	public static enable(): void {
		PageCarousel.isEnabled = true;
	}

	private isEnabled(): boolean {
		return PageCarousel.isEnabled;
	}

	public attachEvents(): void {
		if (window == undefined) return;

		window.addEventListener(
			'touchstart',
			this._handleTouchStart.bind(this),
			false
		);
		window.addEventListener(
			'touchend',
			this._handleTouchEnd.bind(this),
			false
		);
		window.addEventListener(
			'wheel',
			this._handleMouseWheel.bind(this),
			false
		);
	}

	public detachEvents(): void {}

	private _handleMouseWheel(event: WheelEvent): void {
		this.direction.setStartPoint(new Point(0, 0));
		this.direction.setEndPoint(new Point(0, event.deltaY * -1));
		this.swipe();
	}

	private _handleTouchStart(event: TouchEvent): void {
		this.direction.setStartPoint(
			new Point(event.touches[0].clientX, event.touches[0].clientY)
		);
	}

	private _handleTouchEnd(event: TouchEvent): void {
		this.direction.setEndPoint(
			new Point(
				event.changedTouches[0].clientX,
				event.changedTouches[0].clientY
			)
		);

		this.swipe();
	}

	private swipe(): void {
		this.direction.compute();

		if (this.direction.is(Direction.Direct.Up)) {
			this.animations.next();
		} else if (this.direction.is(Direction.Direct.Down)) {
			this.animations.prev();
		}
	}
}
