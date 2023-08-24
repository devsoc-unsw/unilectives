"use client"

import React, { useState } from 'react';
import { Report, Review } from "@/types/api";
import Dropdown from "@/components/Dropdown/Dropdown";
import ReportCard from "@/components/ReportCard/ReportCard";
import BinarySwitch from "@/components/BinarySwitch/BinarySwitch";
import Pagination from '../Pagination/Pagination';

type AdminContentProps = {
  reports: Report[];
  reviews: Review[];
}

export default function AdminContent({
  reports,
  reviews,
}: AdminContentProps) {
  const [gridView, setGridView] = useState(false);
  
  const [sort, setSort] = useState("Newest");
  const sortOptions = ["Oldest", "Newest"];
  function compare(a: Report | Review, b: Report | Review) {
    if (sort === sortOptions[0]) {
      return new Date(a.createdTimestamp).getTime() - new Date(b.createdTimestamp).getTime();
    } else if (sort === sortOptions[1]) {
      return new Date(b.createdTimestamp).getTime() - new Date(a.createdTimestamp).getTime();
    } else {
      return 0;
    }
  }

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <hr className="bg-black/25" />
      {/* Sort and View Options */}
      <div className="flex flex-row items-center justify-between w-full xs:flex-col xs:gap-3">
        <div className="w-1/5 lg:w-1/3 md:w-1/3 sm:w-3/5 xs:w-full">
          <Dropdown
            options={sortOptions}
            onChange={(selected) => setSort(selected)}
            placeholder="Sort By: Newest"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <span>Grid</span>
          <BinarySwitch
            defaultValue={true}
            onChange={() => setGridView(!gridView)}
            accessibleLeftTitle="Grid"
            accessibleRightTitle="List"
          />
          <span>List</span>
        </div>
      </div>
      {/* Reports */}
      <div className={gridView ? "grid grid-rows-2 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-6 w-full items-center" : "flex flex-col rounded-md justify-center gap-2"}>
        {reports ? (
          reports
            .sort((a, b) => compare(a, b))
            .map((r: Report, index: number) => (
              <ReportCard
                key={index}
                report={r}
                review={reviews.find(review => review.reviewId === r.reviewId)!}
                gridView={gridView}
              />
            ))
        ) : (
          <span className={`text-sm ${gridView ? "text-left" : "text-center"} text-gray-800`}>
            No reports found
          </span>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={reports.length}
        itemPerPage={itemsPerPage}
        onPageChange={(page: number) => setPage(page)}
      />
    </div>
  );
}