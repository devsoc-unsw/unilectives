"use client"

import React, { useState } from 'react';
import { Report, Review } from "@/types/api";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Dropdown from "@/components/Dropdown/Dropdown";
import ReportCard from "@/components/ReportCard/ReportCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import BinarySwitch from "@/components/BinarySwitch/BinarySwitch";

type AdminContentProps = {
  reports: Report[];
  reviews: Review[];
}

export default function AdminContent({
  reports,
  reviews,
}: AdminContentProps) {
  const [object, setObject] = useState<'report' | 'review'>('report');
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
  const [reportPage, setReportPage] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const elementsPerPage = 6;
  const pagesPerPage = 5;

  return (
    <div className="flex flex-col gap-6">
      {/* Reviews or Reports Tab */}
      <div className="flex flex-row w-full h-9 gap-8 border-b border-slate-300">
        <button
          className={object === 'report' ? "font-bold text-unilectives-purple border-b-2 border-unilectives-purple" : ""}
          onClick={() => setObject('report')}>
          Reports
        </button>
        <button
          className={object === 'review' ? "font-bold text-unilectives-purple border-b-2 border-unilectives-purple" : ""}
          onClick={() => setObject('review')}>
          Reviews
        </button>
      </div>
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
      {/* Card Grid */}
      <div className={gridView ? "grid grid-rows-2 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-6 w-full items-center" : "flex flex-col rounded-md justify-center gap-2"}>
        {object === 'report' ? (reports ? (
          reports
            .sort((a, b) => compare(a, b))
            .slice(reportPage * elementsPerPage, (reportPage + 1) * elementsPerPage)
            .map((r: Report, index: number) => (
              <ReportCard
                key={index}
                report={r}
                gridView={gridView}
              />
            ))
        ) : (
          <span className={`text-sm ${gridView ? "text-left" : "text-center"} text-gray-800`}>
            No reports found
          </span>
        )) : (reviews ? (
          reviews
            .sort((a, b) => compare(a, b))
            .slice(reviewPage * elementsPerPage, (reviewPage + 1) * elementsPerPage)
            .map((r: Review, index: number) => (
              <ReviewCard
                key={index}
                review={r}
              />
            ))
        ) : (
          <span className={`text-sm ${gridView ? "text-left" : "text-center"} text-gray-800`}>
            No reviews found
          </span>
        ))}
      </div>
      {/* Pagination UI */}
      <div className="flex flex-row gap-4 justify-center h-full items-center">
        <ChevronLeftIcon
          onClick={() => object === 'report' ? setReportPage(reportPage > 0 ? reportPage - 1 : reportPage) : setReviewPage(reviewPage > 0 ? reviewPage - 1 : reviewPage)}
          className="w-5 h-5 hover:scale-125 hover:text-black rounded-full"
        />
        {object === 'report' ? (
          Array.from({ length: Math.ceil(reports?.length / elementsPerPage) }, (_, i) => i + 1).slice(Math.floor(reportPage / pagesPerPage) * pagesPerPage - (Math.floor(reportPage / pagesPerPage) > 0 ? 1 : 0), Math.floor(reportPage / pagesPerPage) * pagesPerPage + pagesPerPage + 1).map((n, index) => (
            <button key={index} onClick={() => setReportPage(n - 1)}>
              <span className={`inline-flex w-5 h-5 p-3 rounded-full items-center justify-center ${(reportPage + 1) === n ? "bg-unilectives-purple text-white" : "text-slate-500 hover:bg-slate-200"}`}>
                {n}
              </span>
            </button>
          ))
        ) : (
          Array.from({ length: Math.ceil(reviews?.length / elementsPerPage) }, (_, i) => i + 1)
          .slice(Math.floor(reviewPage / pagesPerPage) * pagesPerPage - (Math.floor(reviewPage / pagesPerPage) > 0 ? 1 : 0), Math.floor(reviewPage / pagesPerPage) * pagesPerPage + pagesPerPage + 1).map((n, index) => (
            <button key={index} onClick={() => setReviewPage(n - 1)}>
              <span className={`inline-flex w-5 h-5 p-3 rounded-full items-center justify-center ${(reviewPage + 1) === n ? "bg-unilectives-purple text-white" : "text-slate-500 hover:bg-slate-200"}`}>
                {n}
              </span>
            </button>
          ))
        )}
        <ChevronRightIcon
          onClick={() => object === 'report' ? (setReportPage(reportPage < Math.ceil(reports.length / elementsPerPage) - 1 ? reportPage + 1 : reportPage)) : setReviewPage(reviewPage < Math.ceil(reviews.length / elementsPerPage) - 1 ? reviewPage + 1 : reviewPage)}
          className="w-5 h-5 hover:scale-125 hover:text-black rounded-full"
        />
      </div>
    </div>
  );
}