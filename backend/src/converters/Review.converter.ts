import { ReviewEntity } from "../entity/Review";
import { IReview } from "../interfaces/IReview";

// TODO: UPDATE PLACEHOLDERS
export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): IReview => {
  return {
    reviewId: entity.reviewId,
    zid: entity.zid,
    description: entity.description,
    authorName: entity.authorName,
  };
};

export const convertReviewInterfaceToEntity = (
  review: IReview
): ReviewEntity => {
  return {
    reviewId: review.reviewId,
    zid: review.zid,
    description: review.description,
    authorName: review.authorName,
  };
};
