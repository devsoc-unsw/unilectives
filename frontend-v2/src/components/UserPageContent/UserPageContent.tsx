"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Course, Report, Review, Reviews } from "@/types/api";
import UserReviews from "../UserReviews/UserReviews";
import UserReports from "../UserReports/UserReports";
import UserCourses from "../UserCourses/UserCourses";
import Dropdown from "../Dropdown/Dropdown";
import Pagination from "../Pagination/Pagination";

export default function UserPageContent({
  reviews,
  reports,
  bookmarked,
  courses,
}: {
  reviews: Review[];
  reports: Report[];
  bookmarked: Review[];
  courses: Course[];
}) {
  // Refs
  const currentTabRef = useRef("My reviews");
  // States
  const [tabs, setTabs] = useState<{
    [key: string]: { current: boolean; data: Report[] | Review[] | Course[] };
  }>({
    "My reviews": {
      current: true,
      data: reviews as Review[],
    },
    "My reports": {
      current: false,
      data: reports as Report[],
    },
    Bookmarked: {
      current: false,
      data: bookmarked as Review[],
    },
    Courses: {
      current: false,
      data: courses as Course[],
    },
  });

  // Switch tabs function
  const switchTabs = useCallback(
    (key: string) => {
      setTabs((prevTab) => {
        const newTabs = { ...prevTab };
        newTabs[currentTabRef.current].current = false;
        newTabs[key].current = true;
        currentTabRef.current = key;
        return newTabs;
      });
    },
    [tabs]
  );

  return (
    <div className="space-y-5 isolate">
      {/* Tabs */}
      <div className="hidden sm:block [&>*]:z-10">
        <Dropdown
          options={Object.keys(tabs)}
          defaultValue={currentTabRef.current}
          onChange={switchTabs}
        />
      </div>
      <hr className="hidden sm:block"></hr>
      <div className="sm:hidden flex flex-wrap gap-4">
        {Object.keys(tabs).map((key: string) => (
          <button
            key={key}
            className={`${
              tabs[key].current
                ? "bg-unilectives-tags-pink text-black/50 font-bold"
                : "text-black"
            } rounded-lg py-2 duration-150 min-w-[125px] sm:w-full`}
            onClick={() => switchTabs(key)}
          >
            {key}
          </button>
        ))}
      </div>
      {/* My reviews */}
      {tabs["My reviews"].current && (
        <UserReviews reviews={tabs["My reviews"].data as Review[]} />
      )}
      {/* My reports */}
      {tabs["My reports"].current && (
        <UserReports reports={tabs["My reports"].data as Report[]} />
      )}
      {/* Bookmarked */}
      {tabs["Bookmarked"].current && (
        <UserReviews reviews={tabs["Bookmarked"].data as Review[]} />
      )}
      {/* Courses */}
      {tabs["Courses"].current && (
        <UserCourses courses={tabs["Courses"].data as Course[]} />
      )}
    </div>
  );
}
