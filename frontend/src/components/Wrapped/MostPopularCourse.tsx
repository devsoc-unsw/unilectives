import Navbar from "@/components/Wrapped/Navbar/Navbar";
import PageTransition from "@/components/Wrapped/Transition/DefaultTransition";
import Link from "next/link";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import BoxComponent from "@/components/Wrapped/BoxComponent/BoxComponent";
import PopularCourseTransition from "@/components/Wrapped/Transition/PopularCourseTransition";

export default function MostPopularCourse() {
  return (
    <PopularCourseTransition>
      <div className="bg-white w-full h-screen flex flex-col" id="popular">
        <div className="flex justify-center mb-4">
        </div>
        <div className="flex flex-col mx-24">
          <h1 className="text-8xl text-unilectives-blue font-neuemetana uppercase border-b-2 border-unilectives-blue py-8">
            COMP3121
          </h1>
          <div className="flex flex-row mt-16 justify-between">
            <div className="flex flex-col gap-y-6">
              <h2 className="text-2xl text-unilectives-blue font-neuemetana uppercase font-semibold">
                Most Popular Course
              </h2>
              <h1 className="text-5xl text-unilectives-blue font-neuemetana uppercase font-semibold leading-tight">
                Algorithm Design
                <br />
                and Analysis
              </h1>
              <Link
                className="text-unilectives-blue flex items-start gap-3 font-semibold underline"
                href={"/course/COMP1511"}
              >
                <SquareArrowOutUpRightIcon strokeWidth={3} />
                Visit Course in Unilectives
              </Link>
            </div>
            <div className="flex flex-col gap-y-6 mr-48">
              <h2 className="text-2xl text-unilectives-blue font-neuemetana uppercase font-semibold">
                Visited
              </h2>
              <h1 className="text-5xl text-unilectives-blue font-neuemetana uppercase font-semibold">
                143
              </h1>
              <h3 className="text-xl text-unilectives-blue font-neuemetana uppercase">
                Times
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-8 mt-20">
            <BoxComponent
              title={"Enjoyment"}
              rating={"3.1"}
              textColor="text-unilectives-blue"
              borderColor="border-unilectives-blue"
            />
            <BoxComponent
              title={"Usefulness"}
              rating={"4.5"}
              textColor="text-unilectives-blue"
              borderColor="border-unilectives-blue"
            />
            <BoxComponent
              title={"Manageability"}
              rating={"3.2"}
              textColor="text-unilectives-blue"
              borderColor="border-unilectives-blue"
            />
          </div>
        </div>
      </div>
    </PopularCourseTransition>
  );
}
