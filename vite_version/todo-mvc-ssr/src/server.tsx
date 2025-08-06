import { renderToString } from "preact-render-to-string";
import "./index.css";
import { App } from "./app.tsx";
import { parseTodosFromUrlSearchParams } from "./parse-todos-from-url-search-params.ts";

export function render(url: string): string {
	const queryParams = new URL(`https://a${url}`).searchParams;
	const todos = parseTodosFromUrlSearchParams(queryParams);
	const nextId = queryParams.get("n") ?? crypto.randomUUID();
	const newestId = queryParams.get("f");
	return renderToString(
		<App todos={todos} nextId={nextId} newestId={newestId} />,
	);
}
