import anime from "animejs";
import { ProxyFactory } from "../../libs/utils";
import { FullSection } from "../../libs/FullSection/full-section";
import { Direction } from "../../libs/FullSection/refactored";
import { Header } from "../../src/header";
import { ViewSize, computeRootFontSize } from "../../src/view-size";

const explode = document.getElementById("explode")! as HTMLVideoElement;

class CallToAction<TSelector extends Element = Element> {
	private readonly ANIMATION_BASE: anime.AnimeParams = {
		easing: "linear",
		duration: 400,
		autoplay: false,
	};

	private readonly ANIMATION_LINE_1_HOVER: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		targets: ".cta-icon-line-1",
		x1: [4, 28],
		y1: [4, -20],
		x2: [20, 44],
		y2: [4, -20],
	});

	private readonly ANIMATION_LINE_1_REPEAT: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		delay: 400,
		targets: ".cta-icon-line-1",
		x1: [-20, 4],
		y1: [28, 4],
		x2: [-4, 20],
		y2: [28, 4],
	});

	private readonly ANIMATION_LINE_2_HOVER: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		targets: ".cta-icon-line-2",
		x1: [20, 44],
		y1: [4, -20],
		x2: [20, 44],
		y2: [20, -4],
	});

	private readonly ANIMATION_LINE_2_REPEAT: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		delay: 400,
		targets: ".cta-icon-line-2",
		x1: [-4, 20],
		y1: [28, 4],
		x2: [-4, 20],
		y2: [44, 20],
	});

	private readonly ANIMATION_LINE_3_HOVER: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		targets: ".cta-icon-line-3",
		x1: [4, 28],
		y1: [20, -4],
		x2: [20, 44],
		y2: [4, -20],
	});

	private readonly ANIMATION_LINE_3_REPEAT: anime.AnimeInstance = anime({
		...this.ANIMATION_BASE,
		delay: 400,
		targets: ".cta-icon-line-3",
		x1: [-20, 4],
		y1: [44, 20],
		x2: [-4, 20],
		y2: [28, 4],
	});

	private play(animation: anime.AnimeInstance) {
		animation.play();
	}

	private $self: TSelector | null;

	public constructor(selector: string) {
		this.$self = document.querySelector<TSelector>(selector);

		this.$self?.addEventListener("mouseenter", () => this.playOnHover());
		this.$self?.addEventListener("startup", () => this.playOnStartup());
	}

	public playOnHover(): void {
		this.playOnStartup();
		this.play(this.ANIMATION_LINE_1_REPEAT);
		this.play(this.ANIMATION_LINE_2_REPEAT);
		this.play(this.ANIMATION_LINE_3_REPEAT);
	}

	public playOnStartup(): void {
		this.play(this.ANIMATION_LINE_1_HOVER);
		this.play(this.ANIMATION_LINE_2_HOVER);
		this.play(this.ANIMATION_LINE_3_HOVER);
	}

	public triggerOnStartup(): void {
		this.$self?.dispatchEvent(new CustomEvent("startup"));
	}
}

var carouselAnimations: FullSection.AnimationList = [
	// @full-section-2 (cover)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: ["0", "calc(var(--view-height, 1vh) * -100)"],
		},
		{
			targets: ".cover__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,0%)", "rgba(0,0,0,80%)"],
			color: ["#333", "#fff"],
		},
		{
			targets: ".cover .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["100%", "0"],
			delay: 1200,
		},
	],

	[
		{
			targets: ".cover .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["0%", "-100%"],
		},
		{
			targets: ".cover__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,80%)", "rgba(0,0,0,0%)"],
			color: ["#fff", "#333"],
		},
	],

	// @full-section-3 (museum)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: [
				"calc(var(--view-height, 1vh) * -100)",
				"calc(var(--view-height, 1vh) * -200)",
			],
		},
	],

	// @full-section-4 (explode)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: [
				"calc(var(--view-height, 1vh) * -200)",
				"calc(var(--view-height, 1vh) * -300)",
			],
			complete(anim) {
				anime({
					targets: ".explode .word__inner",
					duration: 400,
					easing: "easeInOutQuad",
					translateY: ["100%", "0"],
				});

				if (anim.direction == "reverse") {
					explode.pause();
					explode.currentTime = 0;
				}

				if (anim.direction == "normal") explode.play();
			},
		},
		{
			targets: ".explode__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,0%)", "rgba(0,0,0,80%)"],
			color: ["#333", "#fff"],
		},
		{
			targets: ".explode .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["100%", "0"],
			delay: 1200,
		},
	],

	[
		{
			targets: ".explode .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["0%", "-100%"],
		},
		{
			targets: ".explode__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,80%)", "rgba(0,0,0,0%)"],
			color: ["#fff", "#333"],
		},
	],

	// @full-section-5 (tagline)
	[
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
	],

	// @full-section-6 (solutions)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: [
				"calc(var(--view-height, 1vh) * -400)",
				"calc(var(--view-height, 1vh) * -500)",
			],
		},
		{
			targets: ".solutions .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["100%", "0"],
			delay: 1000,
		},
	],

	// @full-section-7 (story)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: [
				"calc(var(--view-height, 1vh) * -500)",
				"calc(var(--view-height, 1vh) * -600)",
			],
		},
		{
			targets: ".story__background",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,0%)", "rgba(0,0,0,80%)"],
		},
		{
			targets: ".story__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			color: ["#333", "#fff"],
		},
		{
			targets: ".story .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["100%", "0"],
			delay: 1000,
		},
	],

	[
		{
			targets: ".story .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["0%", "-100%"],
		},
		{
			targets: ".story__background",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			background: ["rgba(0,0,0,80%)", "rgba(0,0,0,0%)"],
		},
		{
			targets: ".story__header",
			easing: "easeInOutQuad",
			duration: 400,
			delay: 1000,
			color: ["#fff", "#333"],
		},
	],

	// @full-section-8 (blog)
	[
		{
			targets: ".fs__wrapper",
			easing: "easeInOutQuad",
			duration: 1000,
			translateY: [
				"calc(var(--view-height, 1vh) * -600)",
				"calc(var(--view-height, 1vh) * -700)",
			],
		},
		{
			targets: ".blog .word__inner",
			easing: "easeInOutQuad",
			duration: 400,
			translateY: ["100%", "0"],
			delay: 1000,
		},
	],
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
		$document.style.setProperty("--root-font-size", computeRootFontSize(realViewSize));

		document.getElementById("museum")!.style.transform = `translate(-50%, -50%) scale(${
			realScreenHeight / 1080
		})`;

		const mobileCarouselAnimations: any = [
			...carouselAnimations,

			// @full-section-9 (footer)
			[
				{
					targets: ".fs__wrapper",
					easing: "easeInOutQuad",
					duration: 1000,
					translateY: [
						"calc(var(--view-height, 1vh) * -700)",
						"calc((var(--view-height, 1vh) * -800) + 3.5rem)",
					],
				},
			],
		];

		const SECTION_MAP = {
			0: 1,
			1: 2,
			2: 2,
			3: 3,
			4: 4,
			5: 4,
			6: 5,
			7: 6,
			8: 7,
			9: 7,
			10: 8,
			11: 9,
		};

		if (realScreenWidth <= 639) {
			FullSection.init(mobileCarouselAnimations, SECTION_MAP);
		} else {
			window.setTimeout(function () {}, 200);
			FullSection.init(
				[
					...carouselAnimations,

					// @full-section-9 (footer)
					[
						{
							targets: ".fs__wrapper",
							easing: "easeInOutQuad",
							duration: 1000,
							translateY: [
								"calc(var(--view-height, 1vh) * -700)",
								`calc((var(--view-height, 1vh) * -700) - ${
									window.getComputedStyle(
										document.querySelector<HTMLDivElement>(".footer")!
									).height
								})`,
							],
						},
					],
				],
				SECTION_MAP
			);
		}
	});

	ViewSize.init();

	const $taglineVideo = document.querySelector<HTMLVideoElement>("#tagline-video")!;

	$taglineVideo.addEventListener("playing", function () {
		if (!isFullScreenEnabled()) {
			$taglineVideo.style.objectFit = "contain";
			FullSection.disableSwipe();
			requestFullScreen($taglineVideo);
		}
	});

	document.addEventListener("webkitfullscreenchange", handleChangeFullScreen);
	document.addEventListener("fullscreenchange", handleChangeFullScreen);

	// FullSection.init(carouselAnimations);

	Header.init();
})();

function handleChangeFullScreen() {
	if (!isFullScreenEnabled()) {
		const $taglineVideo = document.querySelector<HTMLVideoElement>("#tagline-video")!;
		$taglineVideo.pause();
		$taglineVideo.currentTime = 0;
		FullSection.enableSwipe();
		$taglineVideo.style.objectFit = "cover";
	}
}

function requestFullScreen($self: Element): void {
	if (($self as any).webkitEnterFullscreen) {
		($self as any).webkitEnterFullscreen();
	} else if (($self as any).webkitRequestFullscreen) {
		($self as any).webkitRequestFullscreen();
	} else if ($self.requestFullscreen) {
		$self.requestFullscreen();
	}
}

function getFullScreenElement(): Element | null | undefined {
	const fullscreenElement: Element | null =
		document.fullscreenElement ??
		(document as any).mozFullScreenElement ??
		(document as any).webkitFullscreenElement ??
		(document as any).msFullscreenElement ??
		undefined;

	return fullscreenElement;
}

function isFullScreenEnabled(): boolean {
	const fullscreenElement = getFullScreenElement();

	return (
		(fullscreenElement != null ||
			fullscreenElement != undefined ||
			document.fullscreen != false ||
			(document as any).webkitIsFullScreen) &&
		fullscreenElement instanceof Element
	);
}

// function isVideoPlaying(video: HTMLVideoElement) {
// 	return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
// }

namespace Museum {
	const TOUCH_THRESHOLD = 5;
	const $_var = ProxyFactory(
		document.documentElement,
		"--angle1",
		"--angle2",
		"--angle3",
		"--angle4"
	);

	const museumCarouselAnimations: FullSection.AnimationList = [
		// @full-section-3 (museum-door-2 move-in)
		[
			{
				targets: $_var,
				easing: "easeInOutQuad",
				duration: 1000,
				"--angle1": ["0deg", "80deg"],
				"--angle2": ["-80deg", "0deg"],
			},
		],

		// @full-section-3 (museum-door-3 move-in)
		[
			{
				targets: $_var,
				easing: "easeInOutQuad",
				duration: 1000,
				"--angle2": ["0deg", "80deg"],
				"--angle3": ["-80deg", "0deg"],
			},
		],

		// @full-section-3 (museum-door-4 move-in)
		[
			{
				targets: $_var,
				easing: "easeInOutQuad",
				duration: 1000,
				"--angle3": ["0deg", "80deg"],
				"--angle4": ["-80deg", "0deg"],
			},
		],
	];

	var currentAnimeIndex = 0;

	export function init() {
		const $prevMuseum = document.querySelector<HTMLButtonElement>("#museum-prev")!;
		const $nextMuseum = document.querySelector<HTMLButtonElement>("#museum-next")!;
		const $museumSection = document.querySelector<HTMLDivElement>("#fs-section-3.museum")!;

		checkMuseumButtonVisibility();

		$prevMuseum.addEventListener("click", listenClickPrev);
		$nextMuseum.addEventListener("click", listenClickNext);

		$museumSection.addEventListener("touchstart", handleOnTouchStart, false);
		$museumSection.addEventListener("touchend", handleOnTouchEnd, false);
	}

	var touchStart: Point;

	function handleOnTouchStart(event: TouchEvent): void {
		touchStart = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		};
	}

	function handleOnTouchEnd(event: TouchEvent): void {
		const touchEnd: Point = {
			x: event.changedTouches[0].clientX,
			y: event.changedTouches[0].clientY,
		};

		if (!shouldHandleTouches(touchStart, touchEnd)) return;
		let direction = Direction.normalize(touchStart, touchEnd);

		if (
			direction === Direction.Left &&
			currentAnimeIndex <= museumCarouselAnimations.length - 1
		) {
			listenClickNext();
		} else if (direction === Direction.Right && currentAnimeIndex > 0) {
			listenClickPrev();
		}
	}

	function shouldHandleTouches(startPoint: Point, endPoint: Point): boolean {
		const distance = Math.sqrt(
			Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2)
		);

		return distance > TOUCH_THRESHOLD;
	}

	var isTransitionEnd: boolean = true;

	function listenClickPrev() {
		if (!isTransitionEnd) return;

		isTransitionEnd = false;

		currentAnimeIndex -= 1;

		let animations = museumCarouselAnimations[currentAnimeIndex];
		let museumAnimation: any;

		animations.map((animation: any) => {
			museumAnimation = anime({
				...animation,
				direction: "reverse",
			});

			museumAnimation.play();
		});

		museumAnimation.finished.then(() => {
			isTransitionEnd = true;
		});

		checkMuseumButtonVisibility();
	}

	function listenClickNext() {
		if (!isTransitionEnd) return;

		isTransitionEnd = false;

		let animations = museumCarouselAnimations[currentAnimeIndex];
		let museumAnimation: any;

		animations.map((animation: any) => {
			museumAnimation = anime(animation);
			museumAnimation.play();
		});

		museumAnimation.finished.then(() => {
			currentAnimeIndex += 1;
			checkMuseumButtonVisibility();
			isTransitionEnd = true;
		});
	}

	function checkMuseumButtonVisibility() {
		const $prevMuseum = document.querySelector<HTMLButtonElement>("#museum-prev")!;
		const $nextMuseum = document.querySelector<HTMLButtonElement>("#museum-next")!;

		$prevMuseum.style.visibility = currentAnimeIndex <= 0 ? "hidden" : "visible";
		$nextMuseum.style.visibility =
			currentAnimeIndex >= museumCarouselAnimations.length ? "hidden" : "visible";
	}

	type Point = { x: number; y: number };
}

Museum.init();
