import "./app.css";
import type { FunctionComponent } from "preact";

export const App: FunctionComponent<{
	todos: { text: string; isCompleted: boolean }[];
}> = ({ todos }) => {
	return (
		<>
			<h1>todos</h1>
			{todos.map((todo) => {
				return <div>{todo.text}</div>;
			})}
		</>
	);
};
