import { render } from "preact";
import "./index.css";
import { App, type Todo } from "./app.tsx";

const appElement = document.getElementById("app");

if (appElement === null) {
	throw new Error("App element couldn't be found");
}

const todos: Todo[] = [];

render(<App todos={todos} />, appElement);
