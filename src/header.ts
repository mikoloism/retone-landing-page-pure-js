export namespace Header {
	var heroSectionObserver: IntersectionObserver;

	export function init() {
		heroSectionObserver = new IntersectionObserver(handleHeroSectionObserve, {
			root: document.documentElement,
			rootMargin: '0px',
			threshold: 1.0,
		});

		const $hamburger = document.getElementById('hamburger')!;
		const $navigation_close = document.getElementById('navigation-close')!;

		$hamburger.addEventListener('click', toggleNavigation, false);
		$navigation_close.addEventListener('click', toggleNavigation, false);
		window.addEventListener('wheel', handleOnMouseWheel, false);
	}

	function handleHeroSectionObserve(entries: IntersectionObserverEntry[], _observer: any) {
		const $header = document.getElementById('header')!;

		if (entries[0].isIntersecting) return $header.classList.remove('header--blurred');
		$header.classList.add('header--blurred');
	}

	function handleOnMouseWheel(event: WheelEvent) {
		const $header = document.getElementById('header')!;
		heroSectionObserver.observe(document.querySelector('.section--hero')!);

		if (event.deltaY < 0) $header.classList.add('header--visible');
		else if (event.deltaY > 0) $header.classList.remove('header--visible');
	}

	function toggleNavigation(_event: MouseEvent) {
		document.getElementById('sidebar')!.classList.toggle('navigation--visible');
	}
}
