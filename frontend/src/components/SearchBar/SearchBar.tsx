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
    <div className='flex w-5/6 items-center bg-white dark:bg-gray-900 rounded border-2 border-unilectives-search duration-150'>
      <MagnifyingGlassIcon className='w-6 h-6 text-unilectives-search mx-2 bg-white dark:bg-gray-900 duration-150' />
      <input
        type='text'
        name='query'
        className='w-full py-2 px-3 text-sm bg-white dark:bg-gray-900 text-unilectives-search focus:outline-none placeholder-unilectives-search font-medium duration-150'
        placeholder='Search for a course e.g. COMP1511'
        autoComplete='off'
        onChange={handleOnChange}
        disabled={initialLoading}
      />
    </div>
  );
}
