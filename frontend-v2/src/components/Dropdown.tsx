"use client";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Dropdown({
  options,
  handleSelectionChange,
}: {
  options: string[];
  handleSelectionChange?: (selected: string) => void;
}) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (handleSelectionChange) {
      handleSelectionChange(selected);
    }
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-50">
        <Listbox.Button className="relative flex items-center justify-between gap-2 w-full max-w-[250px] cursor-pointer bg-white py-2 px-4 text-left border border-unilectives-subheadings rounded-md shadow-dropdown aria-expanded:border-b-0 aria-expanded:rounded-b-none">
          <span className="block truncate">
            {selected ? (
              <span>{selected}</span>
            ) : (
              <span className="text-unilectives-subheadings">Sort by</span>
            )}
          </span>
          <span className="pointer-events-none">
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute max-h-60 w-full max-w-[250px] overflow-auto border border-unilectives-subheadings rounded-md bg-white shadow-dropdown border-t-0 rounded-t-none">
          {options &&
            options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? "bg-unilectives-subheadings/20" : ""
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-bold" : "font-normal"
                    }`}
                  >
                    {option}
                  </span>
                )}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
