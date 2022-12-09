import { Utils } from "../../libs/FullSection/refactored";
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
	const observer = new IntersectionObserver(handleObserver);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-1")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-2")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-3")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-4")!);

	ViewSize.init();

	FullSection.init(carouselAnimations);

	Header.disableObserver();
	Header.init();
	Header.detachEventsListener();
})();

function handleObserver(entries: IntersectionObserverEntry[], _observer: any): void {
	entries.forEach((entry: IntersectionObserverEntry) => {
		let $self = entry.target as HTMLDivElement;

		if (entry.isIntersecting) {
			FullSection.detachEventsListener();
			$self.addEventListener("wheel", handleSwipe.bind(null, $self));
			$self.addEventListener("touchmove", handleSwipe.bind(null, $self));
		}
	});
}
function handleSwipe($self: HTMLDivElement) {
	if (Utils.isScrollEnd($self)) FullSection.attachEventsListener();
}
