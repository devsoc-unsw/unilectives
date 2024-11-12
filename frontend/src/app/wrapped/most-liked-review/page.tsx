'use client'

import Navbar from "@/components/Wrapped/Navbar/Navbar";
import PageTransition from "@/components/Wrapped/Transition/DefaultTransition";
import Sparkles from "@/components/Wrapped/MostLikedReview/Sparkles";
import React from "react";
import LikeCommentIcon from "@/components/Wrapped/MostLikedReview/LikeCommentIcon";

export default function MostLikedReviewPage() {

  return (
    <PageTransition>
      <div className="bg-unilectives-blue w-full h-screen justify-center flex flex-col z-[-1]">
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <Sparkles />
        </div>
        <div className="absolute top-0 left-0 w-full flex justify-center mb-4 z-[2]">
          <Navbar />
        </div>
        <div className="flex items-center justify-center">
          <div className="p-8 my-14 flex flex-col bg-white font-poppins z-[1] h-[914px] w-[671px]">
            <div className="p-8 pt-14 bg-unilectives-pink font-medium text-white text-base h-[661px]">
              <p className="text-xl/9">
                The course was absolutely amazing in every aspect except for the lectures. Unfortunately Sri was quite difficult to understand at times and his teaching involved far too much theory and of him rote reading the slides.
                <br />
                <br />
                The assessments and labs taught a great deal to students and got them very very comfortable with both C and Mips, alot of which did end up being self directed however since lectures felt quite subpar.
                <br />
                <br />
                The content taught gave tastes of a few different flavours of CS, like a little...
              </p>
            </div>
            <div>
              <div className="my-6">
                <LikeCommentIcon />
              </div>
              <div className="flex flex-col justify-between h-[90px]">
                <div>
                  <span className="font-bold">COMP1521 Computer System Fundamentals </span>
                  <span className="font-regular">Very good course that teaches you alot</span>
                </div>
                <span className="font-light">24/08/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
