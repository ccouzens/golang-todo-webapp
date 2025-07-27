import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";

const appElement = document.getElementById("app");

if (appElement === null) {
	throw new Error("App element couldn't be found");
}

const todos = JSON.parse(
	new URLSearchParams(window.location.search).get("todos") ?? "[]",
);

render(<App todos={todos} />, appElement);
