import JaneStreetLogo from "@/assets/janestreet.svg";
import SafetyCultureLogo from "@/assets/sc.png";
import AristaLogo from "@/assets/arista.png";
import TheTradeDeskLogo from "@/assets/thetradedesk.png";
import Image from "next/image";

export default function NewSponsorships() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-5xl">Proudly Sponsored By</p>
      {/* Sponsor Tiers */}
      <div className="pt-7">
        <p>Platinum Tier Sponsors</p>
        <hr />

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

        {/* Gold Tier Sponsors */}
        <div>
          <p>Gold Tier Sponsors</p>
          <hr />

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
      </div>
    </div>
  );
}