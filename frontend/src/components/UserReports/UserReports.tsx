"use client";

import { Reports, Report, TabsType } from "@/types/api";
import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Dropdown from "../Dropdown/Dropdown";
import Pagination from "../Pagination/Pagination";
import ReviewCard from "../ReviewCard/ReviewCard";

type STATUS = {
  UNSEEN: boolean;
  SEEN: boolean;
  REMOVED: boolean;
  SETTLED: boolean;
};

export default function UserReports({
  reports,
  setTabs,
}: Reports & {
  setTabs: Dispatch<SetStateAction<TabsType>>;
}) {
  const [currentStatus, setCurrentStatus] = useState<STATUS>({
    UNSEEN: true,
    SEEN: true,
    REMOVED: true,
    SETTLED: true,
  });
  const [selected, setSelected] = useState("Most Recent");
  const [page, setPage] = useState(1);
  const itemPerPage = 9;

  // Change review filter based on checkboxes and dropdown
  useEffect(() => {
    let sortedReports = [...reports];
    // Filter reports based on category
    const currentReportFilters = Object.entries(currentStatus)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);
    sortedReports = sortedReports.filter((r: Report) =>
      currentReportFilters.includes(r.status)
    );
    // Sort reports
    switch (selected) {
      case "Least Recent":
        sortedReports.sort(
          (r1: Report, r2: Report) =>
            Date.parse(r1.createdTimestamp) - Date.parse(r2.createdTimestamp)
        );
        break;
      default:
        sortedReports.sort(
          (r1: Report, r2: Report) =>
            Date.parse(r2.createdTimestamp) - Date.parse(r1.createdTimestamp)
        );
        break;
    }
    setTabs((prev: TabsType) => {
      const newTab = { ...prev };
      newTab["My reports"].data = sortedReports;
      return newTab;
    });
  }, [currentStatus, selected, reports]);

  // Handle checkbox on change
  const handleOnChange = useCallback(
    (target: HTMLInputElement, status: keyof STATUS) => {
      setCurrentStatus((prev: STATUS) => {
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
    <div className='space-y-5'>
      <div className='flex flex-wrap gap-4 items-center justify-between'>
        {/* Categorize reports */}
        <form name='status-checkbox' className='flex flex-wrap gap-4'>
          {Object.keys(currentStatus).map((status: string) => (
            <div key={status} className='space-x-2'>
              <input
                type='checkbox'
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
                className='cursor-pointer'
                htmlFor={`status-checkbox-${status.toLowerCase()}`}
              >
                {status}
              </label>
            </div>
          ))}
        </form>
        {/* Filter report */}
        <div className='[&>*]:z-10'>
          <Dropdown
            options={["Most Recent", "Least Recent"]}
            placeholder='Sort by'
            defaultValue={selected}
            onChange={setSelected}
          />
        </div>
      </div>
      {/* Reports */}
      <div className='grid grid-cols-3 lg:grid-cols-1 gap-12'>
        {reports
          .slice((page - 1) * itemPerPage, page * itemPerPage)
          .map((report: Report, index: number) => (
            <div
              key={index}
              className='box-border isolate px-6 py-7 bg-unilectives-card dark:bg-slate-700 shadow-lg shadow-gray-600 rounded-xl space-y-4'
            >
              {/* Course courseCode + Ratings */}
              <div className='flex gap-2 text-xl'>
                <span className={`${statusTextColor(report.status)}`}>●</span>
                <h2 className='font-bold break-all'>
                  Report{" "}
                  <span className='text-black/50 dark:text-white/50'>
                    #{report.reportId}
                  </span>
                </h2>
              </div>
              {/* Description */}
              <p className='text-unilectives-headings dark:text-gray-100 break-all line-clamp-3 h-[4.5rem]'>
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
      {reports.length > 0 ? (
        <Pagination
          totalItems={reports.length}
          itemPerPage={itemPerPage}
          onPageChange={(page: number) => setPage(page)}
        />
      ) : (
        <div className="text-center">No reports made yet.</div>
      )}
    </div>
  );
}
