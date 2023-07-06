"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import FilterSelection from "../FilterSelection/FilterSelection";

export default function SearchBar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: submit query
    console.log((event.target as HTMLFormElement).query.value);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <div className="flex w-5/6 items-center bg-white rounded border-2 border-unilectives-search">
      <form className="flex w-full" onSubmit={handleOnSubmit}>
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
      <button
        className={`p-2 bg-transparent`}
        onClick={handleFilterClick}
      >
        <AdjustmentsVerticalIcon className="w-6 h-6 text-unilectives-search" />
      </button>
      {/* Filter selection */}
      {isFilterOpen && <FilterSelection onClose={() => setIsFilterOpen(false)} />}
    </div>
  );
}

