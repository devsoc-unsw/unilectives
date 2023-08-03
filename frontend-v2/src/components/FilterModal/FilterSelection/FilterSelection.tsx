"use client";

import { Tab } from "@headlessui/react";
import { Course } from "@/types/api";
import React, { useMemo, useState, FormEvent } from "react";

export default function FilterSelection({
    courses,
    onChange,
}: {
    courses: Course[];
    onChange: (courses: Course[]) => void;
}) {
    // Study Level & General Edcucation Selection
    const [selectedStudyLevel, setStudyLevel] = useState("Undergraduate");
    const [isGenEd, setIsGenEd] = useState(true);

    const handleLevelSelect = (level: string) => {
        setStudyLevel(level);
    };

    const handleGeneralEducationSelect = (option: boolean) => {
        setIsGenEd(option);
    };

    // Faculty & School Selection
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const faculties = [
        {
            name: "Arts, Design & Architecture",
            schools: [
                "Centre for Social Research in Health",
                "School of Art & Design",
                "School of Built Environment",
                "School of Humanities and Languages",
                "School of Social Sciences",
                "School of the Arts and Media",
            ],
        },
        {
            name: "Business School",
            schools: [
                "School of Accounting",
                "School of Banking and Finance",
                "School of Economics",
                "School of Information of Systems and Technology",
                "School of Management",
                "School of Marketing",
                "School of Risk and Actuarial Studies",
                "School of Taxation and Business Law",
            ],
        },
        {
            name: "Engineering",
            schools: [
                "School of Graduate Biomedical Engineering",
                "School of Chemical Engineering",
                "School of Civil and Environmental Engineering",
                "School of Computer Science and Engineering",
                "School of Electrical Engineering and Telecommunications",
                "School of Mechanical and Manufacturing Engineering",
                "School of Minerals and Energy Resources Engineering",
                "School of Photovoltaic and Renewable Energy Engineering",
            ],
        },
        {
            name: "Medicine & Health",
            schools: [
                "School of Medical Sciences",
                "School of Psychiatry",
                "School of Public Health and Community Medicine",
                "School of Women's and Children's Health",
            ],
        },
        {
            name: "Science",
            schools: [
                "School of Aviation",
                "School of Biological, Earth and Environmental Sciences",
                "School of Chemistry",
                "School of Materials Science and Engineering",
                "School Mathematics and Statistics",
                "School of Optometry and Vision Science",
                "School of Physics",
                "School of Psychology",
            ],
        },
        {
            name: "UNSW Canberra at ADFA",
            schools: [
                "School of Business",
                "School of Engineering and Information Technology",
                "School of Humanities and Social Sciences",
                "School of Physical, Environmental and Mathematical Sciences",
            ],
        },
        { name: "Law & Justice", schools: [] },
        { name: "Postgraduate Research", schools: [] },
        { name: "UNSW Global", schools: [] },
    ];

    // Not sure with the event thingy here
    const handleFacultyChange = (event: FormEvent) => {
        const selectedFacultyName = event.target.value;
        const selectedFacultyObj = faculties.find(
            (faculty) => faculty.name === selectedFacultyName
        );
        setSelectedFaculty(
            selectedFacultyObj?.schools.map((school: string) => ({
                name: school,
                checked: false,
            }))
        );
    };


    const handleSelectAllSchools = (event: FormEvent) => {
        const selectAllChecked = event.target.checked;
        const updatedSchools = selectedFaculty.map((school: string) => ({
            ...school,
            checked: selectAllChecked,
        }));
        setSelectedFaculty(updatedSchools);
    };

    const handleSchoolChange = (event: FormEvent, index: number) => {
        const updatedSchools = [...selectedFaculty];
        updatedSchools[index].checked = event.target.checked;
        setSelectedFaculty(updatedSchools);
    };

    // Term Offering Selection
    const [termCheckboxes, setTermCheckboxes] = useState<boolean[]>([false, false, false]);
    const [hexasemesterCheckboxes, setHexasemesterCheckboxes] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [semesterCheckboxes, setSemesterCheckboxes] = useState<boolean[]>([false, false, false]);

    const handleCheckboxChange = (checkboxes: boolean[], index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = event.target.checked;
        return newCheckboxes;
    };

    const handleSelectAllChange = (checkboxes: boolean[], setCheckboxes: React.Dispatch<React.SetStateAction<boolean[]>>, isChecked: boolean) => {
        const newCheckboxes = checkboxes.map(() => isChecked);
        setCheckboxes(newCheckboxes);
    };

    const handleTermCheckboxChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        setTermCheckboxes((prevCheckboxes) => handleCheckboxChange(prevCheckboxes, index, event));
    };

    const handleHexasemesterCheckboxChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        setHexasemesterCheckboxes((prevCheckboxes) => handleCheckboxChange(prevCheckboxes, index, event));
    };

    const handleSemesterCheckboxChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        setSemesterCheckboxes((prevCheckboxes) => handleCheckboxChange(prevCheckboxes, index, event));
    };

    const handleSelectAllTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(termCheckboxes, setTermCheckboxes, isChecked);
    };

    const handleSelectAllHexasemesterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(hexasemesterCheckboxes, setHexasemesterCheckboxes, isChecked);
    };

    const handleSelectAllSemesterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        handleSelectAllChange(semesterCheckboxes, setSemesterCheckboxes, isChecked);
    };

    // Clear & Search buttons
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleSearch = () => {
        const filteredCourses = filteredCoursesArray();

        onChange(filteredCourses);
    };

    const handleClearSelection = () => {
        setStudyLevel("Undergraduate");
        setIsGenEd(true);
        setSelectedFaculty(null);
        setTermCheckboxes([false, false, false]);
        setHexasemesterCheckboxes([false, false, false, false, false, false]);
        setSemesterCheckboxes([false, false, false]);
        setSelectedTypes([]);
    };

    // Functionality not yet done
    // const filteredCoursesArray = useMemo(() => {
    //     // Apply the selected filters to the original courses array
    //     let filtered = courses;

    //     // Filter by study level
    //     filtered = filtered.filter((course) =>
    //         selectedStudyLevel === "All" ? true : course.studyLevel === selectedStudyLevel
    //     );

    //     // Filter by general education
    //     filtered = filtered.filter((course) =>
    //         course.genEd === (isGenEd === true)
    //     );

    //     // Filter by faculty and schools
    //     if (selectedFaculty && selectedFaculty.length > 0) {
    //         const selectedSchools = selectedFaculty
    //             .filter((school: string) => school.checked)
    //             .map((school: string) => school.name);

    //         if (selectedSchools.length > 0) {
    //             filtered = filtered.filter((course: Course[]) =>
    //                 selectedSchools.includes(course.school)
    //             );
    //         }
    //     }

    //     // Filter by term offering checkboxes
    //     const selectedTerms = termCheckboxes.map((isChecked, index) =>
    //         isChecked ? index + 1 : null
    //     ).filter(Boolean);
    //     if (selectedTerms.length > 0) {
    //         filtered = filtered.filter((course) =>
    //             selectedTerms.includes(course.terms)
    //         );
    //     }

    //     // Filter by hexasemester offering checkboxes
    //     const selectedHexasemesters = hexasemesterCheckboxes.map((isChecked, index) =>
    //         isChecked ? index + 1 : null
    //     ).filter(Boolean);
    //     if (selectedHexasemesters.length > 0) {
    //         filtered = filtered.filter((course) =>
    //             selectedHexasemesters.includes(course.terms)
    //         );
    //     }

    //     // Filter by semester offering checkboxes
    //     const selectedSemesters = semesterCheckboxes.map((isChecked, index) =>
    //         isChecked ? index + 1 : null
    //     ).filter(Boolean);
    //     if (selectedSemesters.length > 0) {
    //         filtered = filtered.filter((course) =>
    //             selectedSemesters.includes(course.terms)
    //         );
    //     }

    //     // Return the filtered courses
    //     return filtered;
    // }, [
    //     courses,
    //     selectedStudyLevel,
    //     isGenEd,
    //     selectedFaculty,
    //     termCheckboxes,
    //     hexasemesterCheckboxes,
    //     semesterCheckboxes,
    // ]);

    return (
        <>
            {/* Tab Option */}
            <div className="w-full space-y-4 text-unilectives-search">
                <div className="flex sm:flex-col gap-2 items-center">
                    <div className="font-semibold flex-shrink-0 sm:self-start">
                        Study Level
                    </div>
                    <Tab.Group>
                        <Tab.List className="flex sm:flex-wrap justify-center flex-grow">
                            <Tab
                                className={({ selected }) =>
                                    `flex items-center justify-center w-full sm:rounded-none rounded-l-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? "bg-gray-200 text-black" : ""
                                    }`
                                }
                                onClick={() => handleLevelSelect("Undergraduate")}
                                selected={selectedStudyLevel === "Undergraduate"}
                            >
                                Undergraduate
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `flex items-center justify-center w-full sm:rounded-none py-1 px-6 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? "bg-gray-200 text-black" : ""
                                    }`
                                }
                                onClick={() => handleLevelSelect("Postgraduate")}
                                selected={selectedStudyLevel === "Postgraduate"}
                            >
                                Postgraduate
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `flex items-center justify-center w-full sm:rounded-none rounded-r-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? "bg-gray-200 text-black" : ""
                                    }`
                                }
                                onClick={() => handleLevelSelect("Research")}
                                selected={selectedStudyLevel === "Research"}
                            >
                                Research
                            </Tab>
                        </Tab.List>
                    </Tab.Group>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="font-semibold flex-shrink-0">General Education</div>
                    <Tab.Group>
                        <Tab.List className="flex justify-center flex-grow px-20 sm:px-0">
                            <Tab
                                className={({ selected }) =>
                                    `flex justify-center items-center w-full rounded-l-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? "bg-gray-200 text-black" : ""
                                    }`
                                }
                                onClick={() => handleGeneralEducationSelect(true)}
                                selected={isGenEd === true}
                            >
                                Yes
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    `flex justify-center items-center w-full rounded-r-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? "bg-gray-200 text-black" : ""
                                    }`
                                }
                                onClick={() => handleGeneralEducationSelect(false)}
                                selected={isGenEd === false}
                            >
                                No
                            </Tab>
                        </Tab.List>
                    </Tab.Group>
                </div>
            </div>
            {/* CheckboxGrid */}
            <div className="grid grid-cols-3 gap-0">
                {/* Faculty Selection Container */}
                <div className="col-span-1">
                    <h2 className="font-semibold text-unilectives-search">Faculty</h2>
                    <div className="p-2 bg-gray-50 rounded-l-lg border border-unilectives-search h-full overflow-y-auto">
                        <div className="w-full">
                            <ul className="list-none text-center">
                                {faculties.map((faculty) => (
                                    <li key={faculty.name}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="faculty"
                                                className="sr-only"
                                                value={faculty.name}
                                                checked={selectedFaculty && selectedFaculty.name === faculty.name}
                                                onChange={handleFacultyChange}
                                            />
                                            <span
                                                className={`text-sm ${selectedFaculty && selectedFaculty.name === faculty.name
                                                    ? "text-unilectives-search"
                                                    : "text-black"
                                                    } text-center cursor-pointer`}
                                            >
                                                {selectedFaculty && selectedFaculty.name === faculty.name
                                                    ? `Selected ${faculty.name}`
                                                    : faculty.name
                                                }
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
                                                    className="mr-4 form-checkbox border-unilectives-search"
                                                    checked={selectedFaculty.every(
                                                        (school) => school.checked
                                                    )}
                                                    onChange={handleSelectAllSchools}
                                                />
                                                <span className="text-sm text-black">Select All</span>
                                            </label>
                                        </li>
                                        {/* Individual School Checkboxes */}
                                        {selectedFaculty.map((school: string, index: number) => (
                                            <li key={school.name}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="mr-4 form-checkbox border-unilectives-search"
                                                        checked={school.checked}
                                                        onChange={(event) =>
                                                            handleSchoolChange(event, index)
                                                        }
                                                    />
                                                    <span className="text-sm text-black">
                                                        {school.name}
                                                    </span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex justify-center items-center h-full flex-grow">
                                        <p className="text-gray-500">
                                            No schools found for the selected faculty
                                        </p>
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
            {/* Checkbox */}
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
                                        className="mr-4" f
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
            {/* Control Button */}
            <div className="flex flex-wrap justify-between items-center">
                <button className="text-black-900 font-bold text-base focus:outline-none" onClick={handleClearSelection}>
                    Clear Filters
                </button>
                <button className="px-4 py-2 bg-unilectives-button text-white text-base rounded-md ml-2 focus:outline-none border-round font-semibold" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </>
    );
}