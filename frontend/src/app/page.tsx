import Image from "next/image";
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import navbar from "@/assets/navbar.svg";
import JaneStreetLogo from "@/assets/janestreet.svg";
import TikTokLogo from "@/assets/tiktok-logo.svg";
import SafetyCultureLogo from "@/assets/sc.png";
import AristaLogo from "@/assets/arista.png";
import TheTradeDeskLogo from "@/assets/thetradedesk.png";
import { Metadata } from "next";
import { ItemList, WithContext } from "schema-dts";
import { get } from "@/utils/request";
import { Course, Courses } from "@/types/api";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home | Unilectives - UNSW Course Reviews`,
    description: `UNSW course reviews, ratings, and study tips. Unilectives is your one-stop shop for making informed course choices at UNSW.`,
  };
}

export default async function Home() {
  const { courses: initialCourses } = (await get(
    "/courses?offset=0"
  )) as Courses;

  const metaLD: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: initialCourses.map((course: Course, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        url: `//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${course.courseCode
          }`,
        name: course.title,
        description: course.description,
        provider: {
          "@type": "CollegeOrUniversity",
          name: "University of New South Wales",
          sameAs: "https://www.unsw.edu.au/",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingCount: course.reviewCount,
          ratingValue: course.reviewCount === 0 ? 0 : course.overallRating,
          bestRating: 5,
        },
        offers: [{
          "@type": "Offer",
          category: "Paid"
        }],
        hasCourseInstance: course.terms.map((term: number) => ({
          "@type": "CourseInstance",
          courseMode: "Blended",
          courseSchedule: {
            "@type": "Schedule",
            repeatCount: term === 0 ? 5 : 10,
            repeatFrequency: "Weekly",
          }
        }))
      }
    })),
  };

  return (
    <div className='mb-20 bg-white dark:bg-slate-800 transition-color duration-150'>
      {/* Landing page graphic */}
      <Image
        src={navbar}
        width={1000}
        height={500}
        alt='landing page graphic'
        layout='responsive'
        priority
      />
      {/* Hero Section */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(metaLD) }}
      />
      <div className='flex flex-row w-full justify-center items-center mt-10'>
        <div className='flex flex-row w-5/6 space-y-0 justify-between items-left md:space-y-4 md:flex-col md:items-center'>
          <div className='flex flex-col w-full gap-3'>
            <p className='drop-shadow-md text-base sm:text-xs'>
              DevSoc presents
            </p>
            <h1 className='justify-center font-bold text-unilectives-blue text-7xl sm:text-4xl'>
              unilectives
            </h1>
            <p className='justify-center font-semibold text-base sm:text-xs'>
              Your one-stop shop for UNSW course and elective reviews.
            </p>
            {/* Sponsors Section */}
            <p className="my-4 sm:text-xs sm:my-1">Proudly sponsored by</p>
            {/* Flex box to hold all sponsors */}
            <div className="flex flex-col justify-evenly items-center bg-[#94B4D1] dark:bg-slate-700 rounded-md h-22 py-1 sm:py-1 duration-150">
              {/* Flex box to hold platinum text and bar */}
              <div className="flex flex-col items-center z-10 relative w-full">
                {/* Platinum text */}
                <p className="font-semibold text-3xl sm:text-lg text-white dark:text-white mt-7 sm:mt-1 tracking-wide z-10 relative">
                  Platinum Tier
                </p>
                {/* <!-- Divider Bar Split Into 3 Sections --> */}
                <div className="absolute bottom-4 sm:bottom-3 md:bottom-4 lg:bottom-4 w-[95%] flex z-0">
                  {/* <!-- Left Section (colored) --> */}
                  <div className="flex-[1] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
                  
                  {/* <!-- Middle Section (transparent) --> */}
                  <div className="sm:flex-[3] md:flex-[2] lg:flex-[1.5] flex-[1] h-[2px] bg-transparent"></div>
                  
                  {/* <!-- Right Section (colored) --> */}
                  <div className="flex-[1] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
                </div>
                
              </div>
              {/* Flex box to hold platinum links */}
              <div className="flex flex-row justify-center items-center space-x-8 mt-7 mb-8">
                <a href="https://www.arista.com" target="_blank" rel="noopener noreferrer" className="w-48 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
                  <Image
                    src={AristaLogo}
                    alt="Arista Logo"
                    layout="intrinsic"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </a>
                <a href="https://www.thetradedesk.com" target="_blank" rel="noopener noreferrer" className="w-60 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
                  <Image
                    src={TheTradeDeskLogo}
                    alt="The Trade Desk Logo"
                    layout="intrinsic"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </a>
              </div>

              {/* Gold Tier */}
              {/* Flex box to hold gold text and bar */}
              <div className="flex flex-col items-center z-10 relative w-full">
                <p className="font-semibold text-2xl sm:text-lg text-white dark:text-white mt-0 tracking-wide">Gold Tier</p>
                  {/* <!-- Divider Bar Split Into 3 Sections --> */}
                  <div className="absolute bottom-4 sm:bottom-3 w-[95%] flex z-0">
                    {/* <!-- Left Section (colored) --> */}
                    <div className="flex-[2] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
                    
                    {/* <!-- Middle Section (transparent) --> */}
                    <div className="flex-[1.5] sm:flex-[3] md:flex-[2] h-[2px] bg-transparent"></div>
                    
                    {/* <!-- Right Section (colored) --> */}
                    <div className="flex-[2] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
                </div>
              </div>
              {/* Flex box to hold gold tier linkss */}
              <div className="flex flex-row justify-center items-center space-x-8 mt-5 mb-5">
                <a href="https://www.janestreet.com" target="_blank" rel="noopener noreferrer" className="w-40 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
                  <Image
                    src={JaneStreetLogo}
                    alt="Jane Street Logo"
                    layout="intrinsic"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </a>
                <a href="https://www.safetyculture.com" target="_blank" rel="noopener noreferrer" className="w-40 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300">
                  <Image
                    src={SafetyCultureLogo}
                    alt="SafetyCulture Logo"
                    layout="intrinsic"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Course Section */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <LandingPageContent initialCourses={initialCourses} />
      </div>
    </div>
  );
}
