"use client";

import React, { useState } from 'react';

export default function GridCheckbox() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const faculties = [
    { name: 'Arts, Design & Architecture', schools: ['Centre for Social Research in Health', 'School of Art & Design', 'School of Built Environment', 'School of Humanities and Languages', 'School of Social Sciences', 'School of the Arts and Media'] },
    { name: 'Business School', schools: ['School of Accounting', 'School of Banking and Finance', 'School of Economics', 'School of Information of Systems and Technology', 'School of Management', 'School of Marketing', 'School of Risk and Actuarial Studies', 'School of Taxation and Business Law'] },
    { name: 'Engineering', schools: ['School of Graduate Biomedical Engineering', 'School of Chemical Engineering', 'School of Civil and Environmental Engineering', 'School of Computer Science and Engineering', 'School of Electrical Engineering and Telecommunications', 'School of Mechanical and Manufacturing Engineering', 'School of Minerals and Energy Resources Engineering', 'School of Photovoltaic and Renewable Energy Engineering'] },
    { name: 'Medicine & Health', schools: ['School of Medical Sciences', 'School of Psychiatry', 'School of Public Health and Community Medicine', "School of Women's and Children's Health"] },
    { name: 'Science', schools: ['School of Aviation', 'School of Biological, Earth and Environmental Sciences', 'School of Chemistry', 'School of Materials Science and Engineering', 'School Mathematics and Statistics', 'School of Optometry and Vision Science', 'School of Physics', 'School of Psychology'] },
    { name: 'UNSW Canberra at ADFA', schools: ['School of Business', 'School of Engineering and Information Technology', 'School of Humanities and Social Sciences', 'School of Physical, Environmental and Mathematical Sciences'] },
    { name: 'Law & Justice', schools: [] },
    { name: 'Postgraduate Research', schools: [] },
    { name: 'UNSW Global', schools: [] },
  ];

  const handleFacultyChange = (event) => {
    const selectedFacultyName = event.target.value;
    const selectedFacultyObj = faculties.find((faculty) => faculty.name === selectedFacultyName);
    setSelectedFaculty(selectedFacultyObj?.schools.map((school) => ({ name: school, checked: false })));
  };

  const handleSelectAllSchools = (event) => {
    const selectAllChecked = event.target.checked;
    const updatedSchools = selectedFaculty.map((school) => ({
      ...school,
      checked: selectAllChecked,
    }));
    setSelectedFaculty(updatedSchools);
  };

  const handleSchoolChange = (event, index) => {
    const updatedSchools = [...selectedFaculty];
    updatedSchools[index].checked = event.target.checked;
    setSelectedFaculty(updatedSchools);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-0">

        {/* Faculty Selection Container */}
        <div className="col-span-1">
          <h2 className="font-semibold text-unilectives-search">Faculty</h2>
          <div className="p-2 bg-gray-50 rounded-l-lg border border-unilectives-search h-full overflow-y-auto">
            <div className="w-full">
              <ul className="list-none pl-4">
                {faculties.map((faculty) => (
                  <li key={faculty.name}>
                    <label>
                      <input
                        type="radio"
                        className="sr-only"
                        name="faculty"
                        value={faculty.name}
                        checked={selectedFaculty?.name === faculty.name} // Update checked condition
                        onChange={handleFacultyChange}
                      />
                      <span
                        className={`text-sm ${selectedFaculty?.name === faculty.name ? 'text-red-500' : 'text-black'} text-center`}
                      >
                        {faculty.name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* School Checkbox Container */}
        <div className="col-span-2">
          <h2 className="font-semibold text-unilectives-search">Schools</h2>
          <div className="p-2 bg-gray-50 rounded-r-lg border border-unilectives-search h-full flex flex-col">
            <div className="flex-grow">
              {selectedFaculty ? (
                selectedFaculty.length ? (
                  <ul className="list-none pl-4">
                    {/* Select All Schools Checkbox */}
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          className="mr-4 form-checkbox border border-unilectives-search"
                          checked={selectedFaculty.every((school) => school.checked)}
                          onChange={handleSelectAllSchools}
                        />
                        <span className="text-sm text-black">Select All</span>
                      </label>
                    </li>
                    {/* Individual School Checkboxes */}
                    {selectedFaculty.map((school, index) => (
                      <li key={school.name}>
                        <label>
                          <input
                            type="checkbox"
                            className="mr-4"
                            checked={school.checked}
                            onChange={(event) => handleSchoolChange(event, index)}
                          />
                          <span className="text-sm text-black">{school.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center items-center h-full flex-grow">
                    <p className="text-gray-500">No schools found for the selected faculty</p>
                  </div>
                )
              ) : (
                <div className="flex justify-center items-center h-full flex-grow">
                  <p className="text-gray-500">Please select a faculty first</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
