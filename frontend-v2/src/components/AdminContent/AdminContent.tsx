"use client"

import React, { useState } from 'react';
import { Report, Review } from "@/types/api";
import Dropdown from "@/components/Dropdown/Dropdown";
import ReportCard from "@/components/ReportCard/ReportCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import BinarySwitch from "@/components/BinarySwitch/BinarySwitch";
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/solid';

type AdminContentProps = {
	reviews: Review[];
	reports: Report[];
}

export default function AdminContent({
	reviews,
	reports
}: AdminContentProps) {
	const [object, setObject] = useState<'rev' | 'rep'>('rev');
	const [gridView, setGridView] = useState(false);
	const [sort, setSort] = useState('');

	return (
		<div className="flex flex-col gap-6">
			{/* Reviews and Reports Tab */}
			<div className="flex flex-row w-full h-9 gap-8 border-b border-slate-300">
				<button
					className={object === 'rev' ? "font-bold text-unilectives-purple border-b-2 border-unilectives-purple" : ""}
					onClick={() => setObject('rev')}>
						Reviews
				</button>
				<button 
					className={object === 'rep' ? "font-bold text-unilectives-purple border-b-2 border-unilectives-purple" : ""}
					onClick={() => setObject('rep')}>
						Reports
				</button>
			</div>
			{/* Sort and View Options */}
			<div className="flex flex-row items-center justify-between w-full">
				<div className="w-1/6 z-50">
					<Dropdown
						options={[]}
						onChange={(selected) => setSort(selected)}
						placeholder="Sort By"
					/>
				</div>
				<div className="flex flex-row items-center gap-2">
					<p>Grid</p>
					<BinarySwitch
						defaultValue={true}
						onChange={() => setGridView(!gridView)}
						accessibleLeftTitle="Grid"
						accessibleRightTitle="List"
					/>
					<p>List</p>
				</div>
			</div>
			{/* Card Grid */}
			<div className={gridView ? "grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 w-full items-center" : "flex flex-col gap-3 rounded-md shadow-review-card justify-center"}>
				{object === 'rep' ? (reports ? (
					reports.map((r: Report, index: number) => (
						<p>d</p>
						// <ReportCard
						// 	reportId={r.reportId}
						// 	review={r.review}
						// 	zid={r.zid}
						// 	status={r.status}
						// 	reason={r.reason}
						// 	createdTimestamp={r.createdTimeStamp}
						// 	updatedTimestamp={r.updatedTimeStamp}
						// 	view={view}
						// />
					))
				) : (
					<p className={`text-sm ${gridView ? "text-left" : "text-center"} text-gray-800`}>
						No reports found
					</p>
				)) : (reviews ? (
					reviews.map((r: Review, index: number) => (
						<ReviewCard
							review={r}
						/>
					))
				) : (
					<p className={`text-sm ${gridView ? "text-left" : "text-center"} text-gray-800`}>
						No reviews found
					</p>
				))}
			</div>
		</div>
    );
}