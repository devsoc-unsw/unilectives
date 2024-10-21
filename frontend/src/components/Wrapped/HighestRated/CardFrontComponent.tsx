import Image from "next/image";
import CardDeath from "@/assets/highest-rated-card-death.svg";
import CardStar from "@/assets/highest-rated-card-star.svg";

type Course = {
  code: string;
  name: string;
};

const PositionedText = ({
  course,
  position,
  rotation,
  textColor
}: {
  course: Course;
  position: string;
  rotation: string;
  textColor: string;
}) => {
  return (
    <div className={`absolute ${position} p-4 transform ${rotation} no-select`}>
      <h1 className={`${textColor} font-zendots font-normal text-left text-[24px]`}>
        {course.code}
      </h1>
      <h2 className={`${textColor} font-zendots font-normal text-left text-[16px]`}>
        {course.name}
      </h2>
    </div>
  );
};

export default function CardFrontComponent({course, designType,}: { course: Course; designType: 'death' | 'star'; }) {
  const cardImage = designType === 'death' ? CardDeath : CardStar;
  const textColor = designType === 'death' ? 'text-unilectives-wrapped-purple' : 'text-white';
  return (
    <div className="relative w-[418px] h-[753px]">
      <Image 
        src={cardImage} 
        alt="Highest Rated Course Card Front" 
        className="w-full h-full object-cover" 
        priority 
      />
      <PositionedText course={course} position="bottom-2 left-3" rotation="none" textColor={textColor} />
      <PositionedText course={course} position="top-2 right-3" rotation="rotate-180" textColor={textColor} />
    </div>
  );
}