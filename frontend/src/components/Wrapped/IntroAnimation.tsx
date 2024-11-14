"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import Landing from "@/components/Wrapped/Landing/Landing";

import gridBg from "../../../public/wrapped-grid-bg.png";
export default function IntroAnimation() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.set(".unilectives-intro-banner", {
        translateX: "100%",
        display: "flex",
      });
      tl.to(".unilectives-intro-banner", {
        translateX: "-100%",
        duration: 3,
        stagger: 0.1,
      });
      tl.to(
        ".transition-bg",
        {
          backgroundColor: "#1279F2",
          duration: 5,
          opacity: 0,
        },
        "<",
      );
      tl.set(".intro-transition", { display: "none" }, ">-1");
      tl.to(
        ".landing",
        { display: "block", opacity: 1, duration: 1.5 },
        ">-0.5",
      );
      tl.play();
    },
    { scope: container },
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
    <div
      className="w-screen h-screen overflow-hidden font-neuemetana"
      ref={container}
    >
      <div className="intro-transition absolute flex flex-col w-full h-full">
        <div className="transition-bg w-full h-full bg-unilectives-pink" />
        <div className="absolute w-full h-full flex flex-col">
          {genColoursArray(7).map((colour: string) => (
            <div
              className="unilectives-intro-banner flex-1 text-8xl w-max font-bold whitespace-nowrap justify-center items-center"
              style={{
                backgroundColor: colour,
                color: colour === "#CCFD51" ? "black" : "white",
              }}
            >
              UNILECTIVES WRAPPED 2024 UNILECTIVES WRAPPED 2024
            </div>
          ))}
        </div>
      </div>
      <div className="landing-bg  w-full h-full bg-unilectives-blue bg-blend-color-burn bg-[url('@../../../../public/wrapped-grid-bg.png')] bg-repeat">
        <div className="landing hidden absolute opacity-0">
          <Landing />
        </div>
      </div>
    </div>
  );
}
