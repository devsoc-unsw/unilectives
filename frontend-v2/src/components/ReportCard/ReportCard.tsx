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
				<div className="flex flex-col px-10 py-5 space-y-2 shadow-review-card rounded-md bg-white isolate gap-4 md:px-5">
					<div className="flex flex-col gap-4">
						{/* ReportID */}
						<p className="font-bold md:text-sm md:overflow-hidden md:overflow-ellipsis md:whitespace-nowrap">Report #{reportId}</p>
						{/* zID and Created Timestamp */}
						<div className="flex flex-row w-full items-center gap-2 text-slate-600 xs:flex-col">
							<UserCircleIcon className="h-5 w-5" />
							<p className="md:text-xs md:overflow-hidden md:overflow-ellipsis md:whitespace-nowrap">{zid}</p>
							<ClockIcon className="h-5 w-5"/>
							<p className="md:text-xs md:overflow-hidden md:overflow-ellipsis md:whitespace-nowrap">{`${createdTimestamp}`}</p>
						</div>
						{/* Reason */}
						<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{reason}</p>
					</div>
					{/* Status and Delete Option */}
					<div className="flex flex-row justify-between items-center xs:flex-col md:gap-2">
						<div className="w-2/3 lg:w-1/3 xs:w-full md:text-sm">
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
			<div className="flex flex-row justify-between items-center p-5 md:flex-col">
				<p className="font-bold">Report #{reportId}</p>
				<div className="flex flex-row gap-4 sm:gap-2 md:gap-2 items-center sm:flex-col md:mt-2">
					<div className="md:text-sm md:w-full">
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