import JaneStreetLogo from "@/assets/jane-street-logo.svg";
import TheTradeDeskLogo from "@/assets/thetradedesk.png";
import TheTradeDeskLogoDark from "@/assets/the-trade-desk-dark.svg";
import LyraBlackLogo from "@/assets/lyra_black.svg";
import LyraWhiteLogo from "@/assets/lyra_white.svg";
import AristaLogo from "@/assets/arista.png";
import AirwallexLogo from "@/assets/airwallex.png";
import Image from "next/image";
import React from "react";

interface SponsorProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

const PlatinumSponsor: React.FC<SponsorProps> = ({ href, ariaLabel, children, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center h-16 hover:transform hover:translate-y-[-5px] transition-transform duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

const GoldSponsor: React.FC<SponsorProps> = ({ href, ariaLabel, children, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center h-10 w-36 hover:transform hover:translate-y-[-5px] transition-transform duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default function NewSponsorships() {
  return (
    <div className="flex flex-col items-center justify-center mt-0">
      <p className="text-4xl font-medium">Proudly Sponsored By</p>
      {/* Sponsor Tiers */}
      <div className="pt-7 w-full">
        <div className="text-center">
          <p>Platinum Tier Sponsors</p>
          <hr className="border-black dark:border-white w-1/2 mx-auto" />
        </div>

        {/* Platinum Sponsors Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8 mb-8 px-3">
          <PlatinumSponsor href="https://www.janestreet.com" ariaLabel="Jane Street" className="h-28 w-64">
            <Image
              src={JaneStreetLogo}
              alt="Jane Street Logo"
              layout="fill"
              objectFit="contain"
              className="dark:invert"
            />
          </PlatinumSponsor>
          <PlatinumSponsor href="https://www.thetradedesk.com" ariaLabel="The Trade Desk" className="w-64">
            <Image
              src={TheTradeDeskLogo}
              alt="The Trade Desk Logo"
              layout="fill"
              objectFit="contain"
              className="hidden dark:block"
            />
            <Image
              src={TheTradeDeskLogoDark}
              alt="The Trade Desk Logo"
              layout="fill"
              objectFit="contain"
              className="dark:hidden"
            />
          </PlatinumSponsor>
          <PlatinumSponsor href="https://www.lyra.com" ariaLabel="Lyra" className="w-64">
            <Image
              src={LyraWhiteLogo}
              alt="Lyra Logo"
              layout="fill"
              objectFit="contain"
              className="hidden dark:block"
            />
            <Image
              src={LyraBlackLogo}
              alt="Lyra Logo"
              layout="fill"
              objectFit="contain"
              className="dark:hidden"
            />
          </PlatinumSponsor>
        </div>

        {/* Gold Tier Sponsors */}
        <div className="text-center">
          <p>Gold Tier Sponsors</p>
          <hr className="border-black dark:border-white w-1/2 mx-auto" />
        </div>

        {/* Gold Sponsors Links */}
        <div className="flex flex-wrap justify-center items-center gap-40 mt-7 mb-5 px-3">
          <GoldSponsor href="https://www.arista.com" ariaLabel="Arista">
            <Image
              src={AristaLogo}
              alt="Arista Logo"
              layout="fill"
              objectFit="contain"
              className="invert dark:invert-0"
            />
          </GoldSponsor>
          <GoldSponsor href="https://www.airwallex.com" ariaLabel="Airwallex">
            <Image
              src={AirwallexLogo}
              alt="Airwallex Logo"
              layout="fill"
              objectFit="contain"
            />
          </GoldSponsor>
        </div>
      </div>
    </div>
  );
}
