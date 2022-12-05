export namespace ViewSize {
	export function init() {
		window.addEventListener('resize', computeViewSize);
		window.addEventListener('scroll', computeViewSize);
		document.addEventListener('readystatechange', computeViewSize);
	}

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

	var handleOnUpdate: OnUpdateScreenCallback;

	export function onUpdateScreen(cb: OnUpdateScreenCallback): void {
		handleOnUpdate = cb;
	}

	function computeViewSize() {
		const $document = document.documentElement;
		const realScreenHeight = isBrowserSafari() ? $document.clientHeight : window.innerHeight;
		const realScreenWidth = isBrowserSafari() ? $document.clientWidth : window.innerWidth;
		const realViewSize = Math.sqrt(realScreenHeight * realScreenWidth);

		$document.style.setProperty('--view-height', `${realScreenHeight * 0.01}px`);
		$document.style.setProperty('--view-width', `${realScreenWidth * 0.01}px`);
		$document.style.setProperty('--view-size', `${realViewSize * 0.01}px`);
		handleOnUpdate?.call(null, { realScreenHeight, realScreenWidth });
	}

	type OnUpdateScreenCallback = (props: {
		realScreenHeight: number;
		realScreenWidth: number;
	}) => void;
}
