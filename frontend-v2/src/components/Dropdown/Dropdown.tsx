"use client";

import { useCallback, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  placeholder,
}: {
  options: string[];
  defaultValue?: string | null;
  onChange?: (selected: string) => void;
  placeholder?: string;
}) {
  const [selected, setSelected] = useState(defaultValue ?? "");

  useEffect(() => {
    if (!defaultValue) return;
    setSelected(defaultValue as string);
  }, [defaultValue]);

  // Handle dropdown value change
  const handleOnChange = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      }
      setSelected(value);
    },
    [onChange]
  );

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      <div className="relative">
        {/* Dropdown when not expanded */}
        <Listbox.Button className="relative flex items-center justify-between gap-2 w-full cursor-pointer bg-white py-2 px-4 text-left border border-unilectives-subheadings rounded-md shadow-review-card aria-expanded:border-b-transparent aria-expanded:rounded-b-none">
          <span className="block truncate">
            {selected ? (
              <span>{selected}</span>
            ) : (
              <span className="text-unilectives-subheadings">
                {placeholder}
              </span>
            )}
          </span>
          <span className="pointer-events-none">
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </Listbox.Button>
        {/* Dropdown options */}
        <Listbox.Options className="absolute max-h-[10.05rem] text-left w-full overflow-auto border border-unilectives-subheadings rounded-md bg-white shadow-dropdown border-t-0 rounded-t-none">
          {options.length === 0 ? (
            <Listbox.Option
              value=""
              disabled
              className="relative cursor-default select-none py-2 px-4 bg-white text-unilectives-subheadings/50"
            >
              <span className="block truncate">No options yet</span>
            </Listbox.Option>
          ) : (
            options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-unilectives-subheadings/20" : "bg-white"
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
            ))
          )}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
