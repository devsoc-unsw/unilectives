import Image from "next/image";
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import navbar from "@/assets/navbar.svg";
import OldSponsorships from "@/components/SponsorshipsSection/Sponsorships";
import { Metadata } from "next";
import { ItemList, WithContext } from "schema-dts";
import { get } from "@/utils/request";
import { Course, Courses } from "@/types/api";
import NewSponsorships from "@/components/SponsorshipsSection/NewSponsorships";
import Header from "./Header";

// Metadata to assist SEO - provies metadata for HTML head section
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Home | Unilectives - UNSW Course Reviews`,
    description: `UNSW course reviews, ratings, and study tips. Unilectives is your one-stop shop for making informed course choices at UNSW.`,
  };
}

export default async function LandingPage() {
  // GET request for all courses
  const { courses: initialCourses } = (await get(
    "/courses?offset=0",
  )) as Courses;

  // Generate metadata to help with SEO (inject via script in return)
  const metaLD: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: initialCourses.map((course: Course, index: number) => ({
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingCount: course.reviewCount,
          ratingValue: course.reviewCount === 0 ? 0 : course.overallRating,
          bestRating: 5,
        },
        offers: [
          {
            "@type": "Offer",
            category: "Paid",
          },
        ],
        hasCourseInstance: course.terms.map((term: number) => ({
          "@type": "CourseInstance",
          courseMode: "Blended",
          courseSchedule: {
            "@type": "Schedule",
            repeatCount: term === 0 ? 5 : 10,
            repeatFrequency: "Weekly",
          },
        })),
      },
    })),
  };

  return (
    <div>
      {/* SCRIPT FOR SEO - do not touch*/}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(metaLD) }}
      />
      {/* Landing page graphic */}
      <Image
        src={navbar}
        width={1000}
        height={500}
        alt="landing page graphic"
        layout="responsive"
        priority
      />
      {/* SECTION 1 - HEADER */}
      <Header />
      {/* SECTION 2 - "OUR FEATURES" */}
      <p> Features section below</p>
      {/* SECTION 3 - "PROUDLY SPONSORED BY" */}
      <p> Sponsors section below</p>
      <NewSponsorships />
      {/* BOTTOM OF PAGE */}
    </div>
  );
}
