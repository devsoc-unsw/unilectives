'use client';
import React from 'react';
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import FilterModal from '../FilterModal.js/FilterModal';
// import { FunnelIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function FilterButton({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (str: string) => void;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="mt-4 flex-1 min-w-[150px] max-w-[200px] xs:min-w-full z-10">
        <button
          className="relative flex items-center justify-between gap-2 w-full cursor-pointer bg-white py-2 px-4 text-left border border-unilectives-subheadings rounded-md shadow-review-card aria-expanded:border-b-transparent aria-expanded:rounded-b-none"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Filter
          <AdjustmentsHorizontalIcon className="w-4 h-4 rounded-full" />
        </button>
        <FilterModal open={openModal} />
      </div>
    </div>
  );
}
