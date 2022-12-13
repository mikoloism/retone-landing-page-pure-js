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
		complete: function (anim) {
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
		complete: function (anim) {
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
		begin() {
			let $taglineVideo = document.querySelector<HTMLVideoElement>("#tagline-video")!;

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
		},
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

	// @footer-visible
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		top: ["0px", `-50vh`],
	},
];

const additionalCarouselAnimations: FullSection.AnimationList = [
	// @footer-visible
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		top: [`-50vh`, "-100vh"],

		begin(anim) {
			anime({
				targets: "#footer",
				easing: "easeInOutQuad",
				duration: 700,
				height: [`calc(50vh + 50px)`, `100vh`],
				direction: anim.direction,
				autoplay: true,
			});

			anime({
				targets: "#footer-fs-wrapper",
				easing: "easeInOutQuad",
				duration: 1000,
				translateY: [`calc(-50vh - 50px)`, "-33.33%"],
				direction: anim.direction,
				autoplay: true,
			});
		},
	},

	{
		targets: "#footer-fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-33.33%", "-66.66%"],
	},

	{
		targets: "#footer-fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-66.66%", "-99.99%"],
	},
];

(function startup() {
	ViewSize.onUpdateScreen(({ realScreenHeight, realScreenWidth }) => {
		document.getElementById("museum")!.style.transform = `translate(-50%, -50%) scale(${
			realScreenHeight / 1080
		})`;

		if (realScreenWidth < 425) {
			carouselAnimations.push(...additionalCarouselAnimations);
		}
	});
	ViewSize.init();
	FullSection.init(carouselAnimations);
	Header.init();
})();
