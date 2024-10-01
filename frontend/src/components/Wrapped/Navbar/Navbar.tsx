"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import navbarIcon from "../../../../public/wrapped-navbar.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ItemCard from "./ItemCard";

export default function NavbarToggle() {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);

  // Toggle function to open/close the Navbar
  const toggleNavbar = () => setShowNavbar(true); // Changed to always open on click

  // Function to close the Navbar (reverse animation)
  const closeNavbar = () => {
    gsap.to(navbarRef.current, {
      y: "-100%", // Animate to above the view
      duration: 0.7,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(navbarRef.current, { display: "none" });
        setShowNavbar(false); // Update state to ensure synchronization
      },
    });
  };

  // GSAP animation setup for opening
  useEffect(() => {
    if (showNavbar) {
      gsap.fromTo(
        navbarRef.current,
        {
          y: "-100%", // Start just above the view
          display: "none", // Ensure it starts hidden
        },
        {
          y: "0%", // End at the natural position (center of the screen)
          duration: 0.7,
          ease: "power3.out",
          display: "flex", // Make sure to display as flex when animating in
        },
      );
    }
  }, [showNavbar]);

  return (
    <>
      <button onClick={toggleNavbar}>
        <Image src={navbarIcon} alt="Toggle Navbar" priority />
      </button>
      {showNavbar && ( // Conditional rendering based on showNavbar state
        <div
          ref={navbarRef}
          className="fixed bottom-0 left-0 w-full h-full bg-unilectives-yellow z-50 flex-col p-12 space-y-6 !text-black"
          style={{ display: "none" }} // Start with the div hidden
        >
          <div className="flex justify-between w-full ">
            <h1 className="text-3xl font-bold">UNILECTIVES WRAPPED</h1>
            <XMarkIcon
              onClick={closeNavbar}
              className="w-12 h-12 cursor-pointer"
            />
          </div>
          <div className="flex flex-col h-full space-y-3">
            <div className="grid grid-cols-5 gap-3 h-full">
              <ItemCard title="INTRO" link="" />
              <ItemCard title="MOST POPULAR COURSE" link="" />
              <ItemCard title="HIGHEST RATED COURSE PER TERM" link="" />
              <ItemCard title="MOST LIKED REVIEW" link="" />
              <ItemCard title="PEOPLE CHOICE" link="" />
            </div>
            <div className="grid grid-cols-4 gap-3 h-full">
              <ItemCard title="INDUSTRY AWARD" link="" />
              <ItemCard title="WAM BOOSTER" link="" />
              <ItemCard title="SUMMARY" link="" />
              <ItemCard title="GO BACK TO UNILECTIVES" link="" />
            </div>
          </div>

          <div className="flex">
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
}
