"use client"

import { useGSAP } from "@gsap/react";
import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
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
        
        tl.set([".transition-bg-1", ".transition-bg-2", ".transition-bg-3"], {
          translateY: "0%",
          opacity: 1,
        });
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
        tl.to(".page-content", {
          opacity: 1,
          duration: 0.3,
        },
        "<-0.9",
        );
      }
    },
    { scope: container, dependencies: [isVisible] }
  );

  return (
    <div className='w-screen h-screen snap-center overflow-hidden font-neuemetana' ref={container}>
      <div className={'page-content w-full h-full relative z-10 opacity-0'}>
        {children}
      </div>
      {shouldShowOverlay && (
        <>
          <div className="transition-bg-3 fixed inset-0 bg-unilectives-wrapped-purple z-50"></div>
          <div className="transition-bg-2 fixed inset-0 bg-unilectives-yellow z-50"></div>
          <div className="transition-bg-1 fixed inset-0 bg-unilectives-pink z-50"></div>
        </>
      )}
    </div>
  );
}