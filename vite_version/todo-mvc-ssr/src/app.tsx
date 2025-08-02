import type { ComponentProps, FunctionComponent } from "preact";
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

const TodosInputs: FunctionComponent<{
	todos: Todo[];
	isCompletedProps?: (
		todo: Todo,
	) => Partial<ComponentProps<typeof TodoIsCompletedInput>>;
	textProps?: (todo: Todo) => Partial<ComponentProps<typeof TodoTextInput>>;
}> = ({ todos, isCompletedProps, textProps }) =>
	todos.map((todo) => (
		<>
			<TodoIsCompletedInput
				value={todo.isCompleted}
				{...isCompletedProps?.(todo)}
			/>
			<TodoTextInput value={todo.text} {...textProps?.(todo)} />
		</>
	));

export const App: FunctionComponent<{
	todos: Todo[];
}> = ({ todos }) => (
	<>
		<h1>todos</h1>
		<form method="get">
			<TodosInputs todos={todos} />
			<TodoIsCompletedInput value={false} />
			<TodoTextInput type="text" placeholder="What needs to be done?" />
		</form>
		{todos.map((todo) => (
			<div
				class={`todo ${todo.isCompleted ? "isCompleted" : "isNotCompleted"}`}
			>
				<form method="get">
					<TodosInputs
						todos={todos}
						isCompletedProps={(innerTodo) => ({
							value:
								innerTodo === todo ? !todo.isCompleted : innerTodo.isCompleted,
						})}
					/>
					<input type="submit" value={todo.isCompleted ? "☑" : "☐"} />
				</form>
				<form method="get">
					<TodosInputs
						todos={todos}
						textProps={(innerTodo) => ({
							type: innerTodo === todo ? "text" : "hidden",
						})}
					/>
				</form>
				<form method="get">
					<TodosInputs
						todos={todos.filter((innerTodo) => innerTodo !== todo)}
					/>
					<input type="submit" value="❌" />
				</form>
			</div>
		))}
	</>
);
