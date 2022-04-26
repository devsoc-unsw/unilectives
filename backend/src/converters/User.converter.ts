import { IUser } from "IUser";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { convertCourseEntityToInterface } from "./Course.converter";
import {
  convertReportEntityToInterface,
  convertReportInterfaceToEntity,
} from "./Report.converter";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./Review.converter";

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

export const convertUserInterfaceToEntity = (user: IUser): UserEntity => {
  return {
    zid: user.zid,
    bookmarkedReviews: user.bookmarkedReviews.map((review) => review.reviewId),
    bookmarkedCourses: user.bookmarkedCourses.map(
      (course) => course.courseCode
    ),
    isAdmin: user.isAdmin,
    reviews: user.reviews.map(convertReviewInterfaceToEntity),
    reports: user.reports.map(convertReportInterfaceToEntity),
  };
};
