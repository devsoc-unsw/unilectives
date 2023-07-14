"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBar({ onChange }: { onChange: (newSearchTerm: string) => void }) {
  const [searchText, setSearchText] = useState("");

  // TODO: clean up searchText before lifting the state up
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearchText((event.target as HTMLFormElement).query.value);
    onChange((event.target as HTMLFormElement).query.value);
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
