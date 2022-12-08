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
						<a href="/" class="navigation__link">
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
				<svg class="brand__logo" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M112.663 0C107.428 0 103.172 4.23202 103.172 9.43852V14.5615C103.172 19.768 107.428 24 112.663 24C116.247 24 119.467 22.0232 121.118 18.8492L118.515 17.5406C117.395 19.7401 115.155 21.1044 112.663 21.1044C109.051 21.1044 106.112 18.181 106.112 14.5893V9.43852C106.112 5.84687 109.051 2.92343 112.663 2.92343C116.275 2.92343 119.215 5.84687 119.215 9.43852V10.4965H108.995V13.3921H122.126V9.43852C122.154 4.23202 117.899 0 112.663 0Z"
					></path>
					<path
						d="M0 9.7725V23.5544H2.91177V9.7725C2.91177 6.18085 5.85154 3.25742 9.46326 3.25742V0.333984C4.25567 0.333984 0 4.566 0 9.7725Z"
					></path>
					<path
						d="M66.0188 0C60.7833 0 56.5276 4.23202 56.5276 9.43852V14.5615C56.5276 19.768 60.7833 24 66.0188 24C71.2544 24 75.5101 19.768 75.5101 14.5615V9.43852C75.4821 4.23202 71.2264 0 66.0188 0ZM72.5703 14.5336C72.5703 18.1253 69.6306 21.0487 66.0188 21.0487C62.4071 21.0487 59.4674 18.1253 59.4674 14.5336V9.43852C59.4674 5.84687 62.4071 2.92343 66.0188 2.92343C69.6306 2.92343 72.5703 5.84687 72.5703 9.43852V14.5336Z"
					></path>
					<path
						d="M89.3414 0C84.1058 0 79.8501 4.23202 79.8501 9.43852V23.5545H82.7619V9.43852C82.7619 5.84687 85.7016 2.92343 89.3134 2.92343C92.9251 2.92343 95.8648 5.84687 95.8648 9.43852V23.5545H98.7766V9.43852C98.8046 4.23202 94.5769 0 89.3414 0Z"
					></path>
					<path
						d="M45.2166 21.0764C41.6049 21.0764 38.6651 18.153 38.6651 14.5613V13.3919H47.4284V10.4964H38.6371V1.78174H35.7253V14.5335C35.7253 19.74 39.981 23.972 45.2166 23.972C48.8003 23.972 52.0481 21.9952 53.6719 18.7933L51.0681 17.4848C49.9482 19.6843 47.6804 21.0764 45.2166 21.0764Z"
					></path>
					<path
						d="M21.8661 0C16.6305 0 12.4028 4.23202 12.4028 9.43852V14.5615C12.4028 19.768 16.6585 24 21.8941 24C25.4778 24 28.6976 22.0232 30.3494 18.8492L27.7176 17.5128C26.5977 19.7123 24.3579 21.0766 21.8661 21.0766C18.2544 21.0766 15.3146 18.1531 15.3146 14.5615V9.43852C15.3146 5.84687 18.2544 2.92343 21.8661 2.92343C25.4778 2.92343 28.4176 5.84687 28.4176 9.43852V10.4965H18.2264V13.3921H31.3573V9.43852C31.3573 4.23202 27.1017 0 21.8661 0Z"
					></path>
				</svg>
			</div>

			<button
				type="menu"
				id="hamburger"
				class="header__hamburger hamburger"
			>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="hamburger__icon" id="hamburger-icon"
				stroke-width="2" stroke-linecap="round">
				<line id="hamburger-icon-line-1" x1="3" y1="5" x2="21" y2="5"></line>
				<line id="hamburger-icon-line-2" x1="3" y1="12" x2="21" y2="12"></line>
				<line id="hamburger-icon-line-3" x1="3" y1="19" x2="21" y2="19"></line>
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
