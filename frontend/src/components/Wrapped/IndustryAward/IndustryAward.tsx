"use client";

import { StarIcon } from "@/components/Wrapped/BoxComponent/StarIcon";
import { DegreeHatIcon } from "@/components/Wrapped/IndustryAward/DegreeHatIcon";
import { ShareIcon } from "@/components/Wrapped/IndustryAward/ShareIcon";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import year from "../../../../public/wrapped-year.svg";
import { useEffect, useRef, useState } from "react";
import { get } from "@/utils/request";
import { set } from "lodash";

export default function IndustryAward() {
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const [rightTitleSize, setRightTitleSize] = useState<string | null>("16px");

  const courseTitleBoxRef = useRef<HTMLDivElement>(null);
  const [courseTitleSize, setCourseTitleSize] = useState<string | null>("16px");
  const [courseCodeSize, setCourseCodeSize] = useState<string | null>("24px");

  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);

  const rightTitle = "( INDUSTRY AWARD )";
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [enjoymentRating, setEnjoymentRating] = useState<number | null>(null);
  const [usefulnessRating, setUsefulnessRating] = useState<number | null>(null);
  const [usabilityRating, setUsabilityRating] = useState<number | null>(null);

  const [link, setLink] = useState<string>("https://unilectives.devsoc.app/");
  const handleVisitCourse = () => {
    window.open(link, "_blank");
  };

  useGSAP(() => {
    gsap.to(".year-bg", {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  useEffect(() => {
    async function fetchCourseCode() {
      const code = await get(`/wrapped/course/highest-attribute/usefulness`);
      return code;
    }

    fetchCourseCode()
      .then(async (data) => {
        setCourseCode(data.courseCode);
        const newLink = `https://unilectives.devsoc.app/course/${data.courseCode}`;
        setLink(newLink);
        return get(`/course/${data.courseCode}`);
      })
      .then(async (courseData) => {
        const data = courseData.course;
        setCourseName(data.title);

        const enjoyability = Math.round(data.enjoyability * 100) / 100;
        const usefulness = Math.round(data.usefulness * 100) / 100;
        const usability = Math.round(data.manageability * 100) / 100;
        const overall = Math.round(data.overallRating * 100) / 100;
        setEnjoymentRating(enjoyability);
        setUsefulnessRating(usefulness);
        setUsabilityRating(usability);
        setOverallRating(overall);
      });
  }, []);

  useEffect(() => {
    function updateFontSize() {
      if (rightSectionRef.current) {
        const sectionWidth = rightSectionRef.current.offsetWidth;
        const newFontSize = sectionWidth * 0.08;
        setRightTitleSize(`${newFontSize}px`);
      }

      if (courseTitleBoxRef.current) {
        const sectionWidth = courseTitleBoxRef.current.offsetWidth;
        const newCourseCodeSize = sectionWidth * 0.13;
        setCourseCodeSize(`${newCourseCodeSize}px`);

        const newCourseTitleSize = sectionWidth * 0.04;
        setCourseTitleSize(`${newCourseTitleSize}px`);
      }
    }

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <div className="w-screen h-screen snap-start overflow-hidden font-neuemetana bg-unilectives-wrapped-purple flex justify-center items-center"  id="industry">
      <main
        key="main-frame"
        className="bg-white w-2/3 h-2/3 rounded-[2rem] p-12 flex gap-10 relative"
      >
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
            <DegreeHatIcon className="w-auto h-[80%]" />
          </div>
          <div
            ref={courseTitleBoxRef}
            className="h-1/3 flex flex-col gap-2 justify-center items-center bg-unilectives-wrapped-purple rounded-xl"
          >
            <p
              className="text-6xl font-bold"
              style={{ fontSize: courseCodeSize || "24px" }}
            >
              {courseCode}
            </p>
            <p style={{ fontSize: courseTitleSize || "16px" }}>{courseName}</p>
          </div>
        </section>

        <section
          ref={rightSectionRef}
          key="right-content"
          className="w-1/2 flex flex-col gap-8 justify-center items-center"
        >
          <div
            className="text-unilectives-wrapped-purple font-bold"
            style={{ fontSize: rightTitleSize || "16px" }}
          >
            {rightTitle}
          </div>
          <div key="score-table" className="w-[100%] flex flex-col px-2">
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold">Enjoyment</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {enjoymentRating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold">Usefulness</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {usefulnessRating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              {/* TODO: Need to double check, this might need to be manageability actually */}
              <div className="font-bold">Usability</div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {usabilityRating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
            <div className="text-black flex items-center justify-between p-2 h-12">
              <div className="font-bold text-unilectives-wrapped-purple">
                Overall
              </div>
              <div>
                <div className="flex-grow-0 flex gap-2">
                  {overallRating}
                  <StarIcon className={`w-5 h-5 black`} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex gap-4 hover:text-gray-700 cursor-pointer group"
            onClick={handleVisitCourse}
          >
            <ShareIcon className="w-6 h-6 stroke-unilectives-wrapped-purple group-hover:stroke-gray-700" />
            <div className="text-unilectives-wrapped-purple text-base underline group-hover:text-gray-700">
              Visit course on Unilectives
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
