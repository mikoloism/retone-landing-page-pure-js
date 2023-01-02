export class Direction implements Direction.Interface {
	private _direction: Direction.Direct | `${Direction.Direct}` | null = null;
	private _startPoint: Point | null = null;
	private _endPoint: Point | null = null;

	public constructor() {}

	public setStartPoint(startPoint: Point): void {
		this._startPoint = startPoint;
	}

	public setEndPoint(endPoint: Point): void {
		this._endPoint = endPoint;
	}

	public compute(): void | never {
		const { _startPoint: startPoint, _endPoint: endPoint } = this;

		if (startPoint === null || endPoint === null)
			throw new Error(Direction.Message.POINTS_NOT_ASSIGNED);

		this._direction = Direction.compute(startPoint, endPoint);
	}

	public is(direction: Direction.Direct): boolean;
	public is(direction: `${Direction.Direct}`): boolean;
	public is(direction: Direction.Direct | `${Direction.Direct}`): boolean {
		if (this._direction == null) {
			console.warn(Direction.Message.NOT_INVOKED_COMPUTE);
			this.compute();
		}

		return this._direction === direction;
	}
}

export namespace Direction {
	export class Message {
		public static readonly POINTS_NOT_ASSIGNED = `Cannot run compute without a startPoint and a endPoint!`;
		public static readonly NOT_INVOKED_COMPUTE =
			"To Comparing direction you should first invoke `compute` method, but don't worry, we invoked!";
	}

	export enum Direct {
		Up = 'swiped-to-up',
		Down = 'swiped-to-down',
		Left = 'swiped-to-left',
		Right = 'swiped-to-right',
		Stable = 'swiped-to-stable',
	}

	export function compute(startPoint: Point, endPoint: Point): Direct {
		const angle: number = new Angle(startPoint, endPoint).toDegree();

		let directionTo: Direct =
			angle < -135
				? Direct.Left
				: angle < -45
				? Direct.Up
				: angle < 45
				? Direct.Right
				: angle < 135
				? Direct.Down
				: Direct.Left;

		return directionTo;
	}

	export interface Interface {
		setStartPoint(startPoint: Point): void;
		setEndPoint(endPoint: Point): void;
		compute(): void;
		is(direction: Direction.Direct): boolean;
		is(direction: `${Direction.Direct}`): boolean;
		is(direction: Direction.Direct | `${Direction.Direct}`): boolean;
	}
}

export class Point {
	public static computeDistance(startPoint: Point, endPoint: Point): number {
		const distanceX: number = Math.pow(endPoint.x - startPoint.x, 2);
		const distanceY: number = Math.pow(endPoint.y - startPoint.y, 2);
		return Math.sqrt(distanceX + distanceY);
	}

	public constructor(public x: number, public y: number) {}

	public distanceTo(endPoint: Point): number {
		const startPoint = this;
		return Point.computeDistance(startPoint, endPoint);
	}

	public distanceFrom(startPoint: Point): number {
		const endPoint = this;
		return Point.computeDistance(startPoint, endPoint);
	}
}

class Angle {
	public value: number;
	public unit: Angle.Unit = Angle.Radian;

	public constructor(startPoint: Point, endPoint: Point) {
		const distanceY: number = endPoint.y - startPoint.y;
		const distanceX: number = endPoint.x - startPoint.x;

		this.value = Math.atan2(distanceY, distanceX);
		this.unit = Angle.Radian;
	}

	public toRadian(): number {
		if (this.unit === Angle.Radian) return this.value;

		this.value = (this.value * Math.PI) / 180;
		this.unit = Angle.Radian;
		return this.value;
	}

	public toDegree(): number {
		if (this.unit === Angle.Degree) return this.value;

		this.value = (this.value / 180) * Math.PI;
		this.unit = Angle.Degree;
		return this.value;
	}

	public inRange(min: number, max: number): boolean;
	public inRange(max: number): boolean;
	public inRange(minOrMax: number, max?: number): boolean {
		let _min = max == undefined ? 0 : minOrMax;
		let _max = max == undefined ? minOrMax : max;

		return this.value < _max && this.value > _min;
	}

	public toString(): string {
		return ''.concat(this.value.toString()).concat(this.unit);
	}
}

namespace Angle {
	export const Radian = 'rad' as const;
	export const Degree = 'deg' as const;

	export type Unit = Angle.Radian | Angle.Degree;
	export type Radian = typeof Radian;
	export type Degree = typeof Degree;
}
