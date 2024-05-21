'use client';
import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Course } from '@/types/api';

// TODO: fix the setOpen type
export default function FilterModal({
  filters,
  setFilters,
}: {
  filters: { terms: number[]; faculties: string[] };
  setFilters: any;
}) {
  const faculties = [
    'Arts',
    'Business',
    'Engineering',
    'Law',
    'Medicine',
    'Science',
    'UNSW Canberra',
  ];

  const terms = ['Summer', 'Term 1', 'Term 2', 'Term 3', 'N/A'];

  const [facultiesCheckedState, setFacultiesCheckedState] = useState(
    new Array(faculties.length).fill(false)
  );

  const [termsCheckedState, setTermsCheckedState] = useState(
    new Array(terms.length).fill(false)
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    // if no filters were applied then clear all
    if (filters.terms.length === 0 && filters.faculties.length === 0) {
      handleClearAll();
    }
    setOpen(false);
  };

  const handleClearAll = () => {
    setTermsCheckedState(new Array(terms.length).fill(false));
    setFacultiesCheckedState(new Array(faculties.length).fill(false));
  };

  const handleApply = () => {
    const selectedFaculties: String[] = [];
    const selectedTerms: number[] = [];

    faculties.map((faculty, index) => {
      if (facultiesCheckedState[index]) {
        selectedFaculties.push(faculty);
      }
    });

    // terms are 0, 1, 2, 3 (summer, t1, t2, t3)
    // TODO: ask about N/A
    termsCheckedState.map((checked, index) => {
      if (checked) {
        selectedTerms.push(index);
      }
    });

    setFilters({ faculties: selectedFaculties, terms: selectedTerms });

    setOpen(false);
  };

  const handleTagOnClick = (type: string, position: number) => {
    if (type === 'faculty') {
      const updatedCheckedState = facultiesCheckedState.map((item, index) =>
        index === position ? !item : item
      );
      setFacultiesCheckedState(updatedCheckedState);
    } else if (type === 'term') {
      const updatedCheckedState = termsCheckedState.map((item, index) =>
        index === position ? !item : item
      );
      setTermsCheckedState(updatedCheckedState);
    }
  };

  return (
    <>
      {/* filter button */}
      <div className="mt-4 min-w-[140px] xs:min-w-1/2">
        <button
          className="relative flex items-center justify-between gap-2 w-full cursor-pointer py-2 px-4 text-left text-[#989898] border border-unilectives-subheadings rounded-md shadow-review-card aria-expanded:border-b-transparent aria-expanded:rounded-b-none"
          onClick={() => {
            setOpen(true);
          }}
        >
          Filter
          <AdjustmentsHorizontalIcon className="w-4 h-4 rounded-full text-black" />
        </button>
      </div>

      {/* filter dialog */}
      <Dialog open={open} onClose={handleClose}>
        {/* the blurred backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center pl-20 z-10 ">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm p-8 rounded bg-white flex flex-col xs:w-full">
            <button className="w-6 h-6 place-self-end" onClick={handleClose}>
              {/* TODO: IT WONT GO TO THE RIGHT */}
              <XMarkIcon />
            </button>
            <Dialog.Title className="text-2xl font-bold mb-4 text-unilectives-headings">
              Filter by:
            </Dialog.Title>
            <Dialog.Description className="text-xl font-semibold mb-2 ">
              Faculty
            </Dialog.Description>
            {/* display the faculty tags */}
            <div className="flex flex-wrap mb-4">
              {faculties.map((faculty, index) => {
                return (
                  <div
                    key={`faculty-${index}`}
                    id={`faculty-label-${index}`}
                    onClick={() => handleTagOnClick('faculty', index)}
                    className={`${
                      facultiesCheckedState[index]
                        ? 'bg-unilectives-indigo text-white font-medium'
                        : ' text-unilectives-indigo font-medium'
                    } ' w-fit px-4 py-2 mx-1 my-1 rounded-full border-solid border-[1.5px]  border-unilectives-indigo '`}
                  >
                    {faculty}
                  </div>
                );
              })}
            </div>
            <Dialog.Description className="text-xl font-semibold mb-2">
              Term
            </Dialog.Description>
            {/* display the term tags */}
            <div className="flex flex-wrap mb-4">
              {terms.map((term, index) => {
                return (
                  <div
                    key={`term-${index}`}
                    id={`term-label-${index}`}
                    onClick={() => handleTagOnClick('term', index)}
                    className={`${
                      termsCheckedState[index]
                        ? 'bg-unilectives-indigo text-white font-medium'
                        : ' text-unilectives-indigo font-medium'
                    } ' w-fit px-4 py-2 mx-1 my-1 rounded-full border-solid border-[1.5px] border-unilectives-indigo '`}
                  >
                    {term}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-4 xs:flex-col xs:gap-4">
              <button
                className="flex items-center justify-center w-1/3 xs:w-full gap-1 px-4 py-2 text-unilectives-button border-2 border-unilectives-button rounded-md hover:bg-unilectives-icon/95 hover:text-white hover:border-white font-bold disabled:opacity-50"
                onClick={handleClearAll}
              >
                Clear All
              </button>
              <button
                className="flex items-center justify-center w-1/3 xs:w-full gap-1 px-4 py-2 bg-unilectives-button text-white rounded-md hover:bg-unilectives-icon/95 font-bold disabled:opacity-50"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
