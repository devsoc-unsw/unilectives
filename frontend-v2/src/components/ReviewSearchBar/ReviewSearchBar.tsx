"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";

export default function ReviewSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value.trim().replaceAll(" ", "%20"));
    }, 300), []
  );

  return (
    <div
      className="flex items-center gap-1 border border-white text-white rounded-2xl px-4 py-2"
    >
      {/* Search icon */}
      <MagnifyingGlassIcon className="w-5 h-5 bg-transparent" />
      {/* Input */}
      <input
        type="text"
        name="query"
        title="Search here..."
        placeholder="Search here..."
        className="w-full outline-none bg-transparent placeholder:text-white"
        onChange={handleOnChange}
      />
    </div>
  );
}