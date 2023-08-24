"use client";

import { Course } from "@/types/api";
import React, { useState } from "react";
import { Checkbox } from "@material-tailwind/react";

export default function FilterSelection({
    courses,
    onChange,
}: {
    courses: Course[];
    onChange: (courses: Course[]) => void;
}) {
    // Study Level & General Edcucation Selection
    const [selectedStudyLevels, setSelectedStudyLevels] = useState([]);
    // Event handler to toggle checkbox selection
    const toggleCheckbox = (label: String) => {
        if (selectedStudyLevels.includes(label)) {
            setSelectedStudyLevels(selectedStudyLevels.filter(item => item !== label));
        } else {
            setSelectedStudyLevels([...selectedStudyLevels, label]);
        }
    };

    // Faculty Selection
    const [selectedFaculties, setSelectedFaculties] = useState([]);
    const faculties = [
        { name: 'Art, Design & Architecture' },
        { name: 'Business School' },
        { name: 'Engineering' },
        { name: 'Medicine & Health' },
        { name: 'UNSW Canberra at ADFA' },
        { name: 'Law & Justice' },
        { name: 'Postgraduate Research' },
        { name: 'UNSW Global' },
    ];
    const toggleFacultyCheckbox = (label: String) => {
        if (selectedFaculties.includes(label)) {
            setSelectedFaculties(selectedFaculties.filter(item => item !== label));
        } else {
            setSelectedFaculties([...selectedFaculties, label]);
        }
    };

    const toggleSelectAllFaculties = () => {
        if (selectedFaculties.length === faculties.length) {
            setSelectedFaculties([]);
        } else {
            setSelectedFaculties(faculties.map(faculty => faculty.name));
        }
    };

    // Term Offering Selection
    const [selectedTermOfferings, setSelectedTermOfferings] = useState([]);
    const termOfferings = [
        "Summer Term",
        "Term 1",
        "Term 2",
        "Term 3",
    ];
    const toggleTermOfferingCheckbox = (label) => {
        if (selectedTermOfferings.includes(label)) {
            setSelectedTermOfferings(selectedTermOfferings.filter(item => item !== label));
        } else {
            setSelectedTermOfferings([...selectedTermOfferings, label]);
        }
    };

    const toggleSelectAllTermOfferings = () => {
        if (selectedTermOfferings.length === termOfferings.length) {
            setSelectedTermOfferings([]);
        } else {
            setSelectedTermOfferings(termOfferings);
        }
    };
    // Clear & Search buttons
    const handleClearSelection = () => {
        setSelectedStudyLevels([]);
    };

    // Event handler for the search button
    const handleSearch = () => {
        // Perform search or filtering logic based on selectedStudyLevels
        console.log('Selected study levels:', selectedStudyLevels);
        // ... perform further actions
    };
    return (
        <>
            {/* Tab Option */}
            <div className="text-lg font-semibold">
                Study Level
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                <Checkbox label="Undergraduate" checked={selectedStudyLevels.includes("Undergraduate")} onChange={() => toggleCheckbox("Undergraduate")} />
                <Checkbox label="Postgraduate" checked={selectedStudyLevels.includes("Postgraduate")} onChange={() => toggleCheckbox("Postgraduate")} />
                <Checkbox label="Research" checked={selectedStudyLevels.includes("Research")} onChange={() => toggleCheckbox("Research")} />
            </div>
            {/* CheckboxGrid */}
            <div className="text-lg font-semibold">
                General Education
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                <Checkbox label="Yes" />
                <Checkbox label="No" />
            </div>
            {/* Faculty Checkbox */}
            <div className="text-lg font-semibold">Faculty</div>
            <div className="flex flex-wrap gap-2 text-sm">
                <Checkbox label="Select All" checked={selectedFaculties.length === faculties.length} onChange={toggleSelectAllFaculties} />
                {faculties.map(faculty => (
                    <Checkbox
                        key={faculty.name}
                        label={faculty.name}
                        checked={selectedFaculties.includes(faculty.name)}
                        onChange={() => toggleFacultyCheckbox(faculty.name)}
                    />
                ))}
            </div>

            {/* Term Offering */}
            <div className="text-lg font-semibold">Term Offering</div>
            <div className="flex flex-wrap gap-2 text-sm">
                <Checkbox label="Select All" checked={selectedTermOfferings.length === termOfferings.length} onChange={toggleSelectAllTermOfferings} />
                {termOfferings.map(term => (
                    <Checkbox
                        key={term}
                        label={term}
                        checked={selectedTermOfferings.includes(term)}
                        onChange={() => toggleTermOfferingCheckbox(term)}
                    />
                ))}
            </div>
            {/* Control Button */}
            <div className="flex flex-wrap justify-between items-center py-2 gap-4">
                <button className="px-4 py-2 bg-gray-600 text-white text-base rounded-md ml-2 focus:outline-none border-round font-semibold" onClick={handleClearSelection}>
                    Clear Filters
                </button>
                <button className="px-4 py-2 bg-unilectives-button text-white text-base rounded-md ml-2 focus:outline-none border-round font-semibold" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </>
    );
}