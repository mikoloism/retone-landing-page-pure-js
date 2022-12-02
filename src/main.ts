import anime from 'animejs';
import { FullSection } from '../libs/FullSection/full-section';
import { Header } from './header';
import { ViewSize } from './view-size';

function ProxyFactory(element: HTMLElement, ...variablesNames: Array<string>): object {
	let variablesMap = {};

	variablesNames.forEach((variableName: string) => {
		Object.assign(variablesMap, {
			[variableName]: getComputedStyle(element).getPropertyValue(variableName),
		});
	});

	return new Proxy(variablesMap, {
		set(_targetObject: any, property: string, newValue: any) {
			element.style.setProperty(property, String(newValue));
			return true;
		},
	});
}

const $_var = ProxyFactory(
	document.documentElement,
	'--angle1',
	'--angle2',
	'--angle3',
	'--angle4'
);

// const withViewHeight = (viewHeight: number) => `calc(var(--view-height, 1vh) * -${viewHeight})`;

// const tagline = document.getElementById('tagline')!;
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

	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [1, 2.8],
	},
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [2.8, 1],
	},

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle1': ['0deg', '-90deg'],
		'--angle2': ['90deg', '0deg'],
	},

	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [1, 2.8],
	},
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [2.8, 1],
	},

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle2': ['0deg', '-90deg'],
		'--angle3': ['90deg', '0deg'],
	},

	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [1, 2.8],
	},
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [2.8, 1],
	},

	{
		targets: $_var,
		easing: 'easeInOutQuad',
		duration: 1000,
		'--angle3': ['0deg', '-90deg'],
		'--angle4': ['90deg', '0deg'],
	},

	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [1, 2.8],
	},
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [0, 1] },
	// { targets: ".T1", easing: "easeInOutQuad", duration: 60, opacity: [1, 0] },
	{
		targets: '#museum-scene',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-50%'],
		translateX: ['-50%', '-50%'],
		scale: [2.8, 1],
	},
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
			'calc(var(--view-height, 1vh) * -700)',
		],
	},
	{
		targets: '.fs__wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		top: ['0px', '-450px'],

		begin(anim) {
			anime({
				targets: '.footer',
				easing: 'linear',
				duration: 400,
				autoplay: true,
				direction: anim.direction,
			});
		},
	},
];

(function startup() {
	FullSection.init(carouselAnimations);
	Header.init();

	ViewSize.onUpdateScreen(({ realScreenHeight }) => {
		document.getElementById('museum')!.style.transform = `translate(-50%, -50%) scale(${
			realScreenHeight / 1080
		})`;
	});
	ViewSize.init();
})();
