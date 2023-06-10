"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent } from "react";

export default function SearchBar() {
	const handleOnSubmit = (event: FormEvent) => {
		event.preventDefault();
		// TODO: submit query
		console.log((event.target as HTMLFormElement).query.value);
	};

	return (
		<form
			className="flex w-5/6 items-center bg-white rounded border-2 border-unilectives-search"
			onSubmit={handleOnSubmit}
		>
			<button type="submit">
				<MagnifyingGlassIcon className="w-6 h-6 text-unilectives-search mx-2" />
			</button>
			<input
				type="text"
				name="query"
				className="w-full py-2 px-3 text-sm text-unilectives-search focus:outline-none placeholder-unilectives-search font-medium"
				placeholder="Search for a course e.g. COMP1511"
			/>
		</form>
	);
}
