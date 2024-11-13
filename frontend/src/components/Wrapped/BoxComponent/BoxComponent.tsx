import { StarIcon } from "./StarIcon";

export default function BoxComponent({
  title,
  rating,
  textColor = "text-unilectives-white",
  borderColor = "border-unilectives-white",
}: {
  title: string;
  rating: string;
  textColor?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={`col-span-1 row-span-1 border rounded-lg text-center ${borderColor} ${textColor}`}
    >
      <div
        className={`border-[0.5px] border-dashed m-5 p-5 rounded-lg ${borderColor} ${textColor}`}
      >
        <div
          className={`text-8xl font-bold font-inter flex items-center gap-3 justify-center tracking-wide mb-5 ${textColor}`}
        >
          {rating}
          <StarIcon className={`w-20 h-20 ${textColor}`} />
        </div>
        <h1
          className={`text-3xl font-medium font-neuemetana uppercase ${textColor}`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}

