import type { ComponentProps, FunctionComponent } from "preact";
import type { InputHTMLAttributes } from "preact/compat";

export type Todo = {
	text: string;
	isCompleted: boolean;
	id: string;
};

const TodoIsCompletedInput: FunctionComponent<
	Omit<InputHTMLAttributes, "value"> & { value: boolean }
> = ({ value, ...inputProps }) => (
	<input type="hidden" name="c" value={value ? "Y" : "N"} {...inputProps} />
);

const TodoTextInput: FunctionComponent<InputHTMLAttributes> = (inputProps) => (
	<input type="hidden" name="t" required {...inputProps} />
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
			<input type="hidden" name="i" value={todo.id} />
		</>
	));

export const App: FunctionComponent<{
	todos: Todo[];
	nextId: string;
	newestId: string | null;
}> = ({ todos, nextId, newestId }) => (
	<>
		<h1>todos</h1>
		<main>
			<form
				method="get"
				class="newTodo"
				style={{
					viewTransitionName: `todo-${nextId}`,
				}}
			>
				<TodosInputs todos={todos} />
				<TodoIsCompletedInput value={false} />
				<TodoTextInput type="text" placeholder="What needs to be done?" />
				<input type="hidden" name="i" value={nextId} />
				<input type="hidden" name="n" value={crypto.randomUUID()} />
				<input type="hidden" name="f" value={nextId} />
			</form>
			{todos.map((todo) => (
				<div
					class={`todo ${todo.isCompleted ? "isCompleted" : "isNotCompleted"} ${todo.id === newestId ? "newestTodo" : ""}`}
					style={{
						viewTransitionName: `todo-${todo.id}`,
					}}
				>
					<form method="get" class="toggle">
						<TodosInputs
							todos={todos}
							isCompletedProps={(innerTodo) => ({
								value:
									innerTodo === todo
										? !todo.isCompleted
										: innerTodo.isCompleted,
							})}
						/>
						<input type="hidden" name="n" value={nextId} />
						<input type="submit" value={todo.isCompleted ? "☑" : "☐"} />
					</form>
					<form method="get">
						<TodosInputs
							todos={todos}
							textProps={(innerTodo) => ({
								type: innerTodo === todo ? "text" : "hidden",
							})}
						/>
						<input type="hidden" name="n" value={nextId} />
					</form>
					<form method="get">
						<TodosInputs
							todos={todos.filter((innerTodo) => innerTodo !== todo)}
						/>
						<input type="hidden" name="n" value={nextId} />
						<input type="submit" value="×" class="remove" />
					</form>
				</div>
			))}
		</main>
	</>
);
