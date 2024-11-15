import HighestRated from "@/components/Wrapped/HighestRated/HighestRated";
import IndustryAward from "@/components/Wrapped/IndustryAward/IndustryAward";
import IntroAnimation from "@/components/Wrapped/IntroAnimation";
import MostLikedReview from "@/components/Wrapped/MostLikedReview/MostLikedReview";
import MostPopularCourse from "@/components/Wrapped/MostPopularCourse";
import PeoplesChoice from "@/components/Wrapped/PeoplesChoice";
import React from "react";

export default function WrappedPage() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-scroll">
      <IntroAnimation />

      <MostPopularCourse />
      <HighestRated/>
      <MostLikedReview/>
      <PeoplesChoice/>
      <IndustryAward/>
    </main>
  );
}
