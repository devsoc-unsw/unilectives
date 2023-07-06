import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import AdminSearchBar from "@/components/AdminSearchBar/AdminSearchBar";
import AdminMainInterface from "@/components/AdminMainInterface/AdminMainInterface";
import { Reports, Reviews } from "@/types/api";
import { get } from "@/utils/request";

// Interactive = client-side; un-interactive = server-side
export default async function AdminDashboard() {
	const responseRep = (await get("/reports")) as Reports;
	const responseRev = (await get ("/reviews")) as Reviews;
	const reports = responseRep.reports;
	const reviews = responseRev.reviews;
	return (
		<div className="isolate">
			{/* Sidebar; Server Side; TO-DO: Add links to icon (see: course cards)*/}
			<AdminSidebar />
			{/* Waves */}
			<Image 
					className="absolute -z-10"
					src="navbar.svg"
					width={1000}
					height={100}
					alt="waves"
					layout="responsive"
					priority
				/>
			{/* Dashboard Main Container */}
			<div className="flex flex-col mx-20 p-12 gap-6">
				{/* Search bar; Client Side */}
				<div className="w-1/3 ml-auto md:w-full md:px-8">
					<AdminSearchBar />
				</div>
				{/* Hero Text; Server Side */}
				<p className="font-bold text-2xl">Admin Dashboard</p>
				<p>Welcome to the Admin Dashboard.</p>
				{/* Review and Report Cards */}
				<AdminMainInterface 
					reviews={reviews}
					reports={reports}
				/>
			</div>
		</div>
	);
}