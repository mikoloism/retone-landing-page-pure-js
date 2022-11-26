(function () {
	const $ = (...args) => document.querySelector(...args);
	const $$ = (...args) => document.querySelectorAll(...args);

	function $ready(fn) {
		document.addEventListener('readystatechange', fn, false);
	}
})();
