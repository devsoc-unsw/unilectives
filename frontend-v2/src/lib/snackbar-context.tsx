"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment, createContext, useState } from "react";

export const AlertContext = createContext<{
  alert: string;
  setAlert: (str: string) => void;
}>({
  alert: "",
  setAlert: (str: string) => {},
});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<string>("");

  const closeModal = () => {
    setAlert("");
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      <Transition appear show={alert !== ""} as={Fragment}>
        <div className="fixed left-6 bottom-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="shadow-xl rounded-lg bg-red-500 text-white font-bold flex items-center gap-4 p-4">
              <span>{alert}</span>
              <XMarkIcon
                className="w-4 h-4 cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </AlertContext.Provider>
  );
}
