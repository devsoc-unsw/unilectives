import { IUser } from "IUser";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { convertCourseEntityToInterface } from "./course.converter";
import { convertReportEntityToInterface } from "./report.converter";
import { convertReviewEntityToInterface } from "./review.converter";

export const convertUserEntityToInterface = (
  userEntity: UserEntity,
  bookmarkedCourseEntities: CourseEntity[] = [],
  bookmarkedReviewEntities: ReviewEntity[] = []
): IUser => {
  return {
    zid: userEntity.zid,
    bookmarkedReviews: bookmarkedReviewEntities.map(
      convertReviewEntityToInterface
    ),
    bookmarkedCourses: bookmarkedCourseEntities.map(
      convertCourseEntityToInterface
    ),
    isAdmin: userEntity.isAdmin,
    reviews: userEntity.reviews.map(convertReviewEntityToInterface),
    reports: userEntity.reports.map(convertReportEntityToInterface),
  };
};
