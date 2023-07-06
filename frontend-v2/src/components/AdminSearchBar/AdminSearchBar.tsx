"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent } from "react";

export default function AdminSearchBar() {
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: submit query
    console.log((event.target as HTMLFormElement).query.value);
  };

  return (
    <form
      name="admin-search-bar"
      className="flex items-center gap-1 border border-white text-white md:border-unilectives-blue md:text-unilectives-blue rounded-2xl px-2 py-2"
      onSubmit={handleOnSubmit}
    >
      {/* Search icon */}
      <button type="submit">
        <MagnifyingGlassIcon className="w-5 h-5 bg-transparent" />
      </button>
      {/* Input */}
      <input
        type="text"
        name="query"
        title="Search reviews and reports..."
        placeholder="Search reviews and reports..."
        className="w-full outline-none bg-transparent placeholder:text-white md:placeholder:text-unilectives-blue"
      />
    </form>
  );
}