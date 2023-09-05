import Image from "next/image";
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import navbar from "@/assets/navbar.svg";
import { Metadata } from "next";
import { AggregateRating, ItemList, WithContext } from "schema-dts";
import { get } from "@/utils/request";
import { Course, Courses } from "@/types/api";
import { ConstructSignatureDeclaration } from "typescript";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home | Unilectives - UNSW Course Reviews`,
    description: `A course review website for UNSW made by CSESoc`,
  };
}

export default async function Home() {
  const res = (await get("/courses")) as Courses;
  const courses = res.courses;
  // TODO: fix up client side rendering (have the first 25 courses loaded serverside and subsequent clientside)

  const metaLD: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course: Course, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        url: `//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${
          course.courseCode
        }`,
        name: course.title,
        description: course.description,
        provider: {
          "@type": "CollegeOrUniversity",
          name: "University of New South Wales",
          sameAs: "https://www.unsw.edu.au/",
        },
      },
    })),
  };

  return (
    <div className="mb-20">
      {/* Landing page graphic */}
      <div>
        <Image
          src={navbar}
          width={1000}
          height={500}
          alt="landing page graphic"
          layout="responsive"
          priority
        />
      </div>
      {/* Hero Section */}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metaLD) }}
        />
      <div className="flex flex-row w-full justify-center items-center mt-10">
        <div className="flex flex-row w-5/6 space-y-0 justify-between items-left md:space-y-4 md:flex-col md:items-center">
          <div className="flex flex-col w-full gap-3">
            <p className="drop-shadow-md text-base sm:text-xs">
              CSESoc presents
            </p>
            <h1 className="justify-center font-bold text-unilectives-blue text-7xl sm:text-4xl">
              unilectives
            </h1>
            <p className="justify-center font-semibold text-base sm:text-xs">
              Your one-stop shop for UNSW course and elective reviews.
            </p>
          </div>
        </div>
      </div>
      {/* Course Section */}
      <div className="flex flex-col justify-center items-center mt-10">
        <LandingPageContent />
      </div>
    </div>
  );
}
