"use client";

import { UserCircleIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Report } from "@/types/api";
import { format } from "date-fns";
import TruncatedDescription from "@/components/TruncatedDescription/TruncatedDescription";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function ReviewCard({ report, gridView }: { report: Report, gridView: boolean }) {
	const setState = (chosenState: string) => {
		// To-do: use api route to set state
		console.log(chosenState);
	};
	const deleteReport = () => {
		// To-do: use api route to set state
	};

	return (
		<div className={`flex ${gridView ? "flex-col p-8" : "flex-row items-center justify-between p-2"} gap-4 space-y-2 shadow-review-card rounded-lg bg-white`}>
			{/* Title */}
			<h1>● Report #{report.reportId}</h1>
			{!gridView && 
			<div className="flex flex-row gap-4">
			{/* Status */}
			<div className="z-50">
				<Dropdown
					options={["Unseen", "Seen", "Removed", "Settled"]}
					defaultValue={"Unseen"}
					onChange={(selected) => setState(selected)}
					placeholder={"Unseen"}
				/>
			</div>
			{/* Delete */}
			<button onClick={() => deleteReport} className="rounded-lg hover:bg-red-100">
				<TrashIcon className="w-7 h-7 p-1"/>
			</button>
			</div>}
			{/* Author + Timestamp */}
			{ gridView && 
			<div className="flex items-center flex-wrap justify-between">
				<div className="flex flex-row gap-1">
					<UserCircleIcon className="text-slate-400 w-6 h-6"/>
					<span className="text-slate-400">{report.zid}</span>
				</div>
				<div className="flex flex-row gap-1">
					<ClockIcon className="text-slate-400 w-6 h-6"/>
					<span className="text-slate-400">{format(new Date(report.createdTimestamp), "dd/MM/yyyy")}</span>
				</div>
			</div>}
			{/* Description */}
			{ gridView && 
			<TruncatedDescription content={report.reason} maxCharacters={500} />}
			{/* Actions */}
			{gridView && 
			<div className="flex justify-between">
				{/* Status */}
				<div className="w-1/3 z-50">
					<Dropdown
						options={["Unseen", "Seen", "Removed", "Settled"]}
						defaultValue={"Unseen"}
						onChange={(selected) => setState(selected)}
						placeholder={"Unseen"}
					/>
				</div>
				{/* Delete */}
				<button onClick={() => deleteReport} className="rounded-lg hover:bg-red-100">
					<TrashIcon className="w-7 h-7 p-1"/>
				</button>
			</div>}
		</div>
	);
}