import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { parseTodosFromUrlSearchParams } from "./parse-todos-from-url-search-params.ts";

const appElement = document.getElementById("app");

if (appElement === null) {
	throw new Error("App element couldn't be found");
}

const todos = parseTodosFromUrlSearchParams(
	new URLSearchParams(window.location.search),
);

render(<App todos={todos} />, appElement);
