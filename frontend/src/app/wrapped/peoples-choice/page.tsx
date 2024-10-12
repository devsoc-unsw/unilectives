"use client"

import PageTransition from '@/components/Wrapped/Transition/DefaultTransition';
import Navbar from "@/components/Wrapped/Navbar/Navbar"
import Image from "next/image";
import year from "../../../../public/wrapped-year.svg";
import WrappedTrophy from "@/assets/wrapped-trophy.png"
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

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
      <div className='bg-unilectives-pink w-full h-full overflow-scroll'>
        <div className='flex justify-center mb-12'>
          <Navbar/>
        </div>
        <div className='grid grid-cols-12 mx-20 mb-12'>
          <div className='grid cols-span-5'>
            <h1 className='text-8xl font-bold italic text-center text-white font-timesnewroman uppercase'>People&apos;s
              Choice</h1>
            <div className='relative'>
              <div className='absolute right-5 top-32'>
                <div className="flex items-center justify-center">
                  <Image
                    className="year-bg w-[185px] h-[185px]"
                    src={year}
                    alt="year"
                  />
                  <p className="absolute text-2xl !text-black font-extrabold">2024</p>
                </div>
              </div>
              <Image src={WrappedTrophy} alt={"wrapped trophy"} className='w-96'/>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>

  )
    ;
}