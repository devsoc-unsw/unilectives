"use client";

import { StarIcon } from "@/components/Wrapped/BoxComponent/StarIcon";
import { DegreeHatIcon } from "@/components/Wrapped/IndustryAward/DegreeHatIcon";
import { ShareIcon } from "@/components/Wrapped/IndustryAward/ShareIcon";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import year from "../../../../public/wrapped-year.svg";

export default function IndustryAwardPage() {
  const courseCode = "COMP2511";
  const courseName = "Object oriented programming";

  const rightTitle = "( INDUSTRY AWARD )";
  const rating = "4.7";

  const handleVisitCourse = () => {
    window.open("https://youtube.com", "_blank");
  }

  useGSAP(() => {
    gsap.to(".year-bg", {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);
  
  return (
    <div
      className="w-screen h-screen overflow-hidden font-neuemetana bg-unilectives-wrapped-purple flex justify-center items-center"
    >
      <main key="main-frame" className="bg-white w-2/3 h-2/3 rounded-[2rem] p-12 flex gap-10 relative">
        {/* TODO: Remove hardcoding of rotation and top and left position */}
        <div className="absolute -top-[60px] -left-[60px] flex items-center justify-center -rotate-[40deg]">
          <Image
            className="year-bg w-[200px] h-[200px]"
            src={year}
            alt="year"
          />
          <p className="absolute text-2xl !text-black font-extrabold">2024</p>
        </div>

        <section key="left-content" className="w-1/2 flex flex-col">
          <div className="h-2/3 flex justify-center items-center">
            <DegreeHatIcon/>
          </div>
          <div className="h-1/3 flex flex-col gap-2 justify-center items-center bg-unilectives-wrapped-purple rounded-xl">
            <p className="text-6xl font-bold">{courseCode}</p>
            <p>{courseName}</p>
          </div>
        </section>

        <section key="right-content" className="w-1/2 flex flex-col gap-8 justify-center items-center">
          <div className="text-unilectives-wrapped-purple text-4xl font-bold">
            {rightTitle}
          </div>
          <div key="score-table" className="w-[100%] flex flex-col px-2">
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold">Enjoyment</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {rating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold">Usefulness</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {rating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold">Usability</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {rating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold text-unilectives-wrapped-purple">Overall</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {rating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 hover:text-gray-700 cursor-pointer group" onClick={handleVisitCourse}>
            <ShareIcon className="w-6 h-6 stroke-unilectives-wrapped-purple group-hover:stroke-gray-700"/>
            <div className="text-unilectives-wrapped-purple text-base underline group-hover:text-gray-700">
              Visit course on Unilectives
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}