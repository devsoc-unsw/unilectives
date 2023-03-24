import { ReviewEntity } from "../entity/Review";
import { Review } from "../api/schemas/review.schema";

export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): Review => {
  return {
    reviewId: entity.reviewId,
    zid: entity.zid,
    courseCode: entity.courseCode,
    authorName: entity.authorName,
    title: entity.title,
    description: entity.description,
    grade: entity.grade,
    termTaken: entity.termTaken,
    createdTimestamp: entity.createdTimestamp,
    updatedTimestamp: entity.updatedTimestamp,
    upvotes: entity.upvotes,
    manageability: entity.manageability,
    enjoyability: entity.enjoyability,
    usefulness: entity.usefulness,
    overallRating: entity.overallRating,
  };
};

export const convertReviewInterfaceToEntity = (
  review: Review
): ReviewEntity => {
  return {
    reviewId: review.reviewId,
    zid: review.zid,
    courseCode: review.courseCode,
    authorName: review.authorName,
    title: review.title,
    description: review.description,
    grade: review.grade,
    termTaken: review.termTaken,
    createdTimestamp: review.createdTimestamp,
    updatedTimestamp: review.updatedTimestamp,
    upvotes: review.upvotes,
    manageability: review.manageability,
    enjoyability: review.enjoyability,
    usefulness: review.usefulness,
    overallRating: review.overallRating,
  };
};
