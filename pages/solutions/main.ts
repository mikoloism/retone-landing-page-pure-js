import { FullSection } from "../../libs/FullSection/full-section";
import { Header } from "../../src/header";
import { ViewSize } from "../../src/view-size";

const carouselAnimations: FullSection.AnimationList = [
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["0", "-25%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [`-25%`, `-50%`],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: [`-50%`, `-75%`],
	},
];

(function startup() {
	ViewSize.init();

	FullSection.init(carouselAnimations);

	Header.disableObserver();
	Header.init();
	Header.detachEventsListener();
})();
