import type { Todo } from "./app";

export function parseTodosFromUrlSearchParams(
	searchParams: URLSearchParams,
): Todo[] {
	const todos: Todo[] = [];

	let text: string | undefined;
	let isCompleted: boolean | undefined;
	for (const [key, value] of searchParams) {
		if (key === "t") {
			text = value;
		} else if (key === "c") {
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
