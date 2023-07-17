"use client"

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FlagIcon, UserCircleIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Dropdown from "@/components/Dropdown/Dropdown";
import CollapseMenu from "@/components/CollapseMenu/CollapseMenu";
import { Report } from  "@/types/api";
import { format } from "date-fns";

export default function ReportCard({ report, gridView }: { report: Report, gridView: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

	function setReportStatus(status: string) {
		console.log(status);
	}
	function deleteReport() {

	}

  return (
    <>
      {/* Modal */}
      <div className="isolate flex justify-center ">
        {/* Report button */}
        <button
          onClick={() => setIsOpen(true)}
          className="hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer"
        >
          <FlagIcon className="w-5 h-5" />
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-8 py-6 space-y-4 isolate">
                    {/* Modal title*/}
										<Dialog.Title as="h1" className="text-2xl font-bold">
											Report #{report.reportId}
										</Dialog.Title>
										<hr className="border-black/25" />
										{/* Modal Content */}
										<div className="flex flex-col gap-6">
											{/* Timeframe */}
											<div className="flex flex-row justify-between w-full items-center">
												<div className="flex flex-row gap-1 text-slate-500">
													<ClockIcon className="w-6 h-6"/>
													<span>Created</span>
												</div>
												<span>{`${format(new Date(report.createdTimestamp), 'MM/dd/yyyy hh:mm a')}`}</span>
											</div>
											{/* Submitted */}
											<div className="flex flex-row justify-between w-full items-center">
												<div className="flex flex-row gap-1 text-slate-500">
													<UserCircleIcon className="w-6 h-6"/>
													<span>Submitted</span>
												</div>
												<span>{report.zid}</span>
											</div>
											{/* Status */}
											<div className="flex flex-row justify-between w-full items-center">
												<div className="flex flex-row gap-1 text-slate-500">
													<CheckCircleIcon className="w-6 h-6"/>
													<span>Status</span>
												</div>
												<Dropdown
													options={["Unseen", "Seen", "Removed", "Settled"]}
													defaultValue={"Unseen"}
													onChange={(selected) => setReportStatus(selected)}
													placeholder={"Unseen"}
												/>
											</div>
											<CollapseMenu
												preview={"Reason"}
												content={report.reason}
											/>
											<CollapseMenu
												preview={"Review"}
												content={report.review.description}
											/>
										</div>
										<div className="flex flex-row justify-between">
											<button 
											onClick={() => setIsOpen(false)}
											className="bg-slate-400 text-white font-semibold py-2 px-4 rounded-md">
												Cancel
											</button>
											<button
											onClick={() => deleteReport}
											className="bg-unilectives-button text-white font-semibold py-2 px-4 rounded-md"
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
      </div>
    </>
  );
}