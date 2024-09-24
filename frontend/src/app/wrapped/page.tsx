"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import Landing from "@/components/Wrapped/Landing/landing";


export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.set(".unilectives-intro-banner", {
        translateX: "100%",
        display: "block",
      });
      tl.to(".unilectives-intro-banner", {
        translateX: "-100%",
        duration: 4,
        stagger: 0.1,
      });
      tl.to(".transition-bg", { backgroundColor: "#1279F2", duration: 5 }, "<");
      tl.set(".intro-transition", { display: "none" }, ">-0.5");
      tl.to(".landing", {display: "block", opacity: 1, duration: 0.5}, "<-2");
      tl.play();
    },
    { scope: container }
  );

  const genColoursArray = (n: number) => {
    const coloursArray = ["#1279F2", "#5347F5", "#CCFD51", "#EE82C7"];
    const arr = Array(n).fill("");
    for (let i = 0; i < n; i++) {
      arr[i] = coloursArray[i % coloursArray.length];
    }
    return arr;
  };

  return (
    <div className="w-screen h-screen overflow-hidden" ref={container}>
      <main className="transition-bg relative w-full h-full bg-unilectives-pink">
        
        <div className="intro-transition absolute flex flex-col w-full h-full">
          {genColoursArray(7).map((colour: string) => (
            <p
              className="unilectives-intro-banner translate-x-full flex-1 text-8xl w-max font-bold whitespace-nowrap"
              style={{ backgroundColor: colour }}
            >
              UNILECTIVES WRAPPED 2024 UNILECTIVES WRAPPED 2024
            </p>
          ))}
        </div>
        
        <div className="landing hidden opacity-0">
          <Landing />
        </div>

      </main>
    </div>
  );
}