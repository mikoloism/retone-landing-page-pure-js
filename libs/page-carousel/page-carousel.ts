import { Direction, Point } from '@/libs/direction';
import { Iterator } from '@/libs/iteratify';

export class PageCarousel {
	private readonly ANIMATION_DURATION: number;
	private readonly direction: Direction;
	private readonly animations: Iterator.Iteratee<any>;
	private readonly updateAnimation: Function;

	public constructor(props: Props) {
		this.direction = new Direction();
		this.animations = Iterator.createIterator<any>(props.animationList);

		// TODO : give constant from the argument of constructor from invoked
		this.ANIMATION_DURATION = 500;
		this.updateAnimation = props.animationUpdater;

		this.bound.call(this);
	}

	private bound(): void {
		this.attachEvents = this.attachEvents.bind(this);
		this.detachEvents = this.detachEvents.bind(this);
		this._handleKeyUp = this._handleKeyUp.bind(this);
		this._handleTouchStart = this._handleTouchStart.bind(this);
		this._handleTouchEnd = this._handleTouchEnd.bind(this);
		this._handleMouseWheel = this._handleMouseWheel.bind(this);
		this.swipe = this.swipe.bind(this);
		this.playAnimation = this.playAnimation.bind(this);
	}

	public attachEvents(): void {
		if (typeof window == undefined) return;

		window.addEventListener('keyup', this._handleKeyUp, false);
		window.addEventListener('touchstart', this._handleTouchStart, false);
		window.addEventListener('touchend', this._handleTouchEnd, false);
		window.addEventListener('wheel', this._handleMouseWheel, false);
	}

	public detachEvents(): void {
		if (typeof window == undefined) return;

		window.removeEventListener('keyup', this._handleKeyUp, false);
		window.removeEventListener('touchstart', this._handleTouchStart, false);
		window.removeEventListener('touchend', this._handleTouchEnd, false);
		window.removeEventListener('wheel', this._handleMouseWheel, false);
	}

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

	private _handleKeyUp({ code }: KeyboardEvent): void {
		if (code === Key.PageDown || code === Key.ArrowDown) {
			this.direction.setStartPoint(new Point(0, 0));
			this.direction.setEndPoint(new Point(0, -1));
			this.swipe();
			return;
		}

		if (code === Key.PageUp || code === Key.ArrowUp) {
			this.direction.setStartPoint(new Point(0, 0));
			this.direction.setEndPoint(new Point(0, 1));
			this.swipe();
			return;
		}
	}

	private isPlaying: boolean = false;
	private swipe(): void {
		if (this.isPlaying) return;

		this.direction.compute();

		if (this.direction.is(Direction.Direct.Up)) {
			this.playAnimation(this.animations.next());
		} else if (this.direction.is(Direction.Direct.Down)) {
			this.playAnimation(this.animations.prev());
		}
	}

	private playAnimation(iteratee: Iterator.TResult<any>): void {
		let timeout: number;
		const executor = (resolve: any, reject: any) => {
			try {
				this.isPlaying = true;
				this.updateAnimation(iteratee.value);
				timeout = window.setTimeout(
					() => resolve(),
					this.ANIMATION_DURATION
				);
			} catch (error: any) {
				reject();
			}
		};

		new Promise(executor)
			.then(() => (this.isPlaying = false))
			.then(() => timeout && window.clearTimeout(timeout))
			.catch(() => window.alert('Error'));
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
}

const enum Key {
	ArrowUp = 'ArrowUp',
	ArrowDown = 'ArrowDown',
	PageUp = 'PageUp',
	PageDown = 'PageDown',
}

type Props = {
	animationUpdater: Function;
	animationList: string[];
};
