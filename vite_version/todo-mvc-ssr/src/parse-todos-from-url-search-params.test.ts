import { describe, expect, test } from "vitest";
import { parseTodosFromUrlSearchParams } from "./parse-todos-from-url-search-params";

describe(parseTodosFromUrlSearchParams, () => {
	test("empty case", () => {
		expect(parseTodosFromUrlSearchParams(new URLSearchParams())).toEqual([]);
	});
	test("couple todos", () => {
		const searchString = "t=clean+the+balcony&c=true&t=go+to+the+gym&c=false";
		expect(
			parseTodosFromUrlSearchParams(new URLSearchParams(searchString)),
		).toEqual([
			{
				isCompleted: true,
				text: "clean the balcony",
			},
			{
				isCompleted: false,
				text: "go to the gym",
			},
		]);
	});
});
