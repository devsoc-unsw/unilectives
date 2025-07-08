"use client";
import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Course } from "@/types/api";

export default function FilterModal({
  filters,
  setFilters,
}: {
  filters: { terms: string[]; faculties: string[] };
  setFilters: React.Dispatch<
    React.SetStateAction<{ faculties: string[]; terms: string[] }>
  >;
}) {
  const faculties = [
    "Arts",
    "Business",
    "Engineering",
    "Law",
    "Medicine",
    "Science",
    "UNSW Canberra",
  ];

  const terms = [
    "Summer",
    "Term 1",
    "Term 2",
    "Term 3",
    "Semester 1",
    "Semester 2",
    "Not Offered",
  ];

  const termsShortened = [
    "Summer",
    "T1",
    "T2",
    "T3",
    "Sem 1",
    "Sem 2",
    "Not Offered",
  ];

  const [facultiesCheckedState, setFacultiesCheckedState] = useState(
    new Array(faculties.length).fill(false),
  );

  const [termsCheckedState, setTermsCheckedState] = useState(
    new Array(terms.length).fill(false),
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
    const selectedFaculties: string[] = [];
    const selectedTerms: string[] = [];

    faculties.map((faculty, index) => {
      // if selected
      if (facultiesCheckedState[index]) {
        if (faculty === "UNSW Canberra") {
          selectedFaculties.push("UNSW_Canberra");
        } else {
          selectedFaculties.push(faculty);
        }
      }
    });

    // terms are 0, 1, 2, 3 (summer, t1, t2, t3)
    // semesters are -1, -2
    // not offered is "None"
    terms.map((term, index) => {
      // if selected
      if (termsCheckedState[index]) {
        if (term === "Not Offered") {
          selectedTerms.push("None");
        } else if (term === "Summer") {
          selectedTerms.push("0");
        } else {
          let termString = term.split(" ");
          if (termString[0] === "Term") {
            selectedTerms.push(termString[1]);
          } else if (termString[0] === "Semester") {
            selectedTerms.push(`-${termString[1]}`);
          }
        }
      }
    });

    setFilters({ faculties: selectedFaculties, terms: selectedTerms });

    setOpen(false);
  };

  const handleTagOnClick = (type: string, position: number) => {
    if (type === "faculty") {
      const updatedCheckedState = facultiesCheckedState.map((item, index) =>
        index === position ? !item : item,
      );
      setFacultiesCheckedState(updatedCheckedState);
    } else if (type === "term") {
      const updatedCheckedState = termsCheckedState.map((item, index) =>
        index === position ? !item : item,
      );
      setTermsCheckedState(updatedCheckedState);
    }
  };

  const styledFilterButton = (
    type: string,
    index: number,
    isChecked: boolean,
    label: string,
  ) => {
    return (
      <button
        key={`${type}-${index}`}
        id={`${type}-label-${index}`}
        onClick={() => handleTagOnClick(type, index)}
        className={`${
          isChecked
            ? "bg-unilectives-indigo text-white dark:text-gray-900 font-medium"
            : " text-unilectives-indigo font-medium"
        } ' hover:bg-[#6f7fb3] hover:border-[#6f7fb3] hover:text-white  w-fit px-4 py-2 mx-1 my-1 rounded-full border-solid border-[1.5px]  border-unilectives-indigo '`}
      >
        {label}
      </button>
    );
  };

  return (
    <>
    <div>
      {/* filter button */}
      <div className="mt-4 min-w-[140px] xs:min-w-1/2">
        <button
          className="relative flex items-center dark:text-white dark:bg-gray-900 justify-between gap-2 w-full cursor-pointer py-2 px-4 text-left text-[#989898] border border-unilectives-subheadings rounded-md shadow-review-card aria-expanded:border-b-transparent aria-expanded:rounded-b-none"
          onClick={() => {
            setOpen(true);
          }}
        >
          Filter
          <AdjustmentsHorizontalIcon className="w-4 h-4 rounded-full dark:text-white text-black" />
        </button>
      </div>

      {/* filter dialog */}
      <Transition show={open}>
        <Dialog open={open} onClose={handleClose} className="fixed inset-0 z-10">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          {/* Modal content wrapper */}
          <div className="fixed inset-0 flex items-center justify-center p-4 ">
            <Transition.Child
              enter="transition-transform ease-out duration-700"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition-transform ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-sm p-8 rounded dark:bg-gray-900 bg-white flex flex-col xs:w-full">
                    <button className="w-6 h-6 place-self-end" onClick={handleClose}>
                      <XMarkIcon />
                    </button>
                    <Dialog.Title className="text-2xl dark:text-white font-bold mb-4 text-unilectives-headings">
                      Filter by:
                    </Dialog.Title>
                    <Dialog.Description className="text-xl font-semibold mb-2 ">
                      Faculty
                    </Dialog.Description>
                    {/* display the faculty tags */}
                    <div className="flex flex-wrap mb-4">
                      {faculties.map((faculty, index) => {
                        return styledFilterButton(
                          "faculty",
                          index,
                          facultiesCheckedState[index],
                          faculty,
                        );
                      })}
                    </div>
                    <Dialog.Description className="text-xl font-semibold mb-2">
                      Term
                    </Dialog.Description>
                    {/* display the term tags */}
                    <div className="sm:hidden flex flex-wrap mb-4">
                      {terms.map((term, index) => {
                        return styledFilterButton(
                          "term",
                          index,
                          termsCheckedState[index],
                          term,
                        );
                      })}
                    </div>
                    <div className="sm:flex hidden flex-wrap mb-4 ">
                      {termsShortened.map((term, index) => {
                        return styledFilterButton(
                          "term",
                          index,
                          termsCheckedState[index],
                          term,
                        );
                      })}
                    </div>

                    <div className="flex justify-between mt-4 xs:flex-col xs:gap-4">
                      <button
                        className="flex items-center justify-center xs:w-full dark:hover:border-gray-900 gap-1 px-4 py-2 text-unilectives-button border-2 border-unilectives-button rounded-md hover:bg-unilectives-icon/95 hover:border-unilectives-icon/95 hover:text-white hover:border-white font-bold disabled:opacity-50"
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </div>
    </>
  );
}
