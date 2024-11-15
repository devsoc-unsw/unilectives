"use client"

import { useGSAP } from "@gsap/react";
import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap } from "gsap";
import PageTransition from "./DefaultTransition";

export default function PopularCourseTransition({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [shouldShowOverlay, setShouldShowOverlay] = useState(false);
  
  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimationComplete) {
          setShouldShowOverlay(true);
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => observer.disconnect();
  }, [isAnimationComplete]);
  
  useGSAP(
    () => {
      if (isVisible && !isAnimationComplete) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimationComplete(true);
            setShouldShowOverlay(false);
          }
        });
        tl.set(".intro-text-1", {
          translateY: "100%",
          translateX: "50%",
          opacity: 1,
        });
        tl.set(".intro-text-2", {
          translateY: "200%",
          translateX: "50%",
          opacity: 1,
        });
        tl.to(".intro-text-1", {
          translateY: "25%",
          duration: 0.5,
          ease: "power2.easeIn",
        });
        tl.to(".intro-text-2", {
            translateY: "75%",
            duration: 1.5,
            ease: "power2.easeIn",
            delay: 1.5,
          },
        );
        tl.set(".transition-bg-1", {
          translateY: "100%",
          opacity: 1,
        });
        tl.to(".intro-text-1", {
            translateY: "-100%",
            duration: 1.5,
            delay: 2,
        });
        tl.to(".intro-text-2", {
          translateY: "-100%",
          duration: 1,
          delay: -1.2,
      });
        tl.to(".transition-bg-1", {
          translateY: "-100%",
          duration: 3,
        }, "<");
        tl.set([".transition-bg-2", ".transition-bg-3"], {
          translateY: "0%",
          opacity: 1,
        }, "<0.9");
        tl.to(".transition-bg-2", {
          translateY: "-100%",
          duration: 1,
          delay: -0.8,
        });
        tl.to(".transition-bg-3", {
          translateY: "-100%",
          duration: 0,
        });
        tl.to(".transition-bg-3", {
          opacity: 0,
          delay: 0.4,
          duration: 0.6,
        });
        tl.to(".page-content", {
          opacity: 1,
          duration: 0.3,
        }, "<-0.5");
      }
    },
    { scope: container, dependencies: [isVisible] },
  );

  return (
    <div className='w-screen h-screen snap-center overflow-hidden font-neuemetana' ref={container}>
      <div className={`page-content w-full h-full relative z-10 opacity-0`}>
        <PageTransition>
          {children}
        </PageTransition>
      </div>
      {shouldShowOverlay && (
        <>
          <div className="intro-text-1 flex flex-col w-1/2 h-1/2 justify-center items-center fixed inset-0 font-medium text-6xl z-50">First of all...</div>
          <div className="intro-text-2 fixed inset-0 z-50 h-1/2 w-1/2 text-8xl text-center flex flex-col justify-center font-medium bg-contain bg-no-repeat bg-center bg-[url('@../../../assets/most-popular-transition-star.svg')] ">
            <p>Most Popular</p>
            <p>Course</p>
          </div>
          <div className="transition-bg-3 h-screen opacity-0 fixed inset-0 bg-unilectives-wrapped-purple z-50"></div>
          <div className="transition-bg-2 h-screen opacity-0 fixed inset-0 bg-unilectives-yellow z-50"></div>
          <div className="transition-bg-1 h-screen opacity-0 fixed inset-0 bg-unilectives-pink z-50"></div>
        </>
      )}
    </div>
    
  );
}