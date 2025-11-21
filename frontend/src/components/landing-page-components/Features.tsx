"use client";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import feature_box_one from "../../assets/features/feature_box_one.svg";
import feature_box_two from "../../assets/features/feature_box_two.svg";
import feature_box_three from "../../assets/features/feature_box_three.svg";
import Star from "@/assets/star.png";
import Account from "@/assets/account.png";
import Comment from "@/assets/comment.png";
import { ReactNode } from "react";

interface FeatureBoxProps {
  title: string;
  description: string;
  image: StaticImageData; // new prop for the image
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
  title,
  description,
  image,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showImage = windowWidth > 645;

  return (
    <div
      className="
        flex flex-col p-6 bg-[#EDEEEF] dark:bg-[#263245]
        shadow-md hover:shadow-lg transition-shadow duration-300
        border-l-2 border-blue-400 dark:border-blue-600
        w-[300px] h-[250px]
        sm:w-[260px] sm:h-[200px]
        md:w-[280px] md:h-[220px]
      "
    >
      {showImage && (
        <div className="mb-4">
          <Image src={image} alt={title} className="w-12 h-12 object-contain" />
        </div>
      )}

      {/* Text */}
      <h3
        className="
          font-extrabold text-unilectives-blue dark:text-white mb-2
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-700 dark:text-gray-300
        "
      >
        {description}
      </p>
    </div>
  );
};

export default function Features() {
  return (
    <div className="flex flex-col items-center mt-0 mb-0 w-full mb-10">
      <h2 className="text-3xl font-bold text-center mb-8 mt-5">Our Features</h2>

      <div className="flex flex-row md:flex-col justify-center items-center gap-8 w-full px-4">
        <FeatureBox
          title="Comprehensive Course Reviews"
          description="Real student insights on difficulty, enjoyment, and teaching quality—all in one place."
          image={Star}
        />
        <FeatureBox
          title="Review Courses"
          description="Share your experience to help fellow students make smarter study choices."
          image={Comment}
        />
        <FeatureBox
          title="Your Account"
          description="Save reviews and personalise your experience."
          image={Account}
        />
      </div>
    </div>
  );
}
