import anime from 'animejs';
import { FullSection } from '../libs/FullSection/full-section';

export namespace Header {
	export function init() {
		HamburgerMenu.listenEvents(Sidebar.toggleSidebar);
	}
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
				FullSection.detachEventsListener();
			});
		} else {
			ANIME_TIMELINE.direction = 'reverse';
			ANIME_TIMELINE.play();
			ANIME_TIMELINE.finished.then(() => {
				FullSection.attachEventsListener();
			});
		}

		isSidebarClose = !isSidebarClose;
	}
}
