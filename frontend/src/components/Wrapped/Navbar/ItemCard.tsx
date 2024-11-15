import React from "react";

// CardProps type definition for TypeScript (if you're using TS)
type CardProps = {
  title: string;
  link: string;
  size?: string;
  isActive?: boolean;
  onClick?: () => void;
};

// Card component definition
export default function ItemCard({ title, link, size = "base", isActive, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className={`block p-6 h-full w-full text-left rounded-lg hover:bg-unilectives-yellow-hover transition-colors cursor-pointer border border-black ${size} ${isActive ? 'bg-black text-white' : ''}`}
    >
      <h1 className="font-bold text-3xl md:text-xl sm:text-lg">{title}</h1>
    </button>
  );
}
