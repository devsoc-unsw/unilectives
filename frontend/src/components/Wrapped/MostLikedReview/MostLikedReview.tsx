"use client";

import Navbar from "@/components/Wrapped/Navbar/Navbar";
import PageTransition from "@/components/Wrapped/Transition/DefaultTransition";
import Sparkles from "@/components/Wrapped/MostLikedReview/Sparkles";
import React from "react";
import MagnifyingGlass from "@/assets/magnifying-glass.svg";
import LikeCommentIcon from "@/components/Wrapped/MostLikedReview/LikeCommentIcon";
import Image from "next/image";

export default function MostLikedReview() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const glassRef = React.useRef<HTMLDivElement>(null);

  const isClicked = React.useRef<boolean>(false);

  const coords = React.useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 500,
    startY: 500,
    lastX: 500,
    lastY: 500,
  });

  React.useEffect(() => {
    if (!glassRef.current || !containerRef.current) return;

    const glass = glassRef.current;
    const container = containerRef.current;

    var maxX = container.offsetWidth - 535;
    var maxY = container.offsetHeight - 535;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = glass.offsetLeft;
      coords.current.lastY = glass.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      var nextX = e.clientX - coords.current.startX + coords.current.lastX;
      var nextY = e.clientY - coords.current.startY + coords.current.lastY;

      nextX = Math.max(Math.min(nextX, maxX), 0);
      nextY = Math.max(Math.min(nextY, maxY), 0);

      glass.style.left = `${nextX}px`;
      glass.style.top = `${nextY}px`;
    };

    const updateBounds = () => {
      maxX = container.offsetWidth - 535;
      maxY = container.offsetHeight - 535;
    };

    glass.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);
    window.addEventListener("resize", updateBounds);

    const cleanup = () => {
      glass.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
      window.removeEventListener("resize", updateBounds);
    };

    return cleanup;
  }, []);

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="absolute w-full h-screen z-[1] overflow-hidden"
        id="review"
      >
        <div
          ref={glassRef}
          className="absolute top-[300px] left-[500px] z-[1] cursor-pointer select-none"
        >
          <Image
            width={2880}
            src={MagnifyingGlass}
            alt=""
            className="pointer-events-none transform -translate-x-[1120px] -translate-y-[1240px]"
          />
        </div>
      </div>
      <div className="absolute bg-unilectives-blue w-full h-screen justify-center flex flex-col z-[-1] overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <Sparkles />
        </div>
        <div className="flex items-center justify-center">
          <div className="p-8 my-14 flex flex-col bg-white font-poppins z-[1] h-[914px] w-[671px]">
            <div className="p-8 pt-14 bg-unilectives-pink font-medium text-white text-base h-[661px]">
              <p className="text-xl/9">
                The course was absolutely amazing in every aspect except for the
                lectures. Unfortunately Sri was quite difficult to understand at
                times and his teaching involved far too much theory and of him
                rote reading the slides.
                <br />
                <br />
                The assessments and labs taught a great deal to students and got
                them very very comfortable with both C and Mips, alot of which
                did end up being self directed however since lectures felt quite
                subpar.
                <br />
                <br />
                The content taught gave tastes of a few different flavours of
                CS, like a little...
              </p>
            </div>
            <div>
              <div className="my-6">
                <LikeCommentIcon />
              </div>
              <div className="flex flex-col justify-between h-[90px]">
                <div>
                  <span className="font-bold">
                    COMP1521 Computer System Fundamentals{" "}
                  </span>
                  <span className="font-regular">
                    Very good course that teaches you alot
                  </span>
                </div>
                <span className="font-light">24/08/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
