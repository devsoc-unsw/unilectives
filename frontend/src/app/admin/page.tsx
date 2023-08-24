import Image from "next/image";
import { validatedReq } from "@/utils/request";
import { Reviews, Reports } from "@/types/api";
import AdminContent from "@/components/AdminContent/AdminContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import navbar from "@/assets/navbar.svg";

export default async function () {
  const session = await getServerSession(authOptions);
  const { reviews } = (await validatedReq(
    "GET",
    "/reviews",
    session?.user?.accessToken ?? "",
    session?.user?.id ?? ""
  )) as Reviews;
	const { reports } = (await validatedReq(
    "GET",
    "/reports",
    session?.user?.accessToken ?? "",
    session?.user?.id ?? ""
  )) as Reports;

  return (
		<div>
			<Image
				src={navbar}
				width={1000}
				height={500}
				alt="landing page graphic"
				layout="responsive"
				priority
			/>
			<div className="flex flex-col w-full px-12 py-6 gap-6">
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
