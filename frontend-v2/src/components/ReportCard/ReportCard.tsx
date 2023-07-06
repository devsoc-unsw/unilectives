import { ReportStatus, Review } from "@/types/api";
import { UserCircleIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Dropdown from "../Dropdown/Dropdown";

type ReportCardProps = {
	reportId: string;
	review: Review;
	zid: string;
	status: ReportStatus;
	reason: string;
	createdTimestamp: Date;
	updatedTimestamp: Date;
	view: 'grid' | 'list'
}

export default function ReportCard({
	reportId,
	review,
	zid,
	status,
	reason,
	createdTimestamp,
	updatedTimestamp,
	view
}: ReportCardProps) {
    return view === 'grid' ? (
				<div className="flex flex-col px-10 py-5 space-y-2 shadow-review-card rounded-md bg-white isolate gap-4">
					<div className="flex flex-col gap-4">
						{/* ReportID */}
						<p className="font-bold">Report #{reportId}</p>
						{/* zID and Created Timestamp */}
						<div className="flex flex-row w-full gap-2 text-slate-600">
							<UserCircleIcon className="h-6 w-6" />
							<p>{zid}</p>
							<ClockIcon className="h-6 w-6"/>
							<p>{`${createdTimestamp}`}</p>
						</div>
						{/* Reason */}
						<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{reason}</p>
					</div>
					{/* Status and Delete Option */}
					<div className="flex flex-row justify-between items-center">
						<div className="w-1/3">
							<Dropdown
								options={["UNSEEN", "SEEN", "REMOVED", "SETTLED"]}
								defaultValue={"UNSEEN"}
								onChange={(selected: string) => void {}}
								placeholder={"UNSEEN"}
							/>
						</div>
						<button className="h-7 w-7 p-1 rounded-lg hover:bg-red-100">
							<TrashIcon className="" />
						</button>
					</div>
        </div>
    ) : (
			<div className="flex flex-row justify-between items-center p-5">
				<p className="font-bold">Report #{reportId}</p>
				<div className="flex flex-row gap-4 items-center">
					<div className="">
						<Dropdown
							options={["UNSEEN", "SEEN", "REMOVED", "SETTLED"]}
							defaultValue={"UNSEEN"}
							onChange={(selected: string) => void {}}
							placeholder={"UNSEEN"}
						/>
					</div>
					<button className="h-7 w-7 p-1 rounded-lg hover:bg-red-100">
						<TrashIcon className="" />
					</button>
				</div>
			</div>
		)
}