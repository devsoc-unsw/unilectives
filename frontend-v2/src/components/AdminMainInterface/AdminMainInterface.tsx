"use client"

import React, { useState } from 'react';
import { Report, Review } from "@/types/api";
import ReportCard from '../ReportCard/ReportCard';
import ReviewCard from '../ReviewCard/ReviewCard';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/solid';

type AdminMainInterfaceProps = {
	reviews: Review[];
	reports: Report[];
}

export default function AdminMainInterface({
	reviews,
	reports
}: AdminMainInterfaceProps) {
	const [selectObject, setSelectObject] = useState('rev');
	const [selectView, setSelectView] = useState<'grid' | 'list'>('grid');

	return (
		<div className="flex flex-col gap-6">
			{/* Reviews and Reports Tab */}
			<div className="flex flex-row w-full h-9 gap-4 border-b border-slate-400">
				<button
					className={selectObject === 'rev' ? "font-bold border-b border-black" : ""}
					onClick={() => setSelectObject('rev')}>
						Reviews
				</button>
				<button 
					className={selectObject === 'rep' ? "font-bold border-b border-black" : ""}
					onClick={() => setSelectObject('rep')}>
						Reports
				</button>
			</div>
			{/* Sort and View Options */}
			<div className="flex flex-row justify-between w-full">
				<button
					className=""
				>
					Sort: A-Z
				</button>
				<div className="flex flex-row">
					<button
						className={`w-8 h-8 p-1 rounded-md ${selectView === 'grid' ? 'bg-gray-300' : 'scale-110'}`}
						onClick={() => setSelectView('grid')}
					>
						<Squares2X2Icon className="w-6 h-6" />
					</button>
					<button
						className={`w-8 h-8 p-1 rounded-md ${selectView === 'list' ? 'bg-gray-300' : 'hover:scale-110'}`}
						onClick={() => setSelectView('list')}
					>
						<ListBulletIcon className="w-6 h-6" />
					</button>
				</div>
			</div>
			{/* Card Grid */}
			<div className={selectView === 'grid' ? "grid grid-rows-3 grid-cols-3 lg:grid-rows-1 lg:grid-cols-1 gap-12 w-full items-center" : "flex flex-col gap-3 rounded-md shadow-review-card justify-center"}>
				{selectObject === 'rep' ? (reports ? (
					reports.map((r: Report, index: number) => (
						<ReportCard
							reportId={r.reportId}
							review={r.review}
							zid={r.zid}
							status={r.status}
							reason={r.reason}
							createdTimestamp={r.createdTimestamp}
							updatedTimestamp={r.updatedTimestamp}
							view={selectView}
						/>
					))
				) : (
					<p className="text-sm text-center text-gray-800">No courses found</p>
				)) : (reviews ? (
					reviews.map((r: Review, index: number) => (
						<ReviewCard
							review={r}
						/>
					))
				) : (
					<p className="text-sm text-center text-gray-800">No courses found</p>
				))}
			</div>
		</div>
    );
}
