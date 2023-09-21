"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

export default function SearchBar({
  onSearchChange,
}: {
  onSearchChange: (newSearchTerm: string) => void;
}) {
  const [initialLoading, setInitialLoading] = useState(true);

  const handleOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value.trim().replaceAll(" ", "%20"));
    }, 300),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex w-5/6 items-center bg-white rounded border-2 border-unilectives-search">
      <MagnifyingGlassIcon className="w-6 h-6 text-unilectives-search mx-2" />
      <input
        type="text"
        name="query"
        className="w-full py-2 px-3 text-sm text-unilectives-search focus:outline-none placeholder-unilectives-search font-medium"
        placeholder="Search for a course e.g. COMP1511"
        autoComplete="off"
        onChange={handleOnChange}
        disabled={initialLoading}
      />
    </div>
  );
}
