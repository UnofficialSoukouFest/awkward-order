import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		reactRouter(),
		Icons({
			compiler: "jsx",
			jsx: "react",
		}),
		tsconfigPaths(),
	],
    optimizeDeps: {
        exclude: ["react-aria-components"]
    },
	resolve: {
		alias: [
			{
				find: "use-sync-external-store/shim/index.js",
				replacement: "react",
			},
		],
	},
});
