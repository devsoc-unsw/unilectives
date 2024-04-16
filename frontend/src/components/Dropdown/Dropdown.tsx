"use client";

import { useCallback, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  placeholder,
  manualChange,
}: {
  options: string[];
  defaultValue?: string | null;
  onChange?: (selected: string) => void;
  placeholder?: string;
  manualChange?: boolean;
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
      if (manualChange === undefined) {
        setSelected(value);
      }
    },
    [onChange]
  );

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      <div className='relative'>
        {/* Dropdown when not expanded */}
        <Listbox.Button className='relative flex items-center justify-between gap-2 w-full cursor-pointer bg-white dark:bg-slate-900 py-2 px-4 text-left border border-unilectives-subheadings rounded-md shadow-review-card aria-expanded:border-b-transparent aria-expanded:rounded-b-none duration-150'>
          <span className='block truncate'>
            {selected ? (
              <span>{selected}</span>
            ) : (
              <span className='text-unilectives-subheadings dark:text-white'>
                {placeholder}
              </span>
            )}
          </span>
          <span className='pointer-events-none'>
            <ChevronDownIcon className='h-4 w-4' aria-hidden='true' />
          </span>
        </Listbox.Button>
        {/* Dropdown options */}
        <Listbox.Options className='absolute z-10 max-h-[10.05rem] text-left w-full overflow-auto border border-unilectives-subheadings rounded-md bg-white dark:bg-slate-900 shadow-dropdown border-t-0 rounded-t-none'>
          {options.length === 0 ? (
            <Listbox.Option
              value=''
              disabled
              className='relative cursor-default select-none py-2 px-4 bg-white dark:bg-slate-900 text-unilectives-subheadings/50 dark:text-gray-50'
            >
              <span className='block truncate'>No options yet</span>
            </Listbox.Option>
          ) : (
            options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-4 ${
                    active
                      ? "bg-unilectives-subheadings/20 dark:bg-gray-50 text-unilectives-subheadings dark:text-gray-900"
                      : "bg-white dark:bg-slate-900"
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
