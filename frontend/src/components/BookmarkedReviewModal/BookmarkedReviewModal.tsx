"use client";
import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Review } from "@/types/api";
import Rating from "../Rating/Rating";

interface BookmarkedReviewModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  review: Review | null;
}

export default function BookmarkedReviewModal({
  isOpen,
  setIsOpen,
  review,
}: BookmarkedReviewModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {/* the blurred backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
        aria-hidden="true"
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center pl-20 z-10">
        {/* The actual dialog panel */}
        <Dialog.Panel className="mx-auto max-w-sm p-8 rounded dark:bg-gray-900 bg-white flex flex-col xs:w-full">
          <button className="w-6 h-6 place-self-end" onClick={handleClose}>
            <XMarkIcon />
          </button>
          
          <Dialog.Title className="text-2xl dark:text-white font-bold mb-4 text-unilectives-headings">
            {review.courseCode}
          </Dialog.Title>

          {/* Rating */}
          <div className="mb-4">
            <Rating
              color="purple"
              type="star"
              overallRating={review.overallRating}
            />
          </div>

          {/* Review Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Review</h3>
              <p className="text-unilectives-headings dark:text-gray-100">
                {review.description || "No description provided."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Author:</span> {review.authorName}
              </div>
              <div>
                <span className="font-semibold">Term Taken:</span> {review.termTaken}
              </div>
              <div>
                <span className="font-semibold">Grade:</span> {review.grade || "Not specified"}
              </div>
              <div>
                <span className="font-semibold">Posted:</span> {new Date(review.createdTimestamp).toLocaleDateString()}
              </div>
            </div>

            {/* Individual Ratings */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Enjoyability:</span> {review.enjoyability}/5
              </div>
              <div>
                <span className="font-semibold">Usefulness:</span> {review.usefulness}/5
              </div>
              <div>
                <span className="font-semibold">Manageability:</span> {review.manageability}/5
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-4">
            <button
              className="flex items-center justify-center px-4 py-2 bg-unilectives-button text-white rounded-md hover:bg-unilectives-icon/95 font-bold"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}