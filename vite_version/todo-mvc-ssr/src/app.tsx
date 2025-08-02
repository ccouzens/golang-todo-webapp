import type { FunctionComponent } from "preact";
import type { InputHTMLAttributes } from "preact/compat";

export type Todo = {
	text: string;
	isCompleted: boolean;
};

const TodoIsCompletedInput: FunctionComponent<
	Omit<InputHTMLAttributes, "value"> & { value: boolean }
> = ({ value, ...inputProps }) => (
	<input
		type="hidden"
		name="todos[]isCompleted"
		value={value ? "true" : "false"}
		{...inputProps}
	/>
);

const TodoTextInput: FunctionComponent<InputHTMLAttributes> = (inputProps) => (
	<input type="hidden" name="todos[]text" {...inputProps} />
);

export const App: FunctionComponent<{
	todos: Todo[];
}> = ({ todos }) => {
	return (
		<>
			<form id="newTodo" method="get">
				{todos.map((todo) => {
					return (
						<>
							<TodoTextInput value={todo.text} />
							<TodoIsCompletedInput value={todo.isCompleted} />
						</>
					);
				})}
				<TodoIsCompletedInput value={false} />
			</form>
			{todos.map((_todo, i) => {
				return (
					<form id={`todo${i}_complete`}>
						{todos.map((innerTodo, j) => {
							return (
								<>
									<TodoTextInput value={innerTodo.text} />
									<TodoIsCompletedInput
										value={
											i === j ? !innerTodo.isCompleted : innerTodo.isCompleted
										}
									/>
								</>
							);
						})}
					</form>
				);
			})}
			<h1>todos</h1>
			<TodoTextInput
				form="newTodo"
				type="text"
				placeholder="What needs to be done?"
			/>
			{todos.map((todo, i) => {
				return (
					<div
						class={`todo ${todo.isCompleted ? "isCompleted" : "isNotCompleted"}`}
					>
						<input
							type="submit"
							form={`todo${i}_complete`}
							value={todo.isCompleted ? "☑" : "☐"}
						/>
						<form method="get">
							{todos.map((innerTodo, j) => {
								return (
									<>
										<TodoIsCompletedInput value={innerTodo.isCompleted} />
										<TodoTextInput
											value={innerTodo.text}
											type={i === j ? "text" : "hidden"}
										/>
									</>
								);
							})}
						</form>
					</div>
				);
			})}
		</>
	);
};
