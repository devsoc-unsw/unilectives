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
            <div className="flex flex-col justify-evenly items-center bg-[#94B4D1] dark:bg-slate-700 rounded-md h-22 py-3 sm:py-5 duration-150">
              {/* Platinum Tier */}
              <p className="font-bold text-2xl sm:text-lg text-white dark:text-white">Platinum Tier</p>
              <div className="flex flex-row justify-center items-center space-x-8 my-4">
                <div className="w-40 h-32 relative md:w-36 sm:w-24">
                  <Image
                    src={AristaLogo}
                    alt="Arista Logo"
                    layout="fill"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </div>
                <div className="w-40 h-32 relative md:w-36 sm:w-24">
                  <Image
                    src={TheTradeDeskLogo}
                    alt="The Trade Desk Logo"
                    layout="fill"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </div>
              </div>

              {/* Gold Tier */}
              <p className="font-bold text-2xl sm:text-lg text-white dark:text-white mt-6">Gold Tier</p>
              <div className="flex flex-row justify-center items-center space-x-8 my-4">
                <div className="w-40 h-32 relative md:w-36 sm:w-24">
                  <Image
                    src={JaneStreetLogo}
                    alt="Jane Street Logo"
                    layout="fill"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </div>
                <div className="w-40 h-32 relative md:w-36 sm:w-24">
                  <Image
                    src={SafetyCultureLogo}
                    alt="SafetyCulture Logo"
                    layout="fill"
                    objectFit="contain"
                    className="dark:filter"
                  />
                </div>
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
