import { IndexHtmlTransformHook, IndexHtmlTransformResult } from "vite";

export namespace SVGLoadingComponent {
	const TARGET = /<div data-loading><\/div>/i;
	const $TEMPLATE = /*html*/ `
	<div id="loading" class="loading loading--inactive">
		<svg height="450" width="260">
			<path
				d="M 130 20 A 110 110 0 0 1 240 130 L 240 320 A 110 110 0 0 1 20 320 L 20 130 A 110 110 0 0 1 240 130 L 240 320 A 110 110 0 0 1 20 320 L 20 130 A 110 110 0 0 1 240 130"
				stroke="black" fill="none" stroke-width="40" stroke-dasharray="0 708.3625 362.7875 10000">
				<animate attributeType="CSS" attributeName="stroke-dasharray" repeatCount="indefinite" calcMode="spline"
				values="0 0 1 2500;0 708.3625 362.7875 2500;0 2141.3 1 2500" keyTimes="0; 0.5; 1"
				keySplines="0 0 0.58 1; 0.42 0 1 1" dur="3s" />
			</path>
			Sorry, your browser does not support inline SVG.
		</svg>
	</div>
	`;

	export function setup() {
		return {
			name: "inject-loading-component",
			transformIndexHtml(html: string): string {
				return html.replace(TARGET, $TEMPLATE);
			},
		};
		// {
		// 	name: "inject-loading-script",
		// 	transformIndexHtml(html: string): IndexHtmlTransformResult {
		// 		return {
		// 			html: "",
		// 			tags: [
		// 				{
		// 					tag: "script",
		// 					injectTo: "body",
		// 					attrs: { src: "/src/loading.ts", type: "module" },
		// 				},
		// 			],
		// 		};
		// 	},
		// },
		// ];
	}
}

export namespace SidebarComponent {
	const TARGET = /<aside data-sidebar="primary"><\/aside>/i;
	const $TEMPLATE = /*html*/ `
	<aside id="sidebar" class="sidebar">
		<!-- TODO : replace by <button> -->
		<div id="sidebar-close" class="sidebar__close"></div>

		<div class="sidebar__inner">
			<header class="sidebar__header"></header>

			<nav class="sidebar__navigation navigation">
				<ul class="navigation__list">
					<li class="navigation__item">
						<a href="/v0.2/anatomy" class="navigation__link">
							<span class="navigation__text">Retone Hero Anatomy</span>
						</a>
					</li>
					<li class="navigation__item">
						<a href="/" class="navigation__link">
							<span class="navigation__text">Retone Hero Plus</span>
						</a>
					</li>
					<li class="navigation__item">
						<a href="/about/index.html" class="navigation__link">
							<span class="navigation__text">About Retone</span>
						</a>
					</li>

					<li class="navigation__item">
						<a href="/solutions/index.html" class="navigation__link">
							<span class="navigation__text">Solutions</span>
						</a>
					</li>

					<li class="navigation__item">
						<a href="/story/index.html" class="navigation__link">
							<span class="navigation__text">Retone Hero Story</span>
						</a>
					</li>

					<li class="navigation__item">
						<a href="/blog/index.html" class="navigation__link">
							<span class="navigation__text">Blog</span>
						</a>
					</li>

					<li class="navigation__item">
						<a href="/" class="navigation__link">
							<span class="navigation__text">Contacts</span>
						</a>
					</li>

					<li class="navigation__item">
						<a href="/" class="navigation__link">
							<span class="navigation__text">Ordering</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</aside>
	`;

	export function setup() {
		return {
			name: "inject-sidebar-component",

			transformIndexHtml(html: string): string {
				return html.replace(TARGET, $TEMPLATE);
			},
		};
	}
}

export namespace HeaderComponent {
	const TARGET = /<header data-header="primary"><\/header>/i;
	const $TEMPLATE = /*html*/ `
	<header id="header" class="header header--visible">
			<div class="header__brand brand">
				<a href="/" class="brand__link">Retone Home</a>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 64" height="32" class="brand__logo" fill="none" stroke="inherit" stroke-width="8">
					<path d="M4,63v-37a22,22,0,0,1,22,-22"></path>
					<path d="M46,32h32v-6a22,22,0,0,0,-44,0v12a22,22,0,0,0,41.6021,9.9878"></path>
					<path d="M98,4v34a22,22,0,0,0,41.6021,9.9878M98,32h28"></path>
					<path d="M154,26a22,22,0,0,1,44,0v12a22,22,0,0,1,-44,0z"></path>
					<path d="M218,63v-37a22,22,0,0,1,44,0v37"></path>
					<path d="M294,32h32v-6a22,22,0,0,0,-44,0v12a22,22,0,0,0,41.6021,9.9878"></path>
				</svg>
			</div>

			<button
				type="menu"
				id="hamburger"
				class="header__hamburger hamburger"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="32" width="32" class="hamburger__icon" fill="none" stroke="inherit" stroke-width="4" stroke-linecap="round">
					<line id="hamburger-icon-line-1" x1="2" y1="4" x2="30" y2="4"></line>
					<line id="hamburger-icon-line-2" x1="2" y1="16" x2="30" y2="16"></line>
					<line id="hamburger-icon-line-3" x1="2" y1="28" x2="30" y2="28"></line>
				</svg>
			</button>
		</header>
		`;

	export function setup() {
		return {
			name: "inject-header-component",

			transformIndexHtml(html: string): string {
				return html.replace(TARGET, $TEMPLATE);
			},
		};
	}
}

export namespace SkipButtonComponent {
	const TARGET: RegExp = /<button data-skip="(.*?)"><\/button>/i;
	const $TEMPLATE = /*html*/ `
	<button
		id="skip-button"
		style="
			bottom: 0;
			height: 32px;
			background: black;
			color: white;
			border-radius: 9px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			z-index: 9999999;
		"
	>
	skip
	</button>
	`;
	const SCRIPTS = /*html*/ `
	<script type="module">
		export function listenSkipButton(): void {
			const $skipButton = document.querySelector<HTMLButtonElement>('#skip-button')!;
			$skipButton.addEventListener('click', () => {
				FullSection.updateIndex(12);
			});
		}
	</script>
	`;

	export function setup() {
		return { name: "inject-skip-component" };
	}
}
