import Image from "next/image";
import feature_box_one from "../../assets/features/feature_box_one.svg"
import feature_box_two from "../../assets/features/feature_box_two.svg"
import feature_box_three from "../../assets/features/feature_box_three.svg"



export default function Features() {
  return (
    <div className="bg-[#EDEEEF] py-16 font-roboto bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-normal text-center mb-12 ">Our Features</h2>

        <div className="flex flex-row md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <Image
                src={feature_box_one}
                alt="Comprehensive Course Reviews"
                width={398}
                height={488}
                className="mb-4"
              />
          </div>

          {/* Feature Box 2 (Using responsive Tailwind classes) */}
          <div className="flex-1">
            <Image
                src={feature_box_two}
                alt="Feature Box 2"
                width={398}
                height={488}
                className="mb-4"
              />

          </div>

          {/* Feature Box 3 (Using responsive Tailwind classes) */}
          <div className="flex-1">
          <Image
                src={feature_box_three}
                alt="Feature Box 2"
                width={398}
                height={488}
                className="mb-4"
              />
          </div>
        </div>
      </div>
    </div>
  );
}