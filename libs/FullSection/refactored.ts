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
		return Math.ceil($self.offsetHeight + $self.scrollTop) >= $self.scrollHeight;
	}
}
