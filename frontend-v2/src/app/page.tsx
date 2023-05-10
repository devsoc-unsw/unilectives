'use client'
import { useState, useEffect } from 'react';
import { Content } from "./style";
import getAllCourses from "../../lib/getAllCourses";
import CourseCard from "../components/CourseCard";

export default async function Home() {
  const courses: Course[] = await getAllCourses();
  return (
    <Content>
      {/* Logo */}
      <div className="flex">
        <img className="pt-[1rem] pl-[5rem]" src="/images/uni-lectives.svg" />
      </div>
      {/* HomeText */}
      <div className="flex flex-row justify-between">
        <div className="justify-center items-center pl-0 w-full pt-standard">
          <div className="flex flex-row w-full justify-between gap-[10px] mt-[15em]">
            <div className="flex flex-col gap-[10px] ml-[18em]">
              <p className="whitespace-no-wrap items-center justify-center drop-shadow-md italic font-lato">
                CSESoc presents
              </p>
              <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold text-7xl text-unilectives_blue">
                uni-lectives
              </p>
              <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold">
                Your one-stop shop for UNSW course and elective reviews.
              </p>
            </div>
            <div className="flex flex-row mr-0 gap-px items-center justify-center mr-[18em]">
              <button className="px-[28px] py-[13px] rounded-3xl bg-unilectives_blue hover:bg-unilectives_blue2 hover:scale-[0.98]">
                <p className="whitespace-no-wrap items-center drop-shadow justify-center font-lato text-white font-semibold">
                  Add a Review
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Searchbar Container */}
      <div className="flex flex-col space-between">
        {/* Searchbar */}
        <div className="flex overflow-hidden flex-row mt-[2em] ml-[18em] mr-[18em] rounded-xl border-2 border-unilectives_blue">
          <section className="flex flex-row space-between w-full h-10">
            <span className="w-[3em] h-[3em]">
              <img className="p-[0.9em]" src="/images/search-icon.svg" />
            </span>
            <input type="text" className="w-full h-full bg-slate-0 placeholder:italic placeholder-unilectives_blue focus:outline-none"
              placeholder="Search for a course e.g. COMP1511"></input>
          </section>
        </div>
        {/* Filter Options */}
        <div className="flex flex-row justify-between mt-[0.5em] mx-[19em]">
          <div className="flex flex-row space-between gap-[2em]">
            Sort by:
            <button type="button" className="px-[2em] inline-flex flex-row space-between jsutify-center gap-[1em]">
              Most Reviews
              <img className="object-scale-down h-[1.5rem] w-[1.5rem]" src="/images/dropdown.svg" />
            </button>
          </div>
          <div className="flex flex-row space-between gap-[2em]">
            <button type="button" className="px-[2em] inline-flex flex-row space-between jsutify-center gap-[1em]">
                Faculty
                <img className="object-scale-down h-[1.5rem] w-[1.5rem]" src="/images/dropdown.svg" />
            </button>
            <button type="button" className="px-[2em] inline-flex flex-row space-between jsutify-center gap-[1em]">
              Term
              <img className="object-scale-down h-[1.5rem] w-[1.5rem]" src="/images/dropdown.svg" />
            </button>
          </div>
        </div>
        {/* Course Cards */}
        <div className="grid grid-cols-responsive-cards gap-4 pl-[18em] pr-[18em] mt-[4em]">
            {courses.slice(0,4).map(course => (
                <CourseCard name={course.title} code={course.title} rating={1} numReviews={2} />
            ))};
        </div>
      </div>
    </Content>
  );
}