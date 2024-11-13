"use client"

import { useEffect, useState } from 'react';
import { get } from "@/utils/request";
import CardBackComponent from "@/components/Wrapped/HighestRated/CardBackComponent";
import PageTransition from '@/components/Wrapped/Transition/DefaultTransition';
import Navbar from "@/components/Wrapped/Navbar/Navbar"
import CardFrontComponent from "@/components/Wrapped/HighestRated/CardFrontComponent";

const Card = ({ index, course, flipped, onFlip }: {
  index: number;
  course: { code: string; name: string; };
  flipped: boolean;
  onFlip: (index: number) => void;
}) => (
  <div onClick={() => onFlip(index)} className={`relative cursor-pointer ${flipped ? 'flipped' : ''}`}>
    {!flipped ? (
      <CardBackComponent termNum={`${index + 1}`} />
    ) : (
      <CardFrontComponent course={{ code: course.code, name: course.name }} designType={index + 1 == 1 ? "death" : "star"} />
    )}
  </div>
);

export default function HighestRated() {

  const [highestRatedCourses, setHighestRatedCourses] = useState<{ code: string, name: string }[]>([]);
  
  useEffect(() => {
    async function fetchHighestRated(term: string) {
      try {
        const response = await get(`/wrapped/course/highest-rated/${term}`);
        const courseCode = response.courseCode;
        const courseDetails = await get(`/course/${courseCode}`)
        return {
          code: courseCode,
          name: courseDetails.course.title
        };
      } catch (error) {
        console.error(`Error fetching highest-rated course for term ${term}:`, error);
        return null;
      }
    }

    async function fetchCourses() {
      const terms = ['1', '2', '3'];

      for (const term of terms) {
        const result = await fetchHighestRated(term);
        if (result) {
          setHighestRatedCourses((prevCourses) => [...prevCourses, result]);
        }
      }
    }
    fetchCourses();
  }, []);

  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  const handleFlip = (index: number) => {
    setFlippedCards(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <PageTransition>
      <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-unilectives-pink bg-blend-color-burn">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex items-center justify-between w-[1320px]">
            {highestRatedCourses.map((course, index) => (
                <Card 
                  key={index} 
                  index={index} 
                  course={course} 
                  flipped={flippedCards[index]} 
                  onFlip={handleFlip} 
                />
              ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}