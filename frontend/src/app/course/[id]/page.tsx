import DoughnutChart from "@/components/DoughnutChart/DoughnutChart";
import Rating from "@/components/Rating/Rating";
import ReviewSearchbar from "@/components/ReviewSearchBar/ReviewSearchBar";
import ReviewsBar from "@/components/ReviewsBar/ReviewsBar";
import TermsGroup from "@/components/TermsGroup/TermsGroup";
import { authOptions } from "@/lib/auth";
import { Course, Reviews } from "@/types/api";
import { get, validatedReq } from "@/utils/request";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AggregateRating } from "schema-dts";
import waves from "../../../assets/waves.svg";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";

export async function generateMetadata(props: {
  params: {
    [key: string]: string;
  };
}): Promise<Metadata> {
  const { course } = (await get(
    `/course/${props.params.id.toUpperCase()}`
  )) as {
    course: Course;
  };
  return {
    title: `${course.courseCode} | Unilectives - UNSW Course Reviews`,
    description: `Considering ${course.courseCode} at UNSW? Dive into real student reviews giving you unfiltered perspectives on the course. Get the scoop on teaching quality, workload, and more.`,
  };
}

export default async function ReviewPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const { course } = (await get(`/course/${params.id.toUpperCase()}`)) as {
    course: Course;
  };

  if (!course) notFound();

  const { reviews } = (await get(
    `/reviews/${course.courseCode.toUpperCase()}`
  )) as Reviews;

  let userCourseInfo: string[] = [];
  if (session?.user) {
    try {
      const res = (await validatedReq(
        "GET",
        `/user/course/${params.id.toUpperCase()}`,
        session?.user?.accessToken ?? "",
        session?.user?.id ?? ""
      )) as { userCourseInfo: string[] };
      userCourseInfo = res.userCourseInfo;
    } catch (err) {
      signOut();
    }
  }

  // const metaLD: WithContext<AggregateRating> = {
  //   "@context": "https://schema.org",
  //   "@type": "AggregateRating",
  //   ratingCount: course.reviewCount,
  //   ratingValue: course.reviewCount === 0 ? 0 : course.overallRating,
  //   bestRating: 5,
  //   itemReviewed: {
  //     "@type": "Course",
  //     name: course.title,
  //     courseCode: course.courseCode,
  //     description: course.description,
  //     url: `//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${
  //       course.courseCode
  //     }`,
  //     provider: {
  //       "@type": "CollegeOrUniversity",
  //       name: "University of New South Wales",
  //       sameAs: "https://www.unsw.edu.au/",
  //     },
  //   },
  // };

  return (
    <div className='isolate bg-white dark:bg-slate-800 duration-150'>
      {/* Structured data */}
      <Head>
        <script
          {...jsonLdScriptProps<AggregateRating>({
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            ratingCount: course.reviewCount,
            ratingValue: course.reviewCount === 0 ? 0 : course.overallRating,
            bestRating: 5,
            itemReviewed: {
              "@type": "Course",
              name: course.title,
              courseCode: course.courseCode,
              description: course.description,
              url: `//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${
                course.courseCode
              }`,
              provider: {
                "@type": "CollegeOrUniversity",
                name: "University of New South Wales",
                sameAs: "https://www.unsw.edu.au/",
              },
            },
          })}
        />
      </Head>
      {/* Header */}
      <div className='relative'>
        <div className='w-1/2 ml-auto md:w-full pr-16 md:px-8 py-8'>
          {/* Search bar */}
          <ReviewSearchbar />
        </div>
        {/* Waves */}
        <Image
          className='w-full h-full absolute object-cover top-0 -z-10 dark:opacity-75'
          src={waves}
          alt='Waves'
        />
      </div>
      {/* Course details */}
      <div className='flex gap-8 pt-12 px-16 md:px-8 lg:pt-8 md:flex-wrap'>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(metaLD) }}
          /> */}
          <section className='space-y-4 w-full block md:static md:max-h-full sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-scroll scrollbar-none'>
            <h1 className='text-6xl font-bold break-words'>
              {course.courseCode}
            </h1>
            <h2 className='text-3xl font-bold break-words'>{course.title}</h2>
            {/* Terms */}
            <TermsGroup
              className='py-1 px-2 rounded-full bg-unilectives-tags-pink font-bold text-black/50'
              terms={course.terms}
            />
            {/* Link to handbook */}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={`//www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${
                course.courseCode
              }`}
              className='flex items-center w-fit gap-1 text-unilectives-blue hover:underline flex-1'
            >
              <LinkIcon className='w-4 h-4' />
              {course.courseCode} Handbook Page
            </Link>
            {/* StarRating */}
            <div className='space-x-2'>
              <div className='text-2xl inline'>
                <Rating
                  type='star'
                  color='purple'
                  overallRating={course.overallRating}
                />
              </div>
              {/* Number of reviews */}
              <span>
                {/* Format number to their abbreviated string e.g 1000 to 1k, or 1000000 to 1M */}
                {course.reviewCount
                  ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(course.reviewCount)
                  : 0}{" "}
                reviews
              </span>
            </div>
            {/* Doughnut Charts */}
            <div className='flex flex-wrap justify-around'>
              {[
                { metric: course.enjoyability, title: "Enjoyment" },
                { metric: course.usefulness, title: "Usefulness" },
                { metric: course.manageability, title: "Manageability" },
              ].map((item, index) => (
                <div key={index}>
                  <DoughnutChart
                    overallRating={item.metric}
                    width={90}
                    strokeWidth={9}
                  />
                  <p className='text-center font-bold'>{item.title}</p>
                </div>
              ))}
            </div>
            {/* Pre-requisites group */}
            {course.enrolmentRules ? (
              <div>
                <h3 className='font-bold'>Enrolment Rules</h3>
                <p>{course.enrolmentRules}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <h3 className='font-bold'>Description</h3>
              <p className='whitespace-pre-line'>{course.description}</p>
            </div>
          </section>
        </Suspense>
        {/* Reviews */}
        {/* Show reviews is separated as another client component "ReviewsBar"
        so the review page can stay as a server side component to ensure server side
        rendering */}
        <section className='space-y-4 w-full mb-8'>
          <Suspense fallback={<div>Loading...</div>}>
            <ReviewsBar
              courseCode={course.courseCode}
              reviews={reviews}
              bookmarkedReviews={userCourseInfo}
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
