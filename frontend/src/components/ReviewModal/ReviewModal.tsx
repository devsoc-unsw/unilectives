"use client";

import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FormEvent, Fragment, useContext, useMemo, useState } from "react";
import ReviewRatingInput from "../ReviewRatingInput/ReviewRatingInput";
import { post, validatedReq } from "@/utils/request";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Review } from "@/types/api";
import { AlertContext } from "@/lib/snackbar-context";

type Inputs = {
  overallRating: number | null;
  enjoyability: number | null;
  usefulness: number | null;
  manageability: number | null;
  termTaken: string | null;
};

type AltSetCurrentReviewsType = (r2: Review[]) => Review[];
export default function ReviewModal({
  courseCode,
  setCurrentReviews,
}: {
  courseCode: string;
  setCurrentReviews?: (r: Review[] | AltSetCurrentReviewsType) => void;
}) {
  // States
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { setAlert } = useContext(AlertContext);

  // States: Modal Inputs
  const defaultInputs = {
    overallRating: null,
    enjoyability: null,
    usefulness: null,
    manageability: null,
    termTaken: null,
  };
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  // Simple regex check for termTaken
  const termTakenIsValid = /^[0-9]{2}(T[1-3]|S[1-2])$/.test(
    inputs.termTaken ?? ""
  );

  // Check if ready to submit
  const readyToSubmit = useMemo(() => {
    const { overallRating, enjoyability, usefulness, manageability } = inputs;
    return (
      overallRating &&
      enjoyability &&
      usefulness &&
      manageability &&
      termTakenIsValid
    );
  }, [inputs, termTakenIsValid]);

  // Submit review
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Return if not ready to submit
    if (!readyToSubmit || status !== "authenticated") return;

    // Get all values
    const target = event.target as HTMLFormElement;
    const {
      overallRating,
      enjoyability,
      usefulness,
      manageability,
      termTaken,
    } = inputs;

    const body = {
      zid: session?.user?.id,
      authorName: target.displayAnonymous.checked
        ? "Anonymous"
        : session.user?.name,
      title: target.reviewTitle.value,
      description: target.reviewDescription.value,
      courseCode,
      grade: target.reviewGrade.value ? Number(target.reviewGrade.value) : null,
      overallRating,
      termTaken,
      manageability,
      usefulness,
      enjoyability,
    };

    // Submit review
    const res = await validatedReq(
      "POST",
      "/reviews",
      session?.user?.accessToken ?? "",
      session?.user?.id ?? "",
      body
    );

    if (res.errorCode) {
      setAlert({ message: "Try again later.", type: "Alert" });
      return;
    }

    // Optimistic UI update
    const { review: newReview } = res as { review: Review };
    if (setCurrentReviews) {
      setCurrentReviews((prev: Review[]) => {
        const newReviews = [newReview, ...prev];
        return newReviews;
      });
    }

    // Reset inputs + term taken
    setInputs(defaultInputs);

    closeModal();

    // Snackbar
    setAlert({ message: "Review created!", type: "Success" });
  };

  // function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Modal */}
      <div className="isolate">
        {/* Add Review button */}
        <button
          onClick={openModal}
          className="flex items-center gap-1 px-4 py-2 bg-unilectives-icon text-white rounded-md hover:bg-unilectives-icon/95"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Add a review
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
              <div className="ml-[80px] fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="ml-[80px] fixed inset-0 overflow-y-auto">
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
                      <Dialog.Title as="h1" className="text-2xl font-bold">
                        Submit a Review
                      </Dialog.Title>
                      <button onClick={closeModal}>
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <hr className="border-black/25" />
                    {/* Description */}
                    <p>
                      Please write your review below: make sure you read the
                      terms and conditions before posting. Feel free to include
                      your experience with the assessments, labs, final exams,
                      the difficulty of core concepts/managing workload, your
                      overall enjoyability or how strongly you recommend it as
                      an elective.
                    </p>
                    {/* Inputs */}
                    <div className="flex md:flex-col gap-x-2 gap-y-5 z-10">
                      <form
                        name="submit-review"
                        id="submit-review"
                        className="space-y-5 w-full flex flex-col"
                        onSubmit={handleOnSubmit}
                      >
                        <input
                          type="text"
                          name="reviewTitle"
                          title="Title"
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
                          className="py-2 px-4 w-full h-full md:h-96 border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input resize-none"
                        />
                      </form>
                      <div className="flex flex-col items-center justify-around gap-y-5 px-12 lg:px-4 md:px-0 md:items-start text-center md:text-left z-10">
                        {/* overallRating + enjoyability + usefulness + manageability */}
                        {[
                          {
                            defaultValue: inputs.overallRating,
                            onChange: (value: number | null) => {
                              setInputs((prevInputs: Inputs) => {
                                const newInputs = { ...prevInputs };
                                newInputs.overallRating = value;
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
                                <h2 className="text-lg font-bold after:content-['*'] after:text-red-500">
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
                        {/* Grade */}
                        <div>
                          <h2>
                            <label
                              htmlFor="modal-grade"
                              className="text-lg font-bold"
                            >
                              Grade
                            </label>
                          </h2>
                          <input
                            name="reviewGrade"
                            type="number"
                            min={0}
                            max={100}
                            form="submit-review"
                            placeholder="Grade"
                            className="py-2 px-2 border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input"
                          />
                        </div>
                        {/* Course Completion */}
                        <div className="w-[270px] md:w-full space-y-2">
                          <h2>
                            <label
                              htmlFor="modal-course-completion"
                              className="text-lg font-bold after:content-['*'] after:text-red-500"
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
                              id="modal-course-completion"
                              form="submit-review"
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
                          htmlFor="display-anonymous"
                          className="inline font-bold"
                        >
                          Display as anonymous
                        </label>
                        <input
                          type="checkbox"
                          id="display-anonymous"
                          name="displayAnonymous"
                          form="submit-review"
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="flex flex-wrap gap-5 justify-between items-center">
                        {/* Terms & Condition */}
                        <p>
                          By clicking Submit, you have agreed to the{" "}
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
                          Submit
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
