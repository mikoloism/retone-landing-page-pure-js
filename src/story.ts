import { FullSection } from '../libs/FullSection/full-section';
import { Header } from './header';
import { ViewSize } from './view-size';

const carouselAnimations: FullSection.AnimationList = [
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['0', '-12.5%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-12.5%', '-25%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-25%', '-37.5%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-37.5%', '-50%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-50%', '-62.5%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-62.5%', '-75%'],
	},
	{
		targets: '#fs-wrapper',
		easing: 'easeInOutQuad',
		duration: 1000,
		translateY: ['-75%', '-87.5'],
	},
];

(function startup() {
	ViewSize.init();
	FullSection.init(carouselAnimations);
	Header.disableObserver();
	Header.init();
})();
