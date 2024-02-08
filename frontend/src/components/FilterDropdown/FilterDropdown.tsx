"use client";
import React from "react";
import MultiDropdown from "@/components/MultiDropdown/MultiDropdown";

export default function FilterDropdown({
  selected,
  setSelected,
  options,
  placeholder
}: {
  selected: string[];
  setSelected: (str: string[]) => void;
  options: string[];
  placeholder: string
}) {
  
  return (
    <div className="w-5/6">
      <div className="mt-4 flex-1 min-w-[150px] max-w-[200px] xs:min-w-full z-10">
        <MultiDropdown
          options={options}
          defaultValue={selected}
          onChange={setSelected}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
