
import JaneStreetLogo from "@/assets/janestreet.svg";
import TikTokLogo from "@/assets/tiktok-logo.svg";
import SafetyCultureLogo from "@/assets/sc.png";
import AristaLogo from "@/assets/arista.png";
import TheTradeDeskLogo from "@/assets/thetradedesk.png";
import Image from "next/image";

export default function Sponsorships() {
  return (
    <>
      <p className="my-4 sm:text-xs sm:my-1">Proudly sponsored by</p>

      <div className="flex flex-col justify-evenly items-center bg-[#94B4D1] dark:bg-slate-700 rounded-md h-22 py-1 sm:py-1 duration-150 z-5">
        {/* Platinum Tier */}
        <div className="flex flex-col items-center z-5 relative w-full">
          <p className="font-semibold text-3xl sm:text-lg text-white dark:text-white mt-7 sm:mt-1 tracking-wide z-5 relative">
            Platinum Tier
          </p>

          <div className="absolute bottom-4 sm:bottom-3 md:bottom-4 lg:bottom-4 w-[95%] flex z-5">
            <div className="flex-[1] sm:h-[1px] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
            <div className="sm:flex-[3] sm:h-[1px] md:flex-[2] lg:flex-[1.5] flex-[0.9] h-[2px] bg-transparent"></div>
            <div className="flex-[1] sm:h-[1px] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
          </div>
        </div>

        {/* Platinum Sponsors Links */}
        <div className="flex flex-row justify-center items-center sm:space-x-8 md:space-x-12 lg:space-x-20 space-x-24 mt-7 mb-8 z-5">
          <a href="https://www.arista.com" target="_blank" rel="noopener noreferrer" className="w-48 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300" aria-label="Arista">
            <Image
              src={AristaLogo}
              alt="Arista Logo"
              layout="intrinsic"
              objectFit="contain"
              className="dark:filter"
            />
          </a>
          <a href="https://www.thetradedesk.com" target="_blank" rel="noopener noreferrer" className="w-60 relative md:w-36 sm:w-24 hover:transform hover:translate-y-[-5px] transition-transform duration-300" aria-label="The Trade Desk">
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
        <div className="flex flex-col items-center z-5 relative w-full">
          <p className="font-semibold text-2xl sm:text-lg text-white dark:text-white mt-0 tracking-wide">Gold Tier</p>
          <div className="absolute bottom-4 sm:bottom-3 w-[95%] flex z-0">
            <div className="flex-[2] sm:h-[1px] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
            <div className="flex-[1.5] sm:h-[1px] sm:flex-[3] md:flex-[2] h-[2px] bg-transparent"></div>
            <div className="flex-[2] sm:h-[1px] h-[2px] bg-[#D1E8FF] dark:bg-slate-500"></div>
          </div>
        </div>

        {/* Gold Sponsors Links */}
        <div className="flex flex-row justify-center items-center space-x-8 mt-5 mb-5 z-5">
          <a href="https://www.janestreet.com" target="_blank" rel="noopener noreferrer" className="w-40 relative md:w-36 sm:w-20 hover:transform hover:translate-y-[-5px] transition-transform duration-300" aria-label="Jane Street">
            <Image
              src={JaneStreetLogo}
              alt="Jane Street Logo"
              layout="intrinsic"
              objectFit="contain"
              className="dark:filter"
            />
          </a>
          <a href="https://www.safetyculture.com" target="_blank" rel="noopener noreferrer" className="w-40 relative md:w-36 sm:w-20 hover:transform hover:translate-y-[-5px] transition-transform duration-300" aria-label="Safety Culture">
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
    </>
  )
}
