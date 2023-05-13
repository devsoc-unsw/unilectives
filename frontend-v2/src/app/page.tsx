'use client'
import React, { use, useState, useEffect } from 'react';
import getAllCourses from '../../lib/getAllCourses';
import { Content } from './style';
import CourseCard from '@/components/CourseCard';
import { Listbox } from '@headlessui/react';

const reviewProperties = [
  "Most Reviews", "Most Enjoyable", "Most Useful", "Most Managable", "Highest Rated"
]

const faculties = [
  "Arts",
  "Business",
  "Engineering",
  "Law",
  "Medicine",
  "Science",
  "UNSW Canberra",
];

const terms = [
  "Term 1", "Term 2", "Term 3"
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>(reviewProperties[0]);
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  
  // Retrieve the courses with useEffect (which has a callback)
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    getAllCourses().then(setCourses);
  }, [])

  // const courses=[
  //   {faculty: "Arts",
  //   name: "LOLOL",
  //   code: "HULULU",
  //   terms: ["Term 1", "Term 2"],
  //   rating: 3, // same as overallRating
  //   reviewCount: 3,
  //   overallRating: 3,
  //   manageability: 3,
  //   usefulness: 3,
  //   enjoyability: 3,},
  //   {faculty: "Arts",
  //   name: "XDDD!!!",
  //   code: "so close to done",
  //   terms: ["Term 1", "Term 2"],
  //   rating: 4, // same as overallRating
  //   reviewCount: 4,
  //   overallRating: 4,
  //   manageability: 4,
  //   usefulness: 4,
  //   enjoyability: 4,},
  //   {faculty: "Engineering",
  //   name: "Never Do Frontend",
  //   terms: ["Term 1", "Term 2"],
  //   code: "HAXD1011",
  //   rating: 3, // same as overallRating
  //   reviewCount: 3,
  //   overallRating: 3,
  //   manageability: 3,
  //   usefulness: 3,
  //   enjoyability: 3,},
  //   {faculty: "Engineering",
  //   name: "StanIU",
  //   terms: ["Term 1", "Term 2", "Term 3"],
  //   code: "SLAY9622",
  //   rating: 4, // same as overallRating
  //   reviewCount: 4,
  //   overallRating: 4,
  //   manageability: 4,
  //   usefulness: 4,
  //   enjoyability: 18,},
  // ]

  const SievedCourses = courses
  .filter(course => {
    // Filter faculty
    if (selectedFaculties.length === 0) return true;
    return selectedFaculties.some((faculty) => course.faculty.includes(faculty));
  })
  .filter(course => {
    // Filter term
    if (selectedTerms.length === 0) return true;
    return selectedTerms.some((term) => course.terms.includes(Number((term.slice(-1)))));
  })
  .filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    )
  .sort((a, b) => {
    // Apply sorting
    if (selectedReviewFilter === "Most Reviews") {
      return b.reviewCount - a.reviewCount;
    } else if (selectedReviewFilter === "Most Enjoyable") {
      return b.enjoyability - a.enjoyability;
    } else if (selectedReviewFilter === "Most Useful") {
      return b.usefulness - a.usefulness;
    } else if (selectedReviewFilter === "Most Manageable") {
      return b.manageability - a.manageability;
    } else if (selectedReviewFilter === "Highest Rated") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  return (
    <Content>
      {/* Logo */}
      <div className="flex">
        <img className="pt-[1rem] pl-[5rem]" src="/images/uni-lectives.svg" />
      </div>
      {/* HomeText */}
      <div className="flex flex-row justify-between">
        <div className="justify-center items-center pl-0 w-full pt-standard">
          <div className="flex flex-row w-full justify-between gap-[10px] mt-[8em]">
            <div className="flex flex-col gap-[10px] ml-[18em]">
              <p className="whitespace-no-wrap items-center justify-center drop-shadow-md italic font-lato">
                CSESoc presents
              </p>
              <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold text-7xl text-unilectives-blue">
                uni-lectives
              </p>
              <p className="whitespace-no-wrap items-center justify-center font-poppins font-bold">
                Your one-stop shop for UNSW course and elective reviews.
              </p>
            </div>
            <div className="flex flex-row gap-px items-center justify-center mr-[18em]">
              <button className="px-[28px] py-[13px] rounded-3xl bg-unilectives-blue1 hover:bg-unilectives-blue2 hover:scale-[0.98]">
                <p className="whitespace-no-wrap items-center drop-shadow justify-center font-lato text-white font-semibold">
                  Add a Review
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Searchbar and Courses Container... Parent */}
      <div className="flex flex-col space-between">
        {/* Searchbar... Child 1 of a shared state*/}
        <div className="flex overflow-hidden flex-row mt-[2em] ml-[18em] mr-[18em] rounded-xl border-2 border-unilectives-blue">
          <section className="flex flex-row space-between w-full h-10">
            <span className="w-[3em] h-[3em]">
              <img className="p-[0.9em]" src="/images/search-icon.svg" />
            </span>
            <input type="text" className="w-full h-full bg-slate-0 placeholder:italic placeholder-unilectives-blue focus:outline-none"
              placeholder="Search for a course e.g. COMP1511" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
          </section>
        </div>
        {/* Sort and Filter Options... Child 2 of a separate shared state */}
        <SortFilterOptions
          selectedReviewState={selectedReviewFilter}
          setReviewState={setSelectedReviewFilter}
          selectedFacultiesState={selectedFaculties}
          setFacultiesState={setSelectedFaculties}
          selectedTermsState={selectedTerms}
          setTermsState={setSelectedTerms}
        />
        {/* Filter Bubbles */}
        <div className="flex justify-start ml-[18em] mr-[18em] gap-[3px] mt-[1em]">
          {selectedFaculties?.map((faculty) => (
            <FilterBubble colour="bg-blue-500" filter={faculty} state={selectedFaculties} setState={setSelectedFaculties} />
          ))}
          {selectedTerms?.map((term) => (
            <FilterBubble colour="bg-blue-300" filter={term} state={selectedTerms} setState={setSelectedTerms}/>
          ))}
        </div>
        {/* Course Cards */}
        <div className="grid grid-cols-responsive-cards gap-4 pl-[18em] pr-[18em] mt-[2em]">
            {SievedCourses?.map(course => (
              <CourseCard code={course.courseCode} name={course.title} rating={course.rating} numReviews={course.reviewCount} />
            ))}
        </div>
      </div>
      <div className="flex w-full justify-center content-center">
        <img className="drop-shadow-xl h-[4em] w-[6em] mt-[5em]" src="/images/down_arrow.svg" />
      </div>
    </Content>
  );
}

//  Abstracted components and partials

type FilterBubbleProps = {
  colour: string,
  filter: string,
  state: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>
}

function FilterBubble({colour, filter, state, setState}: FilterBubbleProps) {
  return (
    <div className={`flex flex-row content-center justify-center relative rounded-full py-1.5 px-4 ${colour} gap-[10px]`}>
      {filter}
      <button type="button" className="h-[8px] w-[8px] hover:scale-[1.]" onClick={() => setState(state.filter(option => option != filter))}>
        <img className="object-scale-down h-[1.5em] w-[10px]" src="/images/x.svg" />
      </button>
    </div>
  )
}

type SortFilterOptionsProps = {
  selectedReviewState: string,
  setReviewState: React.Dispatch<React.SetStateAction<string>>,
  selectedFacultiesState: string[],
  setFacultiesState: React.Dispatch<React.SetStateAction<string[]>>,
  selectedTermsState: string[],
  setTermsState: React.Dispatch<React.SetStateAction<string[]>>
}

function SortFilterOptions({selectedReviewState, setReviewState, selectedFacultiesState, setFacultiesState, selectedTermsState, setTermsState}: SortFilterOptionsProps) {
  return (
    <div className="flex flex-row justify-between mt-[0.5em] mx-[21em]">
      <DropboxSingle
            text="Sort by:"
            stateSelected={selectedReviewState}
            stateSelectedSetter={setReviewState}
            stateArray={reviewProperties}
      />
      <div className="flex flex-row space-between gap-[2em]">
        <DropboxMultiple
              text="Filter by:"
              stateText="Faculty"
              stateSelected={selectedFacultiesState}
              stateSelectedSetter={setFacultiesState}
              stateArray={faculties}
        />
        <DropboxMultiple
              stateText="Term"
              stateSelected={selectedTermsState}
              stateSelectedSetter={setTermsState}
              stateArray={terms}
        />
      </div>
    </div>
  )
}

type DropboxPropsSingle = {
  text?: string
  stateSelected: string,
  stateSelectedSetter: React.Dispatch<React.SetStateAction<string>>,
  stateArray: string[],
}

type DropboxPropsMultiple = {
  text?: string,
  stateText: 'Faculty' | 'Term',
  stateSelected: string[],
  stateSelectedSetter: React.Dispatch<React.SetStateAction<string[]>>,
  stateArray: string[],
}



function DropboxSingle({text, stateSelected, stateSelectedSetter, stateArray}: DropboxPropsSingle) {
  return (
    <div className="flex flex-row space-between gap-[2em]">
      {text}
      <Listbox value={stateSelected} onChange={stateSelectedSetter}>
        <div className="flex flex-col gap-[1em]">
          <Listbox.Button className="inline-flex flex-row">
            {stateSelected}
            <img className="object-scale-down h-[1.5rem] w-[1.5rem]" src="/images/dropdown.svg" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-[2em] max-h-60 overflow-auto rounded-md py-1 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {stateArray.map((option) => (
              <Listbox.Option className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-blue-100 text-blue-900' : 'text-gray-900' }`}
                key={option}
                value={option}
                disabled={false}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                    {option}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <img className="h-5 w-5" aria-hidden="true" src="/images/tick.svg" />
                    </span>
                  ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

function DropboxMultiple({text, stateText, stateSelected, stateSelectedSetter, stateArray}: DropboxPropsMultiple) {
  return (
    <div className="flex flex-row space-between gap-[2em]">
      {text}
      <Listbox value={stateSelected} onChange={stateSelectedSetter} multiple>
        <div className="flex flex-col gap-[1em]">
          <Listbox.Button className="inline-flex flex-row">
            {stateText}
            <img className="object-scale-down h-[1.5rem] w-[1.5rem]" src="/images/dropdown.svg" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-[2em] max-h-60 overflow-auto rounded-md py-1 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {stateArray.map((option) => (
              <Listbox.Option className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-blue-100 text-blue-900' : 'text-gray-900' }`}
                key={option}
                value={option}
                disabled={false}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                    {option}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <img className="h-5 w-5" aria-hidden="true" src="/images/tick.svg" />
                    </span>
                  ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}