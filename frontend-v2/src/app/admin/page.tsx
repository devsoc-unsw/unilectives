import Image from "next/image";
import { get } from "@/utils/request";
import { Reviews, Reports } from "@/types/api";
import AdminContent from "@/components/AdminContent/AdminContent";

export default async function () {
	const { reviews } = (await get('/reviews')) as Reviews;
	const { reports } = (await get('/reports')) as Reports;
  console.log("updated");
	return (
		<div>
			<Image
					src="navbar.svg"
					width={1000}
					height={500}
					alt="landing page graphic"
					layout="responsive"
					priority
				/>
			<div className="absolute top-16 flex flex-col w-full p-12 gap-6">
				<p className="font-bold text-3xl">Dashboard</p>
				<p>Welcome to the admin dashboard!</p>
				<AdminContent
					reports={reports}
					reviews={reviews}
				/>
			</div>
		</div>
	)
}