"use client";

import Image from "next/image";
import icon from "../../assets/icon.png";
import waves from "../../assets/waves.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent } from "react";

type SearchbarEventTarget = EventTarget & {
  query: {
    value: string;
  };
};

export default function Review() {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as SearchbarEventTarget;
    console.log("Submitted with: ", target.query.value);
  };
  return (
    <>
      {/* Header */}
      <div className="relative isolate">
        <div className="flex flex-wrap justify-between gap-4 mx-16 md:mx-8 sm:mx-4 py-8">
          {/* Icon */}
          <div className="flex items-center gap-2">
            <Image className="w-12" src={icon} alt="Uni-lectives" />
            <h1 className="font-bold text-2xl text-unilectives-icon">
              Uni-lectives
            </h1>
          </div>
          {/* Search bar */}
          <form
            className="flex items-center gap-1 border border-black text-black rounded-2xl px-5 py-2 shadow-md w-1/2 xs:w-full"
            name="review-search-bar"
            onSubmit={handleOnSubmit}
          >
            {/* Search icon */}
            <button type="submit">
              <MagnifyingGlassIcon className="w-5 h-5 bg-transparent" />
            </button>
            {/* Input */}
            <input
              type="text"
              name="query"
              title="Search here..."
              placeholder="Search here..."
              className="w-full outline-none bg-transparent placeholder:text-black"
            />
          </form>
        </div>
        <Image
          className="w-full absolute top-0 -z-10"
          src={waves}
          alt="Waves"
        />
      </div>
    </>
  );
}
