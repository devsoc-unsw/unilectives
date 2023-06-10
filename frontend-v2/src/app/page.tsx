import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/api";
import Link from "next/link";

const getCourse = async () => {
	// TODO: change url and migrate to common fetcher
	const response = await fetch(`http://localhost:3030/api/v1/courses`, {
		method: "GET",
		next: {
			revalidate: 10,
		},
	});
	if (!response.ok) return;
	const res = await response.json();
	return res.courses;
};

export default async function Home() {
	const courses = await getCourse();
	return (
		<div className="mb-20">
			{/* Navbar */}
			<div className="flex">
				<Image
					src="navbar.svg"
					width={1000}
					height={500}
					alt="landing page graphic"
					layout="responsive"
					priority
				/>
			</div>
			{/* Hero Section */}
			<div className="flex flex-row w-full justify-center items-center mt-10">
				<div className="flex flex-col w-5/6 space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
					<div className="flex flex-col w-full md:w-2/3 gap-3">
						<p className="drop-shadow-md text-xs sm:text-base">
							CSESoc presents
						</p>
						<p className="justify-center font-bold text-unilectives-blue text-4xl sm:text-7xl">
							uni-lectives
						</p>
						<p className="justify-center font-semibold text-xs sm:text-base">
							Your one-stop shop for UNSW course and elective reviews.
						</p>
					</div>
					<div className="flex items-center">
						<button className="px-2 py-2 lg:px-5 lg:py-3 rounded-lg bg-unilectives-button">
							<p className="whitespace-no-wrap items-center drop-shadow justify-center text-white text-xs sm:text-base">
								Add a Review
							</p>
						</button>
					</div>
				</div>
			</div>
			{/* Course Section */}
			<div className="flex flex-col justify-center items-center mt-10">
				<SearchBar />
				{/* Course cards */}
				<div className="grid grid-rows-1 grid-cols-1 lg:grid-rows-3 lg:grid-cols-3 gap-12 mt-10 w-5/6 items-center">
					{courses.length == 0 ? (
						<p className="text-sm text-gray-800">No courses found</p>
					) : (
						courses.map((c: Course, index: number) => (
							<Link href={`/course/${c.courseCode}`} key={index}>
								<CourseCard
									name={c.title}
									code={c.courseCode}
									rating={c.rating}
									numReviews={c.reviewCount}
									terms={c.terms}
								/>
							</Link>
						))
					)}
				</div>
				{/* TODO: Pagination / scrollbar */}
			</div>
		</div>
	);
}
