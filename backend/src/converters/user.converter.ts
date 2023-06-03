import { UserEntity } from "../entity/User";
import { User } from "../api/schemas/user.schema";
import { Course } from "../api/schemas/course.schema";
import { convertReportEntityToInterface } from "./report.converter";
import { reviews } from "@prisma/client";

export const convertUserEntityToInterface = (
  userEntity: UserEntity,
  bookmarkedCourseEntities: Course[] = [],
  bookmarkedReviewEntities: reviews[] = []
): User => {
  return {
    zid: userEntity.zid,
    bookmarkedReviews: bookmarkedReviewEntities,
    bookmarkedCourses: bookmarkedCourseEntities,
    isAdmin: userEntity.isAdmin,
    reviews: userEntity.reviews,
    reports: userEntity.reports.map(convertReportEntityToInterface),
  };
};
