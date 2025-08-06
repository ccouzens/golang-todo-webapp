/// <reference types="vite/client" />
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import type { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = import.meta.env?.SSR ?? false;

async function createServer() {
	const app = express();
	let vite: ViteDevServer | undefined;

	if (isProduction) {
		const sirv = (await import("sirv")).default;
		app.use(
			"/",
			sirv("./dist/client", {
				extensions: [],
				immutable: true,
				maxAge: 31536000,
			}),
		);
	} else {
		const { createServer: createViteServer } = await import("vite");
		vite = await createViteServer({
			server: { middlewareMode: true },
			appType: "custom",
		});

		app.use(vite.middlewares);
	}

	app.use("*all", async (req, res, next) => {
		const url = req.originalUrl;

		try {
			let template = fs.readFileSync(
				path.resolve(
					__dirname,
					isProduction ? "../client/index.html" : "index.html",
				),
				"utf-8",
			);

			if (vite) {
				template = await vite.transformIndexHtml(url, template);
			}

			const { render } = await (vite
				? vite.ssrLoadModule("/src/server.tsx")
				: import("./src/server.tsx"));

			const appHtml = await render(url);

			const html = template.replace(`<!--ssr-outlet-->`, () => appHtml);

			res.status(200).set({ "Content-Type": "text/html" }).end(html);
		} catch (e) {
			vite?.ssrFixStacktrace(e);
			next(e);
		}
	});

	app.listen(5173);
}

createServer();

console.log(
	"http://localhost:5173/?t=clean+the+balcony&c=Y&i=1&t=go+to+the+gym&c=N&i=2&n=3",
);
