"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import navbarIcon from "../../../../public/wrapped-navbar.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Facebook, Twitter, Instagram } from "lucide-react";
import ItemCard from "./ItemCard";
import { useInView } from "react-intersection-observer";

interface NavbarProps { 
  introInView: boolean;
  popularInView: boolean;
  ratedInView: boolean;
  reviewInView: boolean;
  peopleInView: boolean;
  industryInView: boolean;
  wamInView: boolean;
  summaryInView: boolean;
}

export default function NavbarToggle({ introInView, popularInView, ratedInView, reviewInView, peopleInView, industryInView, wamInView, summaryInView }: NavbarProps) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSection, setCurrentSection] = useState("INTRO");
  const navbarRef = useRef(null);



  useEffect(() => {
    if (introInView) setCurrentSection("INTRO");
    else if (popularInView) setCurrentSection("MOST POPULAR COURSE");
    else if (ratedInView) setCurrentSection("HIGHEST RATED COURSE PER TERM");
    else if (reviewInView) setCurrentSection("MOST LIKED REVIEW");
    else if (peopleInView) setCurrentSection("PEOPLE CHOICE");
    else if (industryInView) setCurrentSection("INDUSTRY AWARD");
    else if (wamInView) setCurrentSection("WAM BOOSTER");
    else if (summaryInView) setCurrentSection("SUMMARY");
  }, [introInView, popularInView, ratedInView, reviewInView, peopleInView, industryInView, wamInView, summaryInView]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeNavbar();
    }
  };

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
          className="fixed bottom-0 left-0 w-full h-full bg-unilectives-yellow z-50 flex-col p-12 space-y-10 !text-black"
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
            <div className="grid lg:grid-cols-1 grid-cols-5 gap-3 h-full">
              <ItemCard 
                title="INTRO" 
                link="" 
                isActive={currentSection === "INTRO"}
                onClick={() => scrollToSection("intro")} 
              />
              <ItemCard 
                title="MOST POPULAR COURSE" 
                link="" 
                isActive={currentSection === "MOST POPULAR COURSE"}
                onClick={() => scrollToSection("popular")} 
              />
              <ItemCard 
                title="HIGHEST RATED COURSE PER TERM" 
                link="" 
                isActive={currentSection === "HIGHEST RATED COURSE PER TERM"}
                onClick={() => scrollToSection("rated")} 
              />
              <ItemCard 
                title="MOST LIKED REVIEW" 
                link="" 
                isActive={currentSection === "MOST LIKED REVIEW"}
                onClick={() => scrollToSection("review")} 
              />
              <ItemCard 
                title="PEOPLE CHOICE" 
                link="" 
                isActive={currentSection === "PEOPLE CHOICE"}
                onClick={() => scrollToSection("people")} 
              />
            </div>
            <div className="grid lg:grid-cols-1 grid-cols-4 gap-3 h-full">
              <ItemCard 
                title="INDUSTRY AWARD" 
                link="" 
                isActive={currentSection === "INDUSTRY AWARD"}
                onClick={() => scrollToSection("industry")} 
              />
              <ItemCard 
                title="WAM BOOSTER" 
                link="" 
                isActive={currentSection === "WAM BOOSTER"}
                onClick={() => scrollToSection("wam")} 
              />
              <ItemCard 
                title="SUMMARY" 
                link="" 
                isActive={currentSection === "SUMMARY"}
                onClick={() => scrollToSection("summary")} 
              />
              <ItemCard title="GO BACK TO UNILECTIVES" link="" />
            </div>
          </div>

          <div className="flex space-x-3">
            <Facebook className="w-8 h-8 cursor-pointer" />
            <Instagram className="w-8 h-8 cursor-pointer" />
            <Twitter className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
}
