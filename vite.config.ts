import { resolve } from "path";
import { defineConfig } from "vite";
import {
	HeaderComponent,
	SidebarComponent,
	SVGLoadingComponent,
} from "./libs/inject-html-components";

export default defineConfig({
	base: "/",
	appType: "mpa",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "/pages/index.html"),
				about: resolve(__dirname, "/pages/about/index.html"),
				solutions: resolve(__dirname, "/pages/solutions/index.html"),
				story: resolve(__dirname, "/pages/story/index.html"),
			},
		},
	},
	css: { preprocessorOptions: { scss: { quietDeps: true } } },
	plugins: [SVGLoadingComponent.setup(), HeaderComponent.setup(), SidebarComponent.setup()],
});
