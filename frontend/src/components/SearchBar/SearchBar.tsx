"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AdjustmentsVerticalIcon } from '@heroicons/react/16/solid'
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

export default function SearchBar({
  onSearchChange,
  onFilterClick
}: {
  onSearchChange: (newSearchTerm: string) => void;
  onFilterClick?: () => void;
}) {
  const [initialLoading, setInitialLoading] = useState(true);

  const handleOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      // Check if user entered the secret phrase
      if (event.target.value.trim().toLowerCase() === "i'm looking for a flag!") {
        alert("Congrats! You found the flag: RCR{leave_a_review}!");
      }
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
    <div className='flex w-5/6 items-center bg-white dark:bg-gray-900 rounded-lg border-2 border-unilectives-search duration-150'>
      <MagnifyingGlassIcon className='w-6 h-6 text-unilectives-search ml-4 mr-0 mx-2 bg-white dark:bg-gray-900 duration-150' />
      <input
        type='text'
        name='query'
        className='w-full py-3 px-3 text-md bg-white dark:bg-gray-900 text-unilectives-search focus:outline-none placeholder-unilectives-search font-normal duration-150'
        placeholder='Search for a course e.g. COMP1511'
        autoComplete='off'
        onChange={handleOnChange}
        disabled={initialLoading}
      />
      <AdjustmentsVerticalIcon
        className="w-6 h-6 text-unilectives-search mr-6 mx-2 cursor-pointer"
        onClick={onFilterClick}
      />
    </div>
  );
}
