"use client";

import React from "react";
import Navbar from "@/components/Wrapped/Navbar/Navbar";
import HighestRated from "@/components/Wrapped/HighestRated/HighestRated";
import IndustryAward from "@/components/Wrapped/IndustryAward/IndustryAward";
import IntroAnimation from "@/components/Wrapped/IntroAnimation";
import MostLikedReview from "@/components/Wrapped/MostLikedReview/MostLikedReview";
import MostPopularCourse from "@/components/Wrapped/MostPopularCourse";
import PeoplesChoice from "@/components/Wrapped/PeoplesChoice";
import { useInView } from "react-intersection-observer";

export default function WrappedPage() {
  const [introRef, introInView] = useInView({ threshold: 0.5 });
  const [landingRef, landingInView] = useInView({ threshold: 0.5 });
  const [popularRef, popularInView] = useInView({ threshold: 0.5 });
  const [ratedRef, ratedInView] = useInView({ threshold: 0.5 });
  const [reviewRef, reviewInView] = useInView({ threshold: 0.5 });
  const [peopleRef, peopleInView] = useInView({ threshold: 0.5 });
  const [industryRef, industryInView] = useInView({ threshold: 0.5 });
  const [wamRef, wamInView] = useInView({ threshold: 0.5 });
  const [summaryRef, summaryInView] = useInView({ threshold: 0.5 });

  return (
    <main className="overflow-x-hidden scrollbar-hidden snap-y snap-mandatory h-screen overflow-scroll">
      <div
        className={`sticky z-50 top-0 flex justify-center ${introInView ? "hidden" : ""}`}
      >
        <Navbar
          landingInView={landingInView}
          popularInView={popularInView}
          ratedInView={ratedInView}
          reviewInView={reviewInView}
          peopleInView={peopleInView}
          industryInView={industryInView}
          wamInView={wamInView}
          summaryInView={summaryInView}
        />
      </div>
      <div ref={introRef}>
        <div ref={landingRef}>
          <IntroAnimation />
        </div>
      </div>
      <div ref={popularRef} id="popular"></div>
      <MostPopularCourse />
      <div ref={ratedRef} id="rated"></div>
      <HighestRated />
      <div ref={reviewRef} id="review"></div>
      <MostLikedReview />
      <div ref={peopleRef} id="people"></div>
      <PeoplesChoice />
      <div ref={industryRef} id="industry"></div>
      <IndustryAward />
    </main>
  );
}
