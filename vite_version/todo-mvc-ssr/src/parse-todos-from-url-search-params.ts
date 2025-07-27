import type { Todo } from "./app";

export function parseTodosFromUrlSearchParams(
	searchParams: URLSearchParams,
): Todo[] {
	const todos: Todo[] = [];

	let text: string | undefined;
	let isCompleted: boolean | undefined;
	for (const [key, value] of searchParams) {
		if (key === "todos[]text") {
			text = value;
		} else if (key === "todos[]isCompleted") {
			isCompleted = value === "true";
		}
		if (text !== undefined && isCompleted !== undefined) {
			todos.push({ text, isCompleted });
			text = undefined;
			isCompleted = undefined;
		}
	}

	return todos;
}
