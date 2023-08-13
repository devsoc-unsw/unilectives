"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment, createContext, useEffect, useState } from "react";

type AlertType = {
  message: string;
  type: "Success" | "Alert";
};

export const AlertContext = createContext<{
  alert: AlertType;
  setAlert: (alert: AlertType) => void;
}>({
  alert: {
    message: "",
    type: "Alert",
  },
  setAlert: () => {},
});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    type: "Alert",
  });

  const closeModal = () => {
    setAlert({
      message: "",
      type: "Alert",
    });
  };

  useEffect(() => {
    if (alert.message === "") return;
    const timeout = setTimeout(closeModal, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      <Transition appear show={alert.message !== ""} as={Fragment}>
        <div className="fixed ml-[80px] left-6 bottom-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${
                alert.type === "Alert" ? "bg-red-500" : "bg-green-500"
              } shadow-xl rounded-lg text-white font-bold flex items-center gap-4 p-4`}
            >
              <span>{alert.message}</span>
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
