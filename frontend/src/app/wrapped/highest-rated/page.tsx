"use client"

import { useState } from 'react';
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

  const placeholderCourses = [
    { code: 'COMP3981', name: 'Extended Operating Systems' },
    { code: 'COMP1511', name: 'Programming Fundamentals' },
    { code: 'COMP1511', name: 'Programming Fundamentals' },
  ];

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
            {placeholderCourses.map((course, index) => (
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