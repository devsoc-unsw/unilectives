"use client";

import { Reports, Report } from "@/types/api";
import { useMemo, useState, useCallback } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type STATUS = {
  UNSEEN: boolean;
  SEEN: boolean;
  REMOVED: boolean;
  SETTLED: boolean;
};

export default function UserReports({ reports }: Reports) {
  const [currentReports, setCurrentReports] = useState(reports);
  const [selected, setSelected] = useState<STATUS>({
    UNSEEN: false,
    SEEN: false,
    REMOVED: false,
    SETTLED: false,
  });

  // Change review sorting based on dropdown
  useMemo(() => {
    const sortedReports = [...reports];
    sortedReports.filter((r: Report) =>
      Object.entries(selected)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .includes(r.status)
    );
    console.log(selected);
    setCurrentReports(
      sortedReports.sort(
        (r1: Report, r2: Report) =>
          Date.parse(r2.createdTimestamp) - Date.parse(r1.createdTimestamp)
      )
    );
  }, [selected, reports]);

  // Handle checkbox on change
  const handleOnChange = useCallback(
    (target: HTMLInputElement, status: keyof STATUS) => {
      setSelected((prev: STATUS) => {
        const newStatus = { ...prev };
        if (target.checked) {
          newStatus[status] = true;
        } else {
          newStatus[status] = false;
        }
        return newStatus;
      });
    },
    [selected]
  );

  return (
    <div className="space-y-5">
      {/* Filter report */}
      <form name="status-checkbox" className="flex flex-wrap gap-4">
        {["Unseen", "Seen", "Removed", "Settled"].map((status: string) => (
          <div key={status} className="space-x-2">
            <input
              type="checkbox"
              value={status}
              id={`status-checkbox-${status.toLowerCase()}`}
              onChange={(event) =>
                handleOnChange(
                  event.target,
                  status.toUpperCase() as keyof STATUS
                )
              }
            />
            <label
              className="cursor-pointer"
              htmlFor={`status-checkbox-${status.toLowerCase()}`}
            >
              {status}
            </label>
          </div>
        ))}
      </form>
      {/* Reports */}
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-12">
        {currentReports.map((report: Report) => (
          <div className="box-border isolate px-6 py-7 bg-unilectives-card shadow-lg rounded-xl space-y-4">
            {/* Course courseCode + Ratings */}
            <div className="flex flex-wrap justify-between text-2xl">
              <h1 className="font-bold block truncate">
                {/* TODO: Change when prisma migration is done */}
                {report.review.courseCode}
              </h1>
            </div>
            {/* Description */}
            <p className="text-unilectives-headings break-all line-clamp-3 h-[4.5rem]">
              {report.reason}
            </p>
            {/* Icons */}
            <div className="flex flex-wrap ml-auto gap-5 w-fit">
              <button>
                <PencilSquareIcon className="w-6 h-6 inline-block" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div></div>
    </div>
  );
}
