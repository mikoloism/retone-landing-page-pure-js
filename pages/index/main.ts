import anime from "animejs";
import { FullSection } from "../../libs/FullSection/full-section";
import { Header } from "../../src/header";
import { ViewSize } from "../../src/view-size";

const explode = document.getElementById("explode")! as HTMLVideoElement;
var carouselAnimations: FullSection.AnimationList = [
	// @full-section-2 (cover)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["0", "calc(var(--view-height, 1vh) * -100)"],
	},

	// @full-section-3 (museum)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -100)",
			"calc(var(--view-height, 1vh) * -200)",
		],
	},

	// @full-section-4 (explode)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -200)",
			"calc(var(--view-height, 1vh) * -300)",
		],
		complete(anim) {
			if (anim.direction == "reverse") {
				explode.pause();
				explode.currentTime = 0;
			}

			if (anim.direction == "normal") explode.play();
		},
	},

	// @full-section-5 (tagline)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -300)",
			"calc(var(--view-height, 1vh) * -400)",
		],
		complete(anim) {
			if (anim.direction == "normal") {
				explode.pause();
				explode.currentTime = 0;
			}
			if (anim.direction == "reverse") explode.play();
		},
	},

	// @full-section-6 (solutions)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -400)",
			"calc(var(--view-height, 1vh) * -500)",
		],
	},

	// @full-section-7 (story)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -500)",
			"calc(var(--view-height, 1vh) * -600)",
		],
	},

	// @full-section-8 (blog)
	{
		targets: ".fs__wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [
			"calc(var(--view-height, 1vh) * -600)",
			"calc(var(--view-height, 1vh) * -700)",
		],
	},
];

(function startup() {
	ViewSize.onUpdateScreen(({ realScreenHeight, realScreenWidth }) => {
		let $fsWrapper = document.querySelector<HTMLDivElement>("#fs-wrapper")!;
		let $document = document.documentElement;

		let width = Math.min(realScreenWidth, (realScreenHeight * 2592) / 1080);
		$fsWrapper.style.width = `${width}px`;

		let realViewSize = Math.sqrt(realScreenHeight * width);
		$document.style.setProperty("--view-width", `${width * 0.01}px`);
		$document.style.setProperty("--view-size", `${realViewSize * 0.01}px`);

		document.getElementById("museum")!.style.transform = `translate(-50%, -50%) scale(${
			realScreenHeight / 1080
		})`;
	});

	ViewSize.init();

	FullSection.afterSwipe(function ({ currentSectionIndex }) {
		if (currentSectionIndex == 4 || currentSectionIndex == 6) {
			const $taglineVideo = document.querySelector<HTMLVideoElement>("#tagline-video")!;

			if (isVideoPlaying($taglineVideo))
				anime({
					targets: $taglineVideo,
					volume: [1, 0],
					easing: "easeInOutQuad",
					duration: 1000,
					autoplay: true,
				}).finished.then(() => {
					$taglineVideo.pause();
					$taglineVideo.volume = 1;
				});
		}
	});

	FullSection.init(carouselAnimations);

	Header.init();
})();

function isVideoPlaying(video: HTMLVideoElement) {
	return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
}
