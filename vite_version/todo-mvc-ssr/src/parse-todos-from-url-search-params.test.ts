import { describe, expect, test } from "vitest";
import { parseTodosFromUrlSearchParams } from "./parse-todos-from-url-search-params";

describe(parseTodosFromUrlSearchParams, () => {
	test("empty case", () => {
		expect(parseTodosFromUrlSearchParams(new URLSearchParams())).toEqual([]);
	});
	test("couple todos", () => {
		const searchString =
			"todos[]text=clean+the+balcony&todos[]isCompleted=true&todos[]text=go+to+the+gym&todos[]isCompleted=false";
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
