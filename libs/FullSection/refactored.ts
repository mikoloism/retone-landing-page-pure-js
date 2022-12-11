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
