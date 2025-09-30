'use client';
import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

export default function SortDropdownBar({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (str: string) => void;
}) {
  return (
    <div className="min-w-[180px] xs:min-w-1/2">
      <div className=" w-full mt-4 ">
        <Dropdown
          options={[
            'Alphabetical (A-Z)',
            'Alphabetical (Z-A)',
            'Overall Rating',
            'Enjoyability',
            'Usefulness',
            'Manageability',
          ]}
          defaultValue={selected}
          onChange={setSelected}
          placeholder="Select..."
        />
      </div>
    </div>
  );
}
