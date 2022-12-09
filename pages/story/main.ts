import { Utils } from "../../libs/FullSection/refactored";
import { FullSection } from "../../libs/FullSection/full-section";
import { Header } from "../../src/header";
import { ViewSize } from "../../src/view-size";

const carouselAnimations: FullSection.AnimationList = [
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["0", "-12.5%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-12.5%", "-25%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-25%", "-37.5%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-37.5%", "-50%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-50%", "-62.5%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-62.5%", "-75%"],
	},
	{
		targets: "#fs-wrapper",
		easing: "easeInOutQuad",
		duration: 1000,
		translateY: ["-75%", "-87.5"],
	},
];

(function startup() {
	const observer = new IntersectionObserver(handleObserver);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-1")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-2")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-3")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-4")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-5")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-6")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-7")!);
	observer.observe(document.querySelector<HTMLDivElement>("#fs-section-8")!);

	ViewSize.init();

	FullSection.init(carouselAnimations);

	Header.disableObserver();
	Header.init();
	Header.detachEventsListener();
})();

function handleObserver(entries: IntersectionObserverEntry[], _observer: any): void {
	entries.forEach((entry: IntersectionObserverEntry) => {
		let $header = document.querySelector<HTMLDivElement>(".page__header");
		let $self = entry.target as HTMLDivElement;

		if (entry.isIntersecting) {
			if ($self.id !== "fs-section-1") {
				$header!.style.position = "absolute";
				$header!.style.top = "-100%";
			} else {
				$header!.style.position = "initial";
				$header!.style.top = "initial";
			}

			FullSection.detachEventsListener();
			$self.addEventListener("wheel", handleSwipe.bind(null, $self));
			$self.addEventListener("touchmove", handleSwipe.bind(null, $self));
		}
	});
}
function handleSwipe($self: HTMLDivElement) {
	if (Utils.isScrollEnd($self)) FullSection.attachEventsListener();
}
