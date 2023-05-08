'use client'
import { useState, useEffect } from 'react';
import { Content } from "./style";

interface CourseData {
  name: string;
}

export async function getCoursesData(): Promise<CourseData> {
  const response = await fetch('https://swapi.dev/api/people/1');
  const data = await response.json();
  return data;
}

export default function Home() {
  const [courses, retrieveCourses] = useState<CourseData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getCoursesData();
      retrieveCourses(data);
    }
    fetchData();
  }, []);

  return (
    <Content>
      <div className="flex">
        <img className="pt-[1rem] pl-[5rem]" src="/images/uni-lectives.svg" />
      </div>
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
      <div className="flex flex-col space-between">
        <div className="flex overflow-hidden flex-row mt-[2em] ml-[18em] mr-[18em] rounded-full border-2 border-unilectives_blue">
          <section className="flex flex-row space-between w-full h-10">
            <span className="w-[3em] h-[3em]">
              <img className="p-[0.9em]" src="/images/search-icon.svg" />
            </span>
            <input type="text" className="w-full h-full bg-slate-0 placeholder:italic placeholder-unilectives_blue focus:outline-none"
              placeholder="Search for a course e.g. COMP1511"></input>
          </section>
        </div>
      </div>
    </Content>
  );
}