import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import liveReload from "vite-plugin-live-reload";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), liveReload("*/src/**")],
	server: {
		open: "./index.html",
		proxy: {
			"/api": "http://localhost:3001",
		},
	},
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "../shared"),
		},
	},
});
