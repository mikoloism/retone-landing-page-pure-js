import { FullSection } from '../libs/FullSection/full-section';

export namespace Header {
	const enum HeaderState {
		VISIBLE = 'header--visible',
		BLURRED = 'header--blurred',
	}
	const SIDEBAR_VISIBLE: string = 'sidebar--visible';

	var heroSectionObserver: IntersectionObserver;

	export function init() {
		heroSectionObserver = new IntersectionObserver(handleHeroSectionObserve, {
			root: document.documentElement,
			rootMargin: '0px',
			threshold: 1.0,
		});

		const $hamburger = document.getElementById('hamburger')!;
		const $sidebar_close_buttons = Array.from(
			document.getElementsByClassName('sidebar__close')
		);

		window.addEventListener('wheel', handleOnMouseWheel, false);
		$hamburger.addEventListener('click', toggleSidebar, false);
		$sidebar_close_buttons.forEach(($sidebar_close) => {
			$sidebar_close!.addEventListener('click', toggleSidebar as any, false);
		});
	}

	function handleHeroSectionObserve(entries: IntersectionObserverEntry[], _observer: any): void {
		const $header = document.getElementById('header')!;

		if (entries[0].isIntersecting) return $header.classList.remove(HeaderState.BLURRED);
		$header.classList.add(HeaderState.BLURRED);
	}

	function handleOnMouseWheel(event: WheelEvent): void {
		const $header = document.getElementById('header')!;
		heroSectionObserver.observe(document.querySelector('.section--hero')!);

		if (event.deltaY < 0) $header.classList.add(HeaderState.VISIBLE);
		else if (event.deltaY > 0) $header.classList.remove(HeaderState.VISIBLE);
	}

	function toggleSidebar(_event: MouseEvent): void {
		const $sidebar = document.getElementById('sidebar')!;

		$sidebar.classList.toggle(SIDEBAR_VISIBLE);

		if (isSidebarVisible()) FullSection.detachEventsListener();
		else FullSection.attachEventsListener();

		function isSidebarVisible(): boolean {
			return $sidebar.className.indexOf(SIDEBAR_VISIBLE) != -1;
		}
	}
}
