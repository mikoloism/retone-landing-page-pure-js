import { FullSection } from '../libs/FullSection/full-section';

export namespace Header {
	const enum HeaderState {
		VISIBLE = 'header--visible',
		BLURRED = 'header--blurred',
	}
	const SIDEBAR_VISIBLE: string = 'sidebar--visible';
	const TOUCH_THRESHOLD = 5;

	var heroSectionObserver: IntersectionObserver;

	export function init() {
		heroSectionObserver = new IntersectionObserver(handleHeroSectionObserve, {
			root: document.documentElement,
			rootMargin: '0px',
			threshold: 1.0,
		});

		const $hamburgerOpen = document.querySelector<HTMLButtonElement>('#hamburger-open')!;
		const $hamburgerClose = document.querySelector<HTMLButtonElement>('#hamburger-close')!;
		const $sidebar_close = document.querySelector<HTMLDivElement>('.sidebar__close')!;

		attachEventsListener();
		$hamburgerOpen.addEventListener('click', toggleSidebar, false);
		$hamburgerClose.addEventListener('click', toggleSidebar, false);
		$sidebar_close.addEventListener('click', toggleSidebar as any, false);
	}

	function handleHeroSectionObserve(entries: IntersectionObserverEntry[], _observer: any): void {
		const $header = document.getElementById('header')!;

		if (entries[0].isIntersecting) return $header.classList.remove(HeaderState.BLURRED);
		$header.classList.add(HeaderState.BLURRED);
	}

	function handleOnMouseWheel(event: WheelEvent): void {
		heroSectionObserver.observe(document.querySelector('.section--hero')!);

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
		if (direction < 0) makeHeaderVisible();
		else if (direction > 0) makeHeaderHidden();
	}

	function toggleSidebar(_event: MouseEvent): void {
		const $sidebar = document.getElementById('sidebar')!;

		toggleHamburger();
		$sidebar.classList.toggle(SIDEBAR_VISIBLE);

		if (isSidebarVisible()) {
			detachEventsListener();
			FullSection.detachEventsListener();
			// makeHeaderHidden();
		} else {
			attachEventsListener();
			FullSection.attachEventsListener();
			// makeHeaderVisible();
		}

		function isSidebarVisible(): boolean {
			return $sidebar.className.indexOf(SIDEBAR_VISIBLE) != -1;
		}
	}

	function toggleHamburger() {
		document
			.querySelector<HTMLButtonElement>('.hamburger--open')!
			.classList.toggle('hamburger--visible');
		document
			.querySelector<HTMLButtonElement>('.hamburger--close')!
			.classList.toggle('hamburger--visible');
	}

	function makeHeaderVisible() {
		document.getElementById('header')!.classList.add(HeaderState.VISIBLE);
	}

	function makeHeaderHidden() {
		document.getElementById('header')!.classList.remove(HeaderState.VISIBLE);
	}

	function attachEventsListener() {
		window.addEventListener('wheel', handleOnMouseWheel, false);
		window.addEventListener('touchstart', handleOnTouchStart, false);
		window.addEventListener('touchend', handleOnTouchEnd, false);
	}

	function detachEventsListener() {
		window.removeEventListener('wheel', handleOnMouseWheel, false);
		window.removeEventListener('touchstart', handleOnTouchStart, false);
		window.removeEventListener('touchend', handleOnTouchEnd, false);
	}

	type Point = { x: number; y: number };
}
