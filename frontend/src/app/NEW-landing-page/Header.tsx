import UnilectivesLogo from "@/assets/unilectives-logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row w-full justify-center items-center pb-3 bg-gradient-to-b lg:px-10">
      <div
        className="flex flex-row max-w-5xl justify-center items-center gap-20 md:gap-10 lg:gap-15
                      px-4 sm:px-2"
      >
        {/* Left side text */}
        <div className="flex flex-col w-full gap-3">
          <p className="drop-shadow-md text-base sm:text-sm xs:text-xs">
            DevSoc presents
          </p>

          {/* Smaller size on very small screens */}
          <h1
            className="font-bold text-unilectives-blue
                        text-8xl sm:text-4xl md:text-6xl lg:text-7xl 
                        xs:text-3xl leading-none"
          >
            unilectives
          </h1>

          <p className="font-[450] text-3xl sm:text-md md:text-xl lg:text-2xl xs:text-base">
            Your one-stop shop for UNSW course reviews.
          </p>

          <a href="/NEW-course-library-page">
            <button
              className="bounce-every-10s inline-flex w-fit transition-all duration-500 
                              hover:-translate-y-1 items-center mt-6 
                              gap-1 px-8 py-2 xs:px-5 xs:py-1.5 
                              bg-unilectives-icon dark:bg-unilectives-icon/85 
                              dark:hover:bg-unilectives-icon/80 text-white rounded-md 
                              hover:bg-unilectives-icon/95"
            >
              Explore courses
            </button>
          </a>
        </div>

        {/* Hide the logo on small screens */}
        <Image
          className="w-80 sm:w-32 md:w-48 lg:w-64 xs:hidden"
          src={UnilectivesLogo}
          alt="Unilectives Logo"
        />
      </div>
    </div>
  );
}
