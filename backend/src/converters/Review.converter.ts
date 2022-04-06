import { ReviewEntity } from "../entity/Review";
import { IReview } from "../interfaces/IReview";
import { convertReportInterfaceToEntity } from "./Report.converter";

// TODO: UPDATE PLACEHOLDERS
export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): IReview => {
  return {
    reviewId: entity.reviewId,
    zid: entity.zid,
    reports: entity.reports,
  };
};

export const convertReviewInterfaceToEntity = (
  review: IReview
): ReviewEntity => {
  return {
    reviewId: review.reviewId,
    zid: review.zid,
    reports: review.reports.map(convertReportInterfaceToEntity),
  };
};
