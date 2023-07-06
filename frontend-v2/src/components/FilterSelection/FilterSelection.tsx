"use client";

import { useState } from "react";

export default function FilterSelection({ onClose }: { onClose: () => void }) {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes((prevSelectedTypes) => {
            if (prevSelectedTypes.includes(type)) {
                return prevSelectedTypes.filter((t) => t !== type);
            } else {
                return [...prevSelectedTypes, type];
            }
        });
    };

    const handleCheckboxToggle = (type: string) => {
        setSelectedTypes((prevSelectedTypes) => {
            if (prevSelectedTypes.includes(type)) {
                return prevSelectedTypes.filter((t) => t !== type);
            } else {
                return [...prevSelectedTypes, type];
            }
        });
    };

    const handleSearch = () => {
        // Perform search based on selected filters
        console.log("Performing search...");
        console.log("Selected types:", selectedTypes);
    };

    const handleClearSelection = () => {
        setSelectedTypes([]);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-4 max-w-xl shadow-lg border-2 border-unilectives-search border-rounded">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-unilectives-search">Study Level</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-wrap gap-1">
                    <div
                        className={`px-4 py-2 rounded-full border-r-0 cursor-pointer ${selectedTypes.includes("Undergraduate")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => handleTypeToggle("Undergraduate")}
                    >
                        Undergraduate
                    </div>
                    <div
                        className={`px-4 py-2 border-l-0 border-r-0 cursor-pointer ${selectedTypes.includes("Postgraduate")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => handleTypeToggle("Postgraduate")}
                    >
                        Postgraduate
                    </div>
                    <div
                        className={`px-4 py-2 rounded-full border-l-0 cursor-pointer ${selectedTypes.includes("Research")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => handleTypeToggle("Research")}
                    >
                        Research
                    </div>
                </div>


                <div className="mt-6">
                    <h2 className="text-lg font-medium text-unilectives-search">General Education</h2>
                    <div className="flex flex-wrap gap-2">
                        <div
                            className={`px-4 py-2 rounded-full cursor-pointer ${selectedTypes.includes("Yes")
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                            onClick={() => handleTypeToggle("Yes")}
                        >
                            Yes
                        </div>
                        <div
                            className={`px-4 py-2 rounded-full cursor-pointer ${selectedTypes.includes("No")
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                            onClick={() => handleTypeToggle("No")}
                        >
                            No
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-medium text-unilectives-search">Term Offering</h2>
                    <div className="flex flex-wrap gap-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-unilectives-search"
                                checked={selectedTypes.includes("TermOffering1")}
                                onChange={() => handleCheckboxToggle("TermOffering1")}
                            />
                            <span className="ml-2">Term 1</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-unilectives-search"
                                checked={selectedTypes.includes("TermOffering2")}
                                onChange={() => handleCheckboxToggle("TermOffering2")}
                            />
                            <span className="ml-2">Term 2</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-unilectives-search"
                                checked={selectedTypes.includes("TermOffering3")}
                                onChange={() => handleCheckboxToggle("TermOffering3")}
                            />
                            <span className="ml-2">Term 3</span>
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div>
                        <button
                            className="text-black-900 font-bold focus:outline-none"
                            onClick={handleClearSelection}
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div>
                        <button
                            className="px-4 py-1 bg-unilectives-button text-white rounded-md ml-2 focus:outline-none border-round"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

