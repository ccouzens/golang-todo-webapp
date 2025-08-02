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
			<form id="newTodo" method="get"></form>
			<h1>todos</h1>
			<input
				form="newTodo"
				type="text"
				placeholder="What needs to be done?"
				name="todos[]text"
			/>
			{todos.map((todo) => {
				return <div>{todo.text}</div>;
			})}
		</>
	);
};
