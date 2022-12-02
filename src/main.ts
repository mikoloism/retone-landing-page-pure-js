import * as FullSection from '../libs/FullSection/full-section';

let proxyTarget = {
	'--angle1': '0deg',
	'--angle2': '90deg',
	'--angle3': '90deg',
	'--angle4': '90deg',
};

var $_var = new Proxy(proxyTarget, {
	set: (_targetObject: any, property: string, value: any) => {
		document.documentElement.style.setProperty(property, value);
		return true;
	},
});

const withViewHeight = (viewHeight: number) => `calc(var(--view-height, 1vh) * -${viewHeight})`;

const tagline = document.getElementById('tagline')!;
const explode = document.getElementById('explode')! as HTMLVideoElement;
const carouselAnimations: FullSection.AnimationList = [
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['0', 'calc(var(--view-height, 1vh) * -100)'],
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -100)',
			'calc(var(--view-height, 1vh) * -200)',
		],
	},

	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [1, 2.8] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [2.8, 1] },

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle1': ['0deg', '-90deg'],
		'--angle2': ['90deg', '0deg'],
	},

	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [1, 2.8] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [2.8, 1] },

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle2': ['0deg', '-90deg'],
		'--angle3': ['90deg', '0deg'],
	},

	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [1, 2.8] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [2.8, 1] },

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle3': ['0deg', '-90deg'],
		'--angle4': ['90deg', '0deg'],
	},

	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [1, 2.8] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{ targets: '.C0', easing: 'easeInOutQuad', duration: 1000, scale: [2.8, 1] },
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -200)',
			'calc(var(--view-height, 1vh) * -300)',
		],
		complete: function (anim) {
			if (anim.direction == 'reverse') {
				explode.pause();
				explode.currentTime = 0;
			}
			if (anim.direction == 'normal') explode.play();
		},
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -300)',
			'calc(var(--view-height, 1vh) * -400)',
		],
		complete: function (anim) {
			if (anim.direction == 'normal') {
				explode.pause();
				explode.currentTime = 0;
			}
			if (anim.direction == 'reverse') explode.play();
		},
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -400)',
			'calc(var(--view-height, 1vh) * -500)',
		],
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -500)',
			'calc(var(--view-height, 1vh) * -600)',
		],
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: [
			'calc(var(--view-height, 1vh) * -600)',
			'calc((var(--view-height, 1vh) * -600) - 10rem)',
		],
	},
];

(function startup() {
	FullSection.init(carouselAnimations);

	window.addEventListener('resize', computeViewHeight);
	window.addEventListener('scroll', computeViewHeight);
	document.addEventListener('readystatechange', computeViewHeight);

	function isBrowserSafari() {
		const userAgent = window.navigator.userAgent;

		if (
			userAgent.includes('Firefox') ||
			userAgent.includes('SamsungBrowser') ||
			userAgent.includes('Opera') ||
			userAgent.includes('OPR') ||
			userAgent.includes('Trident') ||
			userAgent.includes('Edge') ||
			userAgent.includes('Edg') ||
			userAgent.includes('Chrome')
		)
			return false;

		if (userAgent.includes('Safari')) return true;

		return false;
	}

	function computeViewHeight() {
		const $document = document.documentElement;
		const realScreenHeight = isBrowserSafari() ? $document.clientHeight : window.innerHeight;
		const realScreenWidth = isBrowserSafari() ? $document.clientWidth : window.innerWidth;
		const realViewSize = Math.sqrt(realScreenHeight * realScreenWidth);

		$document.style.setProperty('--view-height', `${realScreenHeight * 0.01}px`);
		$document.style.setProperty('--view-width', `${realScreenWidth * 0.01}px`);
		$document.style.setProperty('--view-size', `${realViewSize * 0.01}px`);

		document.getElementById('museum')!.style.transform = `translate(-50%, -50%) scale(${
			realScreenHeight / 1080
		})`;
	}
})();
