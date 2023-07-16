import Image from "next/image";
import waves from "../../../assets/navbar.svg";
import { notFound } from "next/navigation";
import { get } from "@/utils/request";
import UserReviews from "@/components/UserReviews/UserReviews";

export default async function UserPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  const { user } = await get(`/user/${params.zid}`);

  console.log(user);

  if (!user) notFound();

  return (
    <div className="isolate relative">
      {/* Waves */}
      <div className="absolute w-full top-0 -z-10">
        <Image className="w-full h-full object-cover" src={waves} alt="Waves" />
      </div>
      <section className="py-24 px-16 md:px-8 lg:py-16 space-y-5">
        <h1 className="font-bold text-3xl">{user.zid}</h1>
        <UserReviews reviews={user.reviews} />
      </section>
    </div>
  );
}
