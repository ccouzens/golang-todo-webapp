import type { Todo } from "./app";

export function parseTodosFromUrlSearchParams(
	searchParams: URLSearchParams,
): Todo[] {
	const todos: Todo[] = [];

	let text: string | undefined;
	let isCompleted: boolean | undefined;
	let id: string | undefined;
	for (const [key, value] of searchParams) {
		switch (key) {
			case "t":
				text = value;
				break;
			case "c":
				isCompleted = value === "Y";
				break;
			case "i":
				id = value;
				break;
		}
		if (text !== undefined && isCompleted !== undefined && id !== undefined) {
			todos.push({ text, isCompleted, id });
			text = undefined;
			isCompleted = undefined;
			id = undefined;
		}
	}

	return todos;
}
