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
  const [currentStatus, setSelected] = useState<STATUS>({
    UNSEEN: true,
    SEEN: true,
    REMOVED: true,
    SETTLED: true,
  });

  // Change review filter based on checkboxes
  useMemo(() => {
    const sortedReports = [...reports];
    const currentReportFilters = Object.entries(currentStatus)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);
    setCurrentReports(
      sortedReports
        .filter((r: Report) => currentReportFilters.includes(r.status))
        .sort(
          (r1: Report, r2: Report) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r1.createdTimestamp)
        )
    );
  }, [currentStatus, reports]);

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
    [currentStatus]
  );

  // Color based on statuses
  const statusTextColor = (status: keyof STATUS) => {
    switch (status) {
      case "UNSEEN":
        return "text-blue-500";
      case "SEEN":
        return "text-orange-500";
      case "REMOVED":
        return "text-red-500";
      case "SETTLED":
        return "text-green-500";
    }
  };

  const statusBorderColor = (status: keyof STATUS) => {
    switch (status) {
      case "UNSEEN":
        return "border-blue-500";
      case "SEEN":
        return "border-orange-500";
      case "REMOVED":
        return "border-red-500";
      case "SETTLED":
        return "border-green-500";
    }
  };

  return (
    <div className="space-y-5">
      {/* Filter report */}
      <form name="status-checkbox" className="flex flex-wrap gap-4">
        {Object.keys(currentStatus).map((status: string) => (
          <div key={status} className="space-x-2">
            <input
              type="checkbox"
              value={status}
              checked={currentStatus[status as keyof STATUS]}
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
            <div className="flex gap-2 text-xl">
              <span className={`${statusTextColor(report.status)}`}>●</span>
              <h1 className="font-bold break-all">
                Report <span className="text-black/50">#{report.reportId}</span>
              </h1>
            </div>
            {/* Description */}
            <p className="text-unilectives-headings break-all line-clamp-3 h-[4.5rem]">
              {report.reason}
            </p>
            {/* Icons */}
            <span
              className={`py-1 px-4 rounded-full font-bold ${statusTextColor(
                report.status
              )} border ${statusBorderColor(report.status)}`}
            >
              {report.status}
            </span>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div></div>
    </div>
  );
}
