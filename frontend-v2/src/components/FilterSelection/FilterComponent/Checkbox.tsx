"use client";

import React, { useState } from 'react';

export default function Checkbox() {
    const [termCheckboxes, setTermCheckboxes] = useState([false, false, false]);
    const [hexasemesterCheckboxes, setHexasemesterCheckboxes] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [semesterCheckboxes, setSemesterCheckboxes] = useState([
        false,
        false,
        false,
    ]);

    const handleCheckboxChange = (checkboxes, index, event) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = event.target.checked;
        return newCheckboxes;
    };

    const handleSelectAllChange = (checkboxes, setCheckboxes, isChecked) => {
        const newCheckboxes = checkboxes.map(() => isChecked);
        setCheckboxes(newCheckboxes);
    };

    const handleTermCheckboxChange = (index, event) => {
        setTermCheckboxes((prevCheckboxes) =>
            handleCheckboxChange(prevCheckboxes, index, event)
        );
    };

    const handleHexasemesterCheckboxChange = (index, event) => {
        setHexasemesterCheckboxes((prevCheckboxes) =>
            handleCheckboxChange(prevCheckboxes, index, event)
        );
    };

    const handleSemesterCheckboxChange = (index, event) => {
        setSemesterCheckboxes((prevCheckboxes) =>
            handleCheckboxChange(prevCheckboxes, index, event)
        );
    };

    const handleSelectAllTermChange = (event) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(termCheckboxes, setTermCheckboxes, isChecked);
    };

    const handleSelectAllHexasemesterChange = (event) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(hexasemesterCheckboxes, setHexasemesterCheckboxes, isChecked);
    };

    const handleSelectAllSemesterChange = (event) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(semesterCheckboxes, setSemesterCheckboxes, isChecked);
    };

    return (
        <div className="w-full text-unilectives-search">
            {/* Term offering */}
            <div className="py-10">
                <h2 className="font-semibold">Term Offering</h2>
                <div className="grid grid-cols-3 gap-4 text-black py-2">
                    {/* First Grid */}
                    <div className="text-base">
                        <div>
                            <input
                                type="checkbox"
                                id="selectAllTerm"
                                className="mr-4"
                                checked={termCheckboxes.every(Boolean)}
                                onChange={handleSelectAllTermChange}
                            />
                            <label htmlFor="selectAllTerm">Select All</label>
                        </div>
                        {termCheckboxes.map((isChecked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`term${index}`}
                                    className="mr-4"
                                    checked={isChecked}
                                    onChange={(event) => handleTermCheckboxChange(index, event)}
                                />
                                <label htmlFor={`term${index}`}>Term {index + 1}</label>
                            </div>
                        ))}
                    </div>

                    {/* Second Grid */}
                    <div className="text-base">
                        <div>
                            <input
                                type="checkbox"
                                id="selectAllHexasemester"
                                className="mr-4"
                                checked={hexasemesterCheckboxes.every(Boolean)}
                                onChange={handleSelectAllHexasemesterChange}
                            />
                            <label htmlFor="selectAllHexasemester">Select All</label>
                        </div>
                        {hexasemesterCheckboxes.map((isChecked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`hexasemester${index}`}
                                    className="mr-4"
                                    checked={isChecked}
                                    onChange={(event) => handleHexasemesterCheckboxChange(index, event)}
                                />
                                <label htmlFor={`hexasemester${index}`}>Hexasemester {index + 1}</label>
                            </div>
                        ))}
                    </div>

                    {/* Third Grid */}
                    <div className="text-base">
                        <div>
                            <input
                                type="checkbox"
                                id="selectAllSemester"
                                className="mr-4"
                                checked={semesterCheckboxes.every(Boolean)}
                                onChange={handleSelectAllSemesterChange}
                            />
                            <label htmlFor="selectAllSemester">Select All</label>
                        </div>
                        {semesterCheckboxes.map((isChecked, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`semester${index}`}
                                    className="mr-4"
                                    checked={isChecked}
                                    onChange={(event) => handleSemesterCheckboxChange(index, event)}
                                />
                                <label htmlFor={`semester${index}`}>Semester {index + 1}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
``
