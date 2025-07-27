import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";

const appElement = document.getElementById("app");

if (appElement === null) {
	throw new Error("App element couldn't be found");
}

render(<App />, appElement);
