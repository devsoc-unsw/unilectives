"use client";
import React from "react";
import Dropdown from "../Dropdown/Dropdown";

export default function SortDropdownBar({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (str: string) => void;
}) {
  return (
    <div className="w-5/6">
      <div className="mt-4 flex-1 min-w-[150px] max-w-[200px] xs:min-w-full z-10">
        <Dropdown
          options={[
            "Alphabetical (A-Z)",
            "Alphabetical (Z-A)",
            "Overall Rating",
            "Enjoyability",
            "Usefulness",
            "Manageability",
          ]}
          defaultValue={selected}
          onChange={setSelected}
          placeholder="Sort by"
        />
      </div>
    </div>
  );
}
