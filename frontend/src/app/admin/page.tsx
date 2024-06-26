import Image from "next/image";
import { validatedReq } from "@/utils/request";
import { Reports, Reviews } from "@/types/api";
import AdminContent from "@/components/AdminContent/AdminContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import navbar from "@/assets/navbar.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Admin Dashboard | Unilectives - UNSW Course Reviews`,
  description: `Manage and resolve reports left on particular course reviews by Unilectives users.`,
};

export default async function AdminDashboard() {
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
        alt='landing page graphic'
        layout='responsive'
        priority
      />
      <div className='flex flex-col w-full h-full px-12 py-6 gap-6'>
        <p className='font-bold text-3xl'>Admin Dashboard</p>
        <p>Welcome to the admin dashboard!</p>
        <AdminContent reports={reports} reviews={reviews} />
      </div>
    </div>
  );
}
