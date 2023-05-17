"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

export default function Searchbar(props: InputHTMLAttributes<HTMLFormElement>) {
  return (
    <form name="review-search-bar" {...props}>
      {/* Search icon */}
      <button type="submit">
        <MagnifyingGlassIcon className="w-5 h-5 bg-transparent" />
      </button>
      {/* Input */}
      <input
        type="text"
        name="query"
        title="Search here..."
        placeholder="Search here..."
        className="w-full outline-none bg-transparent placeholder:text-black"
      />
    </form>
  );
}
