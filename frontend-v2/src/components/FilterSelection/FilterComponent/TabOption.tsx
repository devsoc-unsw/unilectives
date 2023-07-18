"use client";

import { Tab } from '@headlessui/react';
import { useState } from 'react';

export default function TabOption() {
    const [selectedLevel, setSelectedLevel] = useState('Undergraduate');
    const [selectedGeneralEducation, setSelectedGeneralEducation] = useState('Yes');

    const handleLevelSelect = (level) => {
        setSelectedLevel(level);
    };

    const handleGeneralEducationSelect = (option) => {
        setSelectedGeneralEducation(option);
    };

    return (
        <div className="w-full space-y-4 text-unilectives-search">
            <Tab.Group>
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="font-semibold flex-shrink-0">Study Level</div>
                    <Tab.List className="flex justify-center flex-grow">
                        <Tab
                            className={({ selected }) =>
                                `flex items-center justify-center w-5/6 rounded-l-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? 'bg-gray-200 text-black' : ''
                                }`
                            }
                            onClick={() => handleLevelSelect('Undergraduate')}
                            selected={selectedLevel === 'Undergraduate'}
                        >
                            Undergraduate
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex items-center justify-center w-5/6 py-1 px-6 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? 'bg-gray-200 text-black' : ''
                                }`
                            }
                            onClick={() => handleLevelSelect('Postgraduate')}
                            selected={selectedLevel === 'Postgraduate'}
                        >
                            Postgraduate
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex items-center justify-center w-5/6 rounded-r-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? 'bg-gray-200 text-black' : ''
                                }`
                            }
                            onClick={() => handleLevelSelect('Research')}
                            selected={selectedLevel === 'Research'}
                        >
                            Research
                        </Tab>
                    </Tab.List>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="font-semibold flex-shrink-0">General Education</div>
                    <Tab.List className="flex justify-center flex-grow">
                        <Tab
                            className={({ selected }) =>
                                `flex items-center justify-center w-2/5 rounded-l-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? 'bg-gray-200 text-black' : ''
                                }`
                            }
                            onClick={() => handleGeneralEducationSelect('Yes')}
                            selected={selectedGeneralEducation === 'Yes'}
                        >
                            Yes
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex items-center justify-center w-2/5 rounded-r-full py-1 px-4 text-sm font-medium leading-5 text-black focus:outline-none hover:bg-gray-200 hover:text-black border border-unilectives-search ${selected ? 'bg-gray-200 text-black' : ''
                                }`
                            }
                            onClick={() => handleGeneralEducationSelect('No')}
                            selected={selectedGeneralEducation === 'No'}
                        >
                            No
                        </Tab>
                    </Tab.List>
                </div>
            </Tab.Group>
        </div>
    );
}
