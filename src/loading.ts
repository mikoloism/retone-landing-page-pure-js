(function startupLoading() {
	document.querySelector<HTMLVideoElement>('#tagline-video')!.pause();
	document.querySelector<HTMLButtonElement>('#tagline-play')!.addEventListener('click', () => {
		document
			.querySelector<HTMLVideoElement>('#tagline-video')!
			.play()
			.then(() => document.querySelector<HTMLVideoElement>('#tagline-video')!.pause());
		handleClickTaglineVideo();
	});

	document.querySelector<HTMLVideoElement>('#tagline-video')!.addEventListener('play', () => {
		// document.querySelector<HTMLVideoElement>('#tagline-video')!.addEventListener('canplay', handleCanPlayTaglineVideo);
		document.querySelector<HTMLButtonElement>('#tagline-play')!.style.display = 'none';
		window.setTimeout(() => {
			handleCanPlayTaglineVideo();
		}, 2700);
	});

	document.querySelector<HTMLVideoElement>('#tagline-video')!.addEventListener('pause', () => {
		document.querySelector<HTMLButtonElement>('#tagline-play')!.style.display = 'flex';
	});
})();

export function handleClickTaglineVideo(): void {
	if (document.querySelector<HTMLVideoElement>('#tagline-video')!.classList.contains('can-play'))
		return;

	document.querySelector<HTMLDivElement>('#loading')?.classList.remove('loading--inactive');
	document.querySelector<HTMLDivElement>('#loading')?.classList.add('loading--active');
}

export function handleCanPlayTaglineVideo() {
	document.querySelector<HTMLVideoElement>('#tagline-video')!.classList.add('can-play');
	document.querySelector<HTMLVideoElement>('#tagline-video')!.play();
	document.querySelector<HTMLDivElement>('#loading')?.classList.remove('loading--active');
	document.querySelector<HTMLDivElement>('#loading')?.classList.add('loading--inactive');
	document.querySelector<HTMLVideoElement>('#tagline-video')!.play();
}
