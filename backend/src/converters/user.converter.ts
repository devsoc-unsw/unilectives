import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { User } from "../api/schemas/user.schema";
import { Course } from "../api/schemas/course.schema";
import { convertReportEntityToInterface } from "./report.converter";
import { convertReviewEntityToInterface } from "./review.converter";

export const convertUserEntityToInterface = (
  userEntity: UserEntity,
  bookmarkedCourseEntities: Course[] = [],
  bookmarkedReviewEntities: ReviewEntity[] = []
): User => {
  return {
    zid: userEntity.zid,
    bookmarkedReviews: bookmarkedReviewEntities.map(
      convertReviewEntityToInterface
    ),
    bookmarkedCourses: bookmarkedCourseEntities,
    isAdmin: userEntity.isAdmin,
    reviews: userEntity.reviews.map(convertReviewEntityToInterface),
    reports: userEntity.reports.map(convertReportEntityToInterface),
  };
};
