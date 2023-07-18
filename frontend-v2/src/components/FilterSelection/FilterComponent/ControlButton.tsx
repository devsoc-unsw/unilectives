"use client";

import { useState } from 'react';

export default function ControlButton() {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleSearch = () => {
        console.log('Performing search...');
        console.log('Selected types:', selectedTypes);
    };

    const handleClearSelection = () => {
        setSelectedTypes([]);
    };
    return (
        <div className="flex flex-wrap justify-between items-center">
            <button className="text-black-900 font-bold text-base focus:outline-none" onClick={handleClearSelection}>
                Clear Filters
            </button>
            <button className="px-4 py-2 bg-unilectives-button text-white text-base rounded-md ml-2 focus:outline-none border-round font-semibold" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

