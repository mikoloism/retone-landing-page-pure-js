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
		return [
			{
				name: "inject-loading-component",
				transformIndexHtml(html: string): string {
					return html.replace(TARGET, $TEMPLATE);
				},
			},
			{
				name: "inject-loading-script",
				transformIndexHtml(html: string): IndexHtmlTransformResult {
					return {
						html: "",
						tags: [
							{
								tag: "script",
								injectTo: "body",
								attrs: { src: "/src/loading.ts", type: "module" },
							},
						],
					};
				},
			},
		];
	}
}
