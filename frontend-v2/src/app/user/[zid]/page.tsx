import Image from "next/image";
import waves from "../../../assets/navbar.svg";
import { notFound } from "next/navigation";
import { validatedReq } from "@/utils/request";
import UserPageContent from "@/components/UserPageContent/UserPageContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  const session = await getServerSession(authOptions);

  const { user } = await validatedReq(
    "GET",
    `/user/${params.zid}`,
    session?.user?.accessToken ?? "",
    params.zid
  );

  if (!user || session?.user?.id !== params.zid) notFound();

  return (
    <div className="isolate relative">
      {/* Waves */}
      <div className="absolute w-full top-0 -z-10">
        <Image className="w-full h-full object-cover" src={waves} alt="Waves" />
      </div>
      <section className="py-24 px-16 md:px-8 lg:py-16 space-y-5">
        <h1 className="font-bold text-3xl">{user.zid}</h1>
        <UserPageContent
          reviews={user.reviews}
          reports={user.reports}
          bookmarked={user.bookmarkedReviews}
        />
      </section>
    </div>
  );
}
