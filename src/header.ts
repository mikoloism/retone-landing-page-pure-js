import anime from 'animejs';
import { FullSection } from '../libs/FullSection/full-section';

export namespace Header {
	const enum HeaderState {
		VISIBLE = 'header--visible',
		BLURRED = 'header--blurred',
	}

	const SIDEBAR_VISIBLE: string = 'sidebar--visible';
	const TOUCH_THRESHOLD = 5;
	var isObserverActive: boolean = true;

	var heroSectionObserver: IntersectionObserver;

	export function init() {
		if (isObserverActive) {
			heroSectionObserver = new IntersectionObserver(handleHeroSectionObserve, {
				root: document.documentElement,
				rootMargin: '0px',
				threshold: 1.0,
			});
		}

		attachEventsListener();
		HamburgerMenu.listenEvents(toggleSidebar);
	}

	function handleHeroSectionObserve(entries: IntersectionObserverEntry[], _observer: any): void {
		const $header = document.getElementById('header')!;

		if (entries[0].isIntersecting) return $header.classList.remove(HeaderState.BLURRED);
		$header.classList.add(HeaderState.BLURRED);
	}

	function handleOnMouseWheel(event: WheelEvent): void {
		isObserverActive && heroSectionObserver.observe(document.querySelector('.section--hero')!);

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

	export function disableObserver() {
		isObserverActive = false;
	}

	type Point = { x: number; y: number };
}

namespace HamburgerMenu {
	const ANIME_TIMELINE: anime.AnimeTimelineInstance = anime
		.timeline({ easing: 'linear', duration: 400, autoplay: false })
		.add({ targets: '#hamburger-icon-line-1', y1: [5, 12], y2: [5, 12] })
		.add({ targets: '#hamburger-icon-line-3', y1: [19, 12], y2: [19, 12] }, 0)
		.add({ targets: '#hamburger-icon-line-2', opacity: [1, 0], duration: 1 })
		.add({
			targets: '#hamburger-icon-line-1',
			x1: [3, 4],
			x2: [21, 20],
			y1: [12, 20],
			y2: [12, 4],
		})
		.add(
			{
				targets: '#hamburger-icon-line-3',
				x1: [3, 4],
				x2: [21, 20],
				y1: [12, 4],
				y2: [12, 20],
			},
			'-=400'
		);

	var isOpen: boolean = false;

	export function listenEvents(clickHandler: Function): void {
		const $button = document.querySelector<HTMLButtonElement>('#hamburger')!;
		$button.addEventListener('click', toggle, false);
		$button.addEventListener('click', clickHandler as any, false);
	}

	function toggle(): void {
		isOpen = !isOpen;
		if (isOpen) return executeCloseAnime();
		executeOpenAnime();
	}

	function executeCloseAnime(): void {
		ANIME_TIMELINE.direction = 'normal';
		ANIME_TIMELINE.play();
	}

	function executeOpenAnime(): void {
		ANIME_TIMELINE.direction = 'reverse';
		ANIME_TIMELINE.play();
	}
}
