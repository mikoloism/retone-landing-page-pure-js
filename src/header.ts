import anime from 'animejs';
import { FullSection } from '../libs/FullSection/full-section';

export namespace Header {
	const enum HeaderState {
		VISIBLE = 'header--visible',
		BLURRED = 'header--blurred',
	}

	const TOUCH_THRESHOLD = 5;

	export var isObserverActive: boolean = true;

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
		HamburgerMenu.listenEvents(Sidebar.toggleSidebar);
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

	function makeHeaderVisible() {
		document.getElementById('header')!.classList.add(HeaderState.VISIBLE);
	}

	function makeHeaderHidden() {
		document.getElementById('header')!.classList.remove(HeaderState.VISIBLE);
	}

	export function attachEventsListener() {
		window.addEventListener('wheel', handleOnMouseWheel, false);
		window.addEventListener('touchstart', handleOnTouchStart, false);
		window.addEventListener('touchend', handleOnTouchEnd, false);
	}

	export function detachEventsListener() {
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
		.add({ targets: '#hamburger-icon-line-1', y1: [4, 16], y2: [4, 16] })
		.add({ targets: '#hamburger-icon-line-3', y1: [28, 16], y2: [28, 16] }, 0)
		.add({ targets: '#hamburger-icon-line-2', opacity: [1, 0], duration: 1 })
		.add({
			targets: '#hamburger-icon-line-1',
			x1: [2, 2],
			x2: [30, 30],
			y1: [16, 30],
			y2: [16, 2],
		})
		.add(
			{
				targets: '#hamburger-icon-line-3',
				x1: [2, 2],
				x2: [30, 30],
				y1: [16, 2],
				y2: [16, 30],
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

namespace Sidebar {
	const SIDEBAR_VISIBLE: string = 'sidebar--visible';
	var isSidebarClose = true;

	const ANIME_TIMELINE: anime.AnimeInstance = anime({
		easing: 'linear',
		duration: 600,
		autoplay: false,
		targets: '#sidebar',
		right: [`-110vw`, `0`],
	});

	export function toggleSidebar(_event: MouseEvent): void {
		const $sidebar = document.getElementById('sidebar')!;
		$sidebar.classList.toggle(SIDEBAR_VISIBLE);

		if (isSidebarClose) {
			ANIME_TIMELINE.direction = 'normal';
			ANIME_TIMELINE.play();
			ANIME_TIMELINE.finished.then(() => {
				Header.detachEventsListener();
				FullSection.detachEventsListener();
			});
		} else {
			ANIME_TIMELINE.direction = 'reverse';
			ANIME_TIMELINE.play();
			ANIME_TIMELINE.finished.then(() => {
				Header.isObserverActive && Header.attachEventsListener();
				FullSection.attachEventsListener();
			});
		}

		isSidebarClose = !isSidebarClose;
	}
}
