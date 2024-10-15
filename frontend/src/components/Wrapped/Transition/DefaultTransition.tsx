"use client"

import { useGSAP } from "@gsap/react";
import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(".transition-bg-1", {
        translateY: "-100%",
        duration: 0.4,
      });
      tl.to(".transition-bg-2", {
        translateY: "-100%",
        duration: 0.4,
      });
      tl.to(".transition-bg-3", {
        opacity: 0,
        delay: 0.4,
        duration: 0.6,
      });
      tl.to(".transition-bg-3", {
        translateY: "-100%",
        duration: 0,
      });
    },
    { scope: container }
  );

  return (
    <div className='w-screen h-screen overflow-hidden font-neuemetana' ref={container}>
      <div className="transition-bg-3 absolute w-full h-full bg-unilectives-wrapped-purple z-10"></div>
      <div className="transition-bg-2 absolute w-full h-full bg-unilectives-yellow z-10"></div>
      <div className="transition-bg-1 absolute w-full h-full bg-unilectives-pink z-10" ></div>
      <div className="page-content w-full h-full">
        {children}
      </div>
    </div>
  );
}