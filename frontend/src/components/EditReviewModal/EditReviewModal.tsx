"use client";

import { Review } from "@/types/api";
import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, Fragment, useState } from "react";
import Link from "next/link";
import Rating from "../Rating/Rating";
import TruncatedDescription from "../TruncatedDescription/TruncatedDescription";
import { put, validatedReq } from "@/utils/request";
import { useSession } from "next-auth/react";

export default function EditReviewModal({
  review,
  setEdited,
}: {
  review: Review;
  setEdited: (detail: {
    reviewId: string;
    authorName: string;
    grade: number | null;
  }) => void;
}) {
  const { data: session } = useSession();

  // States
  const [isOpen, setIsOpen] = useState(false);

  // function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Edit review
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Get all values
    const target = event.target as HTMLFormElement;

    const body = {
      authorName: target.displayAnonymous.checked ? "Anonymous" : "",
      grade: target.reviewGrade.value ? Number(target.reviewGrade.value) : null,
    };

    await validatedReq(
      "PUT",
      `/reviews/${review.reviewId}`,
      session?.user?.accessToken ?? "",
      session?.user?.id ?? "",
      body
    );

    setEdited({
      reviewId: review.reviewId,
      authorName: body.authorName,
      grade: body.grade,
    });

    closeModal();
  };

  return (
    <>
      {/* Modal */}
      <div className='isolate'>
        {/* Add Review button */}
        <button
          onClick={openModal}
          className='duration-100 hover:text-unilectives-blue'
        >
          <PencilSquareIcon className='w-6 h-6 inline-block' />
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              {/* Dark background behind modal */}
              <div className='ml-[80px] fixed inset-0 bg-black/25' />
            </Transition.Child>

            <div className='ml-[80px] fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-5xl transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-12 py-8 space-y-5 isolate'>
                    {/* Modal title + close button */}
                    <div className='flex justify-between items-center'>
                      <Dialog.Title as='h2' className='text-2xl font-bold'>
                        Edit Your Review
                      </Dialog.Title>
                      <button onClick={closeModal}>
                        <XMarkIcon className='w-6 h-6' />
                      </button>
                    </div>
                    <hr className='border-black/25' />
                    {/* Description */}
                    <h2 className='text-2xl font-bold'>{review.courseCode}</h2>
                    <div className='text-2xl'>
                      <Rating
                        color='purple'
                        type='star'
                        overallRating={review.overallRating}
                      />
                    </div>
                    <div>
                      <p className='float-left font-bold mr-1'>Title: </p>
                      <TruncatedDescription
                        content={review.title ? review.title : "-"}
                        maxCharacters={150}
                      />
                    </div>
                    <div>
                      <p className='float-left font-bold mr-1'>Description: </p>
                      <TruncatedDescription
                        content={review.description ? review.description : "-"}
                        maxCharacters={250}
                      />
                    </div>
                    <div className='flex md:flex-col gap-x-2 gap-y-5 z-10'>
                      <form
                        name='edit-review'
                        id='edit-review'
                        className='space-y-5 w-full flex flex-col'
                        onSubmit={handleOnSubmit}
                      >
                        {/* Grade */}
                        <div className='flex flex-wrap items-center gap-2'>
                          <label
                            htmlFor='modal-grade'
                            className='text-lg font-bold'
                          >
                            Grade
                          </label>
                          <input
                            name='reviewGrade'
                            type='number'
                            min={0}
                            max={100}
                            defaultValue={
                              review.grade ? review.grade : undefined
                            }
                            form='edit-review'
                            placeholder='Grade'
                            className='py-2 px-2 border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input'
                          />
                        </div>
                      </form>
                    </div>
                    <div className='space-y-2'>
                      {/* Display as anonymous */}
                      <div className='flex items-center gap-2'>
                        <label
                          htmlFor='edit-review-display-anonymous'
                          className='inline font-bold'
                        >
                          Display as anonymous
                        </label>
                        <input
                          type='checkbox'
                          id='edit-review-display-anonymous'
                          name='displayAnonymous'
                          form='edit-review'
                          className='w-4 h-4'
                          defaultChecked={review.authorName === "Anonymous"}
                        />
                      </div>
                      <div className='flex flex-wrap gap-5 justify-between items-center'>
                        {/* Terms & Conditions */}
                        <p>
                          By clicking Confirm, you have agreed to the{" "}
                          <Link
                            href='/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-unilectives-blue hover:underline focus:underline'
                          >
                            Terms and Conditions
                          </Link>
                        </p>
                        {/* Submit button */}
                        <button
                          type='submit'
                          form='edit-review'
                          className='flex items-center gap-1 px-4 py-2 bg-unilectives-icon text-white rounded-md hover:bg-unilectives-icon/95 font-bold'
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
