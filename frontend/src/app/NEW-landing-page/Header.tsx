import UnilectivesLogo from "@/assets/unilectives-logo.png";
import Image from "next/image";
export default function Header() {
  return (
    <div className="flex flex-row w-full justify-center items-center mt-8 pb-16 bg-gradient-to-b lg:px-10">
      <div className="flex flex-row max-w-5xl space-y-0 justify-center items-center gap-20 md:gap-10 lg:gap-15">
        <div className="flex flex-col w-full gap-3">
          <p className="drop-shadow-md text-base sm:text-sm">DevSoc presents</p>
          <h1 className="justify-center font-bold text-unilectives-blue text-8xl sm:text-4xl md:text-6xl lg:text-7xl">
            unilectives
          </h1>
          <p className="justify-center font-[450] text-3xl sm:text-md md:text-xl lg:text-2xl">
            Your one-stop shop for UNSW course and elective reviews.
          </p>
          <a href="/NEW-course-library-page">
            <button className="inline-flex w-fit transition-all duration-500 ease-in-out hover:-translate-y-1 items-center mt-10 gap-1 px-8 py-2 bg-unilectives-icon dark:bg-unilectives-icon/85 dark:hover:bg-unilectives-icon/80 text-white rounded-md hover:bg-unilectives-icon/95">
              Explore courses
            </button>
          </a>
        </div>
        <Image
          className="w-80 sm:w-32 md:w-48 lg:w-64"
          src={UnilectivesLogo}
          alt="Unilectives Logo"
        />
      </div>
    </div>
  );
}
