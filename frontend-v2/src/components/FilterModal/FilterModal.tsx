"use client";

import FilterSelection from "./FilterSelection/FilterSelection";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Course } from "@/types/api";

export default function FilterModal() {
    // Temp
    const courses = []
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    // function to close modal
    const closeModal = () => {
        setIsOpen(false);
    };

    // function to open modal
    const openModal = () => {
        setIsOpen(true);
    };

    const handleCourseChange = (updatedCourses: Course[]) => {
        // Handle the updated courses here
        console.log("Updated Courses: ", updatedCourses);
        setFilteredCourses(updatedCourses);
    };

    return (
        <>
            {/* Modal */}
            <div className="isolate">
                {/* Add Review button */}
                <button onClick={openModal}>
                    <AdjustmentsVerticalIcon className="mt-1 mr-2 w-6 h-6 text-unilectives-search" />
                </button>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {/* Dark background behind modal */}
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-12 py-8 space-y-5 isolate">
                                        {/* Close button */}
                                        <button
                                            onClick={closeModal}
                                            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
                                        >
                                            <XCircleIcon className="w-6 h-6" />
                                        </button>
                                        {/* Modal content */}
                                        <FilterSelection courses={courses} onChange={handleCourseChange} />
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}