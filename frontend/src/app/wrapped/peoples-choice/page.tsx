"use client";

import PageTransition from "@/components/Wrapped/Transition/DefaultTransition";
import Navbar from "@/components/Wrapped/Navbar/Navbar";
import Image from "next/image";
import year from "../../../../public/wrapped-year.svg";
import WrappedTrophy from "@/assets/wrapped-trophy.png";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import ShareIcon from "@/assets/share-icon.svg";
import BoxComponent from "@/components/Wrapped/BoxComponent/BoxComponent";

export default function PeoplesChoicePage() {
  useGSAP(() => {
    gsap.to(".year-bg", {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <PageTransition>
      <div className="bg-unilectives-pink w-full h-screen flex flex-col">
        <div className="flex justify-center mb-4">
          <Navbar />
        </div>
        <div className="flex-grow grid grid-cols-12 mx-20 mb-8 overflow-hidden">
          <div className="md:col-span-12 col-span-5 flex flex-col">
            <h1 className="text-8xl font-bold italic text-center text-white font-timesnewroman uppercase mb-4">
              People&apos;s Choice
            </h1>
            <div className="relative flex-grow flex items-center">
              <div className="relative w-full">
                <Image
                  src={WrappedTrophy}
                  alt={"wrapped trophy"}
                  className="w-full h-auto object-contain max-h-[calc(100vh-350px)]"
                />
                <div className="absolute right-[5%] top-[40%] w-1/3 max-w-[200px] min-w-[50px]">
                  <div className="relative">
                    <Image
                      className="year-bg w-full h-auto"
                      src={year}
                      alt="year"
                    />
                    <p className="absolute xl:text-base lg:text-base md:text-xl text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !text-black font-extrabold">
                      2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-12 col-span-7 ms-10 flex flex-col justify-center">
            <h1 className="text-6xl md:text-8xl lg:text-[112px] text-white font-neuemetana uppercase">
              COMP1511
            </h1>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-neuemetana">
              Programming Fundamentals
            </h3>
            <Link
              className="mt-6 text-white flex items-start gap-3 font-semibold underline"
              href={"/course/COMP1511"}
            >
              <Image src={ShareIcon} alt={"share icon"} className="w-5 h-5" />
              Visit Course in Unilectives
            </Link>
            <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-8">
              <BoxComponent title={"Enjoyment"} rating={"4.7"} />
              <BoxComponent title={"Usefulness"} rating={"4.8"} />
              <BoxComponent title={"Manageability"} rating={"4.7"} />
              <BoxComponent title={"Overall Rating"} rating={"4.7"} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

