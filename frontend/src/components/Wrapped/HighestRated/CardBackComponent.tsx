import Image from "next/image";
import CardBack from "@/assets/highest-rated-card-back.svg";

export default function CardBackComponent({ termNum }: { termNum: string }) {
  return (
    <div className="relative w-[418px] h-[753px]">
      <Image 
        src={CardBack} 
        alt="Highest Rated Course Card Back" 
        className="w-full h-full object-cover" 
        priority 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-unilectives-yellow font-daysone text-[64px] font-normal uppercase">
          Term {termNum}
        </h1>
      </div>
    </div>
  );
}
