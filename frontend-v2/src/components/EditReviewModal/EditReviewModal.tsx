"use client";

import { Review } from "@/types/api";
import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, Fragment, useMemo, useState } from "react";
import ReviewRatingInput from "../ReviewRatingInput/ReviewRatingInput";
import Dropdown from "../Dropdown/Dropdown";
import Link from "next/link";

type Inputs = {
  rating: number | null;
  enjoyability: number | null;
  usefulness: number | null;
  manageability: number | null;
  termTaken: string | null;
};

export default function EditReviewModal({ review }: { review: Review }) {
  // States
  const [isOpen, setIsOpen] = useState(false);

  // States: Modal Inputs
  const defaultInputs = {
    rating: review.overallRating,
    enjoyability: review.enjoyability,
    usefulness: review.usefulness,
    manageability: review.manageability,
    termTaken: review.termTaken,
  };
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  // Simple regex check for termTaken
  const termTakenIsValid = /^[0-9]{2}(T[1-3]|S[1-2])$/.test(
    inputs.termTaken ?? ""
  );

  // function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Check if ready to submit
  const readyToSubmit = useMemo(() => {
    const { rating, enjoyability, usefulness, manageability } = inputs;
    return (
      rating && enjoyability && usefulness && manageability && termTakenIsValid
    );
  }, [inputs, termTakenIsValid]);

  // Submit review
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Return if not ready to submit
    if (!readyToSubmit) return;

    // Get all values
    const target = event.target as HTMLFormElement;
    const { rating, enjoyability, usefulness, manageability, termTaken } =
      inputs;

    const overallRating =
      ((rating as number) +
        (manageability as number) +
        (usefulness as number) +
        (enjoyability as number)) /
      4;

    const body = {
      zid: "",
      authorName: target.displayAnonymous.checked ? "Anonymous" : "",
      title: target.reviewTitle.value,
      description: target.reviewDescription.value,
      courseCode: review.courseCode,
      rating,
      termTaken,
      manageability,
      usefulness,
      enjoyability,
      overallRating,
    };

    // TODO: Submit review here (Do this when user session can already be handled)
    console.log(body);

    // Reset inputs + term taken
    setInputs(defaultInputs);

    closeModal();
  };

  return (
    <>
      {/* Modal */}
      <div className="isolate">
        {/* Add Review button */}
        <button
          onClick={openModal}
          className="duration-100 hover:text-unilectives-blue"
        >
          <PencilSquareIcon className="w-6 h-6 inline-block" />
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Dark background behind modal */}
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-12 py-8 space-y-5 isolate">
                    {/* Modal title + close button */}
                    <div className="flex justify-between items-center">
                      <Dialog.Title as="h1" className="text-lg font-bold">
                        Edit Your Review
                      </Dialog.Title>
                      <button onClick={closeModal}>
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <hr className="border-black/25" />
                    {/* Description */}
                    {/* TODO: Change when prisma migration is done */}
                    {/* <h2 className="text-lg font-bold">{review.courseCode}</h2> */}
                    <h2 className="text-lg font-bold">COMP1511</h2>
                    <div className="flex md:flex-col gap-x-2 gap-y-5 z-10">
                      <form
                        name="edit-review"
                        id="edit-review"
                        className="space-y-5 w-full flex flex-col"
                        onSubmit={handleOnSubmit}
                      >
                        <input
                          type="text"
                          name="reviewTitle"
                          title="Title"
                          defaultValue={review.title}
                          placeholder="Title"
                          className="py-2 px-4 w-full border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input"
                        />
                        <textarea
                          name="reviewDescription"
                          title="Description"
                          placeholder={
                            "Feel free to discuss:\n" +
                            "- Experience with the assessments, labs, final exams\n" +
                            "- Difficulty managing workload\n" +
                            "- Difficulty of core concepts\n" +
                            "- Overall enjoyability / interesting topics you found\n" +
                            "- How strongly you recommend it as an elective."
                          }
                          defaultValue={review.description}
                          className="py-2 px-4 w-full h-full md:h-96 border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input resize-none"
                        />
                      </form>
                      <div className="flex flex-col items-center justify-around gap-y-5 px-12 lg:px-4 md:px-0 md:items-start text-center md:text-left z-10">
                        {/* Overall rating + enjoyability + usefulness + manageability */}
                        {[
                          {
                            defaultValue: inputs.rating,
                            onChange: (value: number | null) => {
                              setInputs((prevInputs: Inputs) => {
                                const newInputs = { ...prevInputs };
                                newInputs.rating = value;
                                return newInputs;
                              });
                            },
                            title: "Overall Rating",
                          },
                          {
                            defaultValue: inputs.enjoyability,
                            onChange: (value: number | null) => {
                              setInputs((prevInputs: Inputs) => {
                                const newInputs = { ...prevInputs };
                                newInputs.enjoyability = value;
                                return newInputs;
                              });
                            },
                            title: "Enjoyment",
                          },
                          {
                            defaultValue: inputs.usefulness,
                            onChange: (value: number | null) => {
                              setInputs((prevInputs: Inputs) => {
                                const newInputs = { ...prevInputs };
                                newInputs.usefulness = value;
                                return newInputs;
                              });
                            },
                            title: "Usefulness",
                          },
                          {
                            defaultValue: inputs.manageability,
                            onChange: (value: number | null) => {
                              setInputs((prevInputs: Inputs) => {
                                const newInputs = { ...prevInputs };
                                newInputs.manageability = value;
                                return newInputs;
                              });
                            },
                            title: "Manageability",
                          },
                        ].map(
                          (
                            item: {
                              defaultValue: number | null;
                              onChange: (value: number | null) => void;
                              title: string;
                            },
                            index: number
                          ) => {
                            return (
                              <div className="space-y-2 text-3xl" key={index}>
                                <h2 className="text-lg font-bold">
                                  {item.title}
                                </h2>
                                {item.title === "Overall Rating" ? (
                                  <ReviewRatingInput
                                    color="purple"
                                    onChange={item.onChange}
                                    defaultValue={item.defaultValue}
                                    type="star"
                                  />
                                ) : (
                                  <ReviewRatingInput
                                    color="blue"
                                    onChange={item.onChange}
                                    defaultValue={item.defaultValue}
                                    type="circle"
                                  />
                                )}
                              </div>
                            );
                          }
                        )}
                        {/* Course Completion */}
                        <div className="w-[270px] md:w-full space-y-2">
                          <h2>
                            <label
                              htmlFor="edit-review-course-completion"
                              className="text-lg font-bold"
                            >
                              Course Completion
                            </label>
                          </h2>
                          <div className="w-full text-left">
                            <input
                              type="text"
                              name="course-completion"
                              title="Course Completion"
                              placeholder="Course Completion (e.g. 18S1, 23T1)"
                              id="edit-review-course-completion"
                              form="submit-review"
                              defaultValue={review.termTaken}
                              onChange={(event) => {
                                setInputs((prevInputs: Inputs) => {
                                  const newInputs = { ...prevInputs };
                                  newInputs.termTaken = event.target.value;
                                  return newInputs;
                                });
                              }}
                              className="py-2 px-4 w-full border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {/* Display as anonymous */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="edit-review-display-anonymous"
                          className="inline font-bold"
                        >
                          Display as anonymous
                        </label>
                        <input
                          type="checkbox"
                          id="edit-review-display-anonymous"
                          name="displayAnonymous"
                          form="submit-review"
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="flex flex-wrap gap-5 justify-between items-center">
                        {/* Terms & Condition */}
                        <p>
                          By clicking Confirm, you have agreed to the{" "}
                          {/* TODO: Change link to the Terms and Condition page */}
                          <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-unilectives-blue hover:underline focus:underline"
                          >
                            Terms and Conditions
                          </Link>
                        </p>
                        {/* Submit button */}
                        <button
                          type="submit"
                          form="submit-review"
                          className="flex items-center gap-1 px-4 py-2 bg-unilectives-icon text-white rounded-md hover:bg-unilectives-icon/95 font-bold disabled:opacity-50"
                          disabled={!readyToSubmit}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
