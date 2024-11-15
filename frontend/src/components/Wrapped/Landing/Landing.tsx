// import grid from "../../../assets/grid.png";
import downIcon from "../../../../public/wrapped-chevrons-down.svg";
import year from "../../../../public/wrapped-year.svg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Navbar from "@/components/Wrapped/Navbar/Navbar";

export default function Landing() {
  useGSAP(() => {
    gsap.to(".scroll-down-element", {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    gsap.to(".year-bg", {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-between bg-unilectives-blue bg-blend-color-burn bg-[url('@../../../../public/wrapped-grid-bg.png')] bg-repeat">
      {/* <GridLines
        className="grid-area"
        cellWidth={60}
        strokeWidth={2}
        cellWidth2={12}
      >
        <h1>Gridlines demo</h1>
      </GridLines> */}
      <Navbar
        landingInView={true}
        popularInView={false}
        ratedInView={false}
        reviewInView={false}
        peopleInView={false}
        industryInView={false}
        wamInView={false}
        summaryInView={false}
      />
      <div className="flex flex-row h-full items-center justify-center">
        {/* TODO this text is either responsive / wrong size */}
        <div className="flex-col">
          <p className="text-8xl font-extrabold !text-white">UNILECTIVES</p>
          <p className="text-8xl font-extrabold !text-white">WRAPPED</p>
          <div className="bg-unilectives-wrapped-purple px-6 py-3 rounded-full w-fit mt-2">
            <p className="text-xl font-bold !text-white">DEVSOC PRESENTS</p>
          </div>
        </div>
        <div className="flex items-center justify-center ml-[-100px] mb-[-50px]">
          <Image
            className="year-bg w-[200px] h-[200px]"
            src={year}
            alt="year"
          />
          <p className="absolute text-2xl !text-black font-extrabold">2024</p>
        </div>
      </div>
      {/* idk if position: absolute is bad practice */}
      <div className=" scroll-down-element flex items-center mb-20">
        <Image className="w-[40px] h-[40px]" src={downIcon} alt="Scroll Down" />
        <p className="text-xl font-bold ml-2.5 !text-white">Scroll Down</p>
      </div>
    </div>
  );
}
