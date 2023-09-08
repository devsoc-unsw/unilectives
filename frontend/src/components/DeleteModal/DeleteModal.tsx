"use client"

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Report } from "@/types/api";

export default function DeleteModal({
  group,
  item,
  onDelete
} : {
  group: string;
  item: Report;
  onDelete: (item: Report) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)} 
        className="hover:text-red-500"
      >
        <TrashIcon className="w-7 h-7 p-1" />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                <Dialog.Panel className="w full max-w-md transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-8 py-6 space-y-4 isolate">
                  <Dialog.Title as="h1" className="text-2xl font-bold">
                    Delete {group.charAt(0).toUpperCase() + group.slice(1)}
                  </Dialog.Title>
                  <hr className="border-black/25"></hr>
                  <h2 className="text-lg">
                    Are you sure you want to delete {group.charAt(0).toUpperCase() + group.slice(1)} #{item.reportId}?
                  </h2>
                  <div className="flex flex-row justify-between">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-slate-400 text-white font-semibold py-2 px-4 rounded-md hover:scale-105">
                      Cancel
                    </button>
                    <button
                      onClick={() => {onDelete(item); setIsOpen(false);}}
                      className="bg-unilectives-button text-white font-semibold py-2 px-4 rounded-md hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}