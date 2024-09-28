import React from "react";

// CardProps type definition for TypeScript (if you're using TS)
type CardProps = {
  title: string;
  link: string;
  size?: string;
};

// Card component definition
export default function ItemCard({ title, link, size = "base" }: CardProps) {
  return (
    <button
      className={`block p-6 h-full w-full text-left rounded-lg hover:bg-black hover:text-white transition-colors cursor-pointer border border-black ${size}`}
    >
      <h1 className="font-bold text-3xl">{title}</h1>
    </button>
  );
}
