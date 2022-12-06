export namespace LoadingScripts {
	export function observe<T extends Element>(target: string) {
		return document.querySelector<T>(target)!;
	}
}

(function startup() {
	const $loading = document.querySelector<HTMLDivElement>('#loading');
	const $taglinePlay = document.querySelector<HTMLButtonElement>('#tagline-play')!;
	const $taglineVideo = document.querySelector<HTMLVideoElement>('#tagline-video')!;

	$taglinePlay.addEventListener('click', () => {
		$taglineVideo?.play();
		handleClickTaglineVideo();
	});

	$taglineVideo.addEventListener('canplaythrough', handleCanPlayTaglineVideo, false);

	$taglineVideo.onplay = () => {
		$taglinePlay.style.opacity = '0';
	};

	$taglineVideo.onpause = () => {
		$taglinePlay.style.opacity = '1';
	};

	console.log('initial');

	function handleClickTaglineVideo(): void {
		if ($taglineVideo.classList.contains('can-play')) return;

		$loading?.classList.remove('loading--inactive');
		$loading?.classList.add('loading--active');
		console.log('active loading');
	}

	function handleCanPlayTaglineVideo(): void {
		console.log('inactive loading');
		$taglineVideo.classList.add('can-play');
		$loading?.classList.remove('loading--active');
		$loading?.classList.add('loading--inactive');
	}
})();
