import Firebase from "src/db/firebase";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";
import { IResponse } from "src/types/IApi";
import { EntityManager } from "typeorm";

export default class MigrationService {
  constructor(readonly manager: EntityManager, readonly fb: Firebase) {}

  async migrateReviews(): Promise<IResponse> {
    try {
      const reviewsObj = await this.fb.getReviews();
      const oldReviews = Object.values(reviewsObj);

      const newReviews: ReviewEntity[] = oldReviews.map((review) => {
        const entity = new ReviewEntity();
        entity.zid = "z5000000";
        entity.courseCode = review.courseCode;
        entity.authorName = "Anonymous";
        entity.title = "";
        entity.description = review.comment;
        entity.termTaken = review.termTaken;
        entity.manageability =
          (review.rating.enjoyment + review.rating.usefulness) / 2;
        entity.usefulness = review.rating.usefulness;
        entity.enjoyability = review.rating.enjoyment;
        entity.overallRating = review.rating.overall;
        entity.upvotes = [];
        return entity;
      });

      await this.saveReviews(newReviews);
      return {
        status: "SUCCESS",
        message: "Successfully migrated reviews",
      };
    } catch (err: any) {
      return {
        status: "FAILURE",
        message: err.message,
      };
    }
  }

  async migrateCourses(): Promise<IResponse> {
    try {
      const coursesObj = await this.fb.getCourses();
      const oldCourses = Object.values(coursesObj);

      const newCourses = oldCourses.map((course) => {
        const entity = new CourseEntity();
        entity.courseCode = course.courseCode;
        entity.archived = false; // TODO: figure this out
        entity.attributes = [JSON.stringify(course.attributes)];
        entity.calendar = course.calendar;
        entity.campus = course.campus;
        entity.description = course.description;
        entity.enrolmentRules = course.enrolmentRules;
        entity.equivalents = Object.keys(course.equivalents);
        entity.exclusions = Object.keys(course.exclusions);
        entity.faculty = course.faculty;
        entity.fieldOfEducation = course.fieldOfEducation;
        entity.genEd = course.genEd;
        entity.level = course.level;
        entity.school = course.school;
        entity.studyLevel = course.studyLevel;
        entity.terms = course.terms;
        entity.title = course.title;
        entity.uoc = course.uoc;
        entity.rating = -1; // TODO: figure this out
        return entity;
      });

      await this.saveCourses(newCourses);
      return {
        status: "SUCCESS",
        message: "Successfully migrated courses",
      };
    } catch (err: any) {
      return {
        status: "FAILURE",
        message: err.message,
      };
    }
  }

  async saveReviews(reviews: ReviewEntity[]): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .insert()
      .into("reviews")
      .values(reviews)
      .execute();
  }

  async saveCourses(courses: CourseEntity[]): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .insert()
      .into("courses")
      .values(courses)
      .execute();
  }
}
