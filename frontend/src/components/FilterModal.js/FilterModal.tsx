'use client';
import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';

export default function FilterModal({ open }: { open: boolean }) {
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

  const [facultiesCheckedState, setfacultiesCheckedState] = useState(
    new Array(faculties.length).fill(false)
  );

  const [termsCheckedState, setTermsCheckedState] = useState(
    new Array(terms.length).fill(false)
  );

  const handleOnClick = (type: string, position: number) => {
    if (type === 'faculty') {
      const updatedCheckedState = facultiesCheckedState.map((item, index) =>
        index === position ? !item : item
      );
      setfacultiesCheckedState(updatedCheckedState);
    } else if (type === 'term') {
      const updatedCheckedState = termsCheckedState.map((item, index) =>
        index === position ? !item : item
      );
      setTermsCheckedState(updatedCheckedState);
    }
  };

  return (
    <div
      onClick={() => {
        // setOpen(false);
      }}
      className={`${
        open ? 'block' : 'hidden'
      } ' fixed left-0 top-0 z-[1055] backdrop-blur-sm h-full w-full overflow-y-auto overflow-x-hidden outline-none flex'`}
    >
      <div className="bg-white w-1/3 h-3/4 rounded-lg p-8">
        <p className="text-2xl font-bold mb-4">Filter by:</p>
        <div>
          <p className="text-xl font-semibold mb-2">Faculty</p>
          <div className="flex flex-wrap mb-4">
            {faculties.map((faculty, index) => {
              return (
                <div
                  key={`faculty-${index}`}
                  id={`faculty-label-${index}`}
                  onClick={() => handleOnClick('faculty', index)}
                  className={`${
                    facultiesCheckedState[index]
                      ? 'bg-slate-600 text-white'
                      : 'bg-white'
                  } ' w-fit px-4 py-2 mx-1 my-1 rounded-full border-solid border-2 border-slate-600 '`}
                >
                  {faculty}
                </div>
                //    idk if u want real checkboxes
                //   <label key={`faculty-${index}`}>
                //     <input
                //       type="checkbox"
                //       id={`faculty-checkbox-${index}`}
                //       key={`faculty-${index}`}
                //       name={faculty}
                //       value={faculty}
                //       checked={facultiesCheckedState[index]}
                //       onChange={() => handleOnChange('faculty', index)}
                //     />
                //     {faculty}
                //   </label>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold mb-2">Term</p>
          <div className="flex flex-wrap mb-4">
            {terms.map((term, index) => {
              return (
                <div
                  key={`term-${index}`}
                  id={`term-label-${index}`}
                  onClick={() => handleOnClick('term', index)}
                  className={`${
                    termsCheckedState[index]
                      ? 'bg-slate-600 text-white'
                      : 'bg-white'
                  } ' w-fit px-4 py-2 mx-1 my-1 rounded-full border-solid border-2 border-slate-600 '`}
                >
                  {term}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
