"use client"

import PageTransition from '@/components/Wrapped/Transition/DefaultTransition';
import Navbar from "@/components/Wrapped/Navbar/Navbar"
import Image from "next/image";
import year from "../../../../public/wrapped-year.svg";
import WrappedTrophy from "@/assets/wrapped-trophy.png"
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import Link from "next/link";
import ShareIcon from "@/assets/share-icon.svg"
import Star from "@/assets/star.svg"
import BoxComponent from "@/components/Wrapped/PeoplesChoice/BoxComponent";

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
      <div className='bg-unilectives-pink w-full h-full'>
        <div className='flex justify-center mb-12'>
          <Navbar/>
        </div>
        <div className='grid grid-cols-12 mx-20 mb-28'>
          <div className='col-span-5'>
            <h1 className='text-8xl font-bold italic text-center text-white font-timesnewroman uppercase'>People&apos;s
              Choice</h1>
            <div className='relative w-full h-0 pb-[100%]'>
              <div className='absolute right-0 top-44'>
                <div className="flex items-center justify-center">
                  <Image
                    className="year-bg w-[175px] h-[175px]"
                    src={year}
                    alt="year"
                  />
                  <p className="absolute text-2xl !text-black font-extrabold">2024</p>
                </div>
              </div>
              <Image src={WrappedTrophy} alt={"wrapped trophy"} fill
                     className='max-w-full max-h-full object-contain object-center'/>
            </div>
          </div>
          <div className='col-span-7 ms-10'>
            <h1 className='text-[112px] text-white font-neuemetana uppercase'>COMP1511</h1>
            <h3 className='text-4xl font-bold text-white font-neuemetana'>Programming Fundamentals</h3>
            <Link className='mt-10 text-white flex items-start gap-3 font-semibold underline'
                  href={'/course/COMP1511'}>
              <Image src={ShareIcon} alt={"share icon"} className='w-5 h-5'/>
              Visit Course in Unilectives
            </Link>
            <div className='grid grid-cols-2 grid-rows-2 gap-10 mt-10'>
              <BoxComponent title={"Enjoyment"} rating={"4.7"}/>
              <BoxComponent title={"Usefulness"} rating={"4.8"}/>
              <BoxComponent title={"Manageability"} rating={"4.7"}/>
              <BoxComponent title={"Overall Rating"} rating={"4.7"}/>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>

  )

}