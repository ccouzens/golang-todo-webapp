import "./app.css";
import type { FunctionComponent } from "preact";

export type Todo = {
	text: string;
	isCompleted: boolean;
};

export const App: FunctionComponent<{
	todos: Todo[];
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
