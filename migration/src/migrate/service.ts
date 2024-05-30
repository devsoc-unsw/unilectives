import Firebase from "src/db/firebase";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";
import { IResponse } from "src/types/IApi";
import { CirclesCourse } from "src/types/ICircles";
import Fetcher from "./fetcher";
import MigrationRepository from "./repository";

export default class MigrationService {
  private readonly logger = console;
  constructor(
    readonly fb: Firebase,
    readonly fetcher: Fetcher,
    readonly migrationRepository: MigrationRepository,
  ) {}

  inferError(err: unknown) {
    return err instanceof Error ? err.message : "An unknown error occured";
  }

  async migrateReviews(): Promise<IResponse> {
    try {
      const oldReviews = await this.fetcher.getProdReviews();

      const newReviews: ReviewEntity[] = oldReviews.map((review) => {
        const entity = new ReviewEntity();
        entity.zid = "z5000000";
        entity.courseCode = review.courseCode;
        entity.authorName = review.authorName;
        entity.title = review.title;
        entity.description = review.description;
        entity.termTaken = review.termTaken;
        entity.manageability = review.manageability;
        entity.usefulness = review.usefulness;
        entity.enjoyability = review.enjoyability;
        entity.overallRating = review.overallRating;
        entity.upvotes = review.upvotes;
        entity.createdTimestamp = new Date(review.createdTimestamp);
        entity.updatedTimestamp = new Date(review.updatedTimestamp);
        return entity;
      });

      await this.migrationRepository.insertReviews(newReviews);
      return {
        status: "SUCCESS",
        message: "Successfully migrated reviews",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async migrateFirebaseReviews(): Promise<IResponse> {
    try {
      const reviewsObj = await this.fb.getReviews();
      const oldReviews = Object.values(reviewsObj);

      const newReviews: ReviewEntity[] = oldReviews.map((review) => {
        const entity = new ReviewEntity();
        entity.zid = "z5000000";
        entity.courseCode = review.courseCode;
        entity.authorName = "Anonymous";
        entity.title = review.title;
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

      await this.migrationRepository.insertReviews(newReviews);
      return {
        status: "SUCCESS",
        message: "Successfully migrated reviews",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async updateReviews(): Promise<IResponse> {
    try {
      const reviewsObj = await this.fb.getReviews();
      const oldReviews = Object.values(reviewsObj);

      const updatedReviews = new Map<string, string>();
      const currentReviews = await this.migrationRepository.getReviews();

      for (const oldReview of oldReviews) {
        const matchingReviews = currentReviews.filter((cr) => {
          return (
            cr.description === oldReview.comment &&
            cr.title === oldReview.title &&
            cr.overallRating === oldReview.rating.overall &&
            cr.enjoyability === oldReview.rating.enjoyment &&
            cr.usefulness === oldReview.rating.usefulness &&
            cr.courseCode === oldReview.courseCode &&
            cr.termTaken === oldReview.termTaken
          );
        });

        for (const matchingReview of matchingReviews) {
          if (updatedReviews.has(matchingReview.reviewId)) {
            continue;
          }

          await this.migrationRepository.updateReview(
            matchingReview.reviewId,
            oldReview.timestamp,
          );
          updatedReviews.set(matchingReview.reviewId, "yeet");
        }
      }

      return {
        status: "SUCCESS",
        message: "Successfully updated reviews",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async migrateCourses(): Promise<IResponse> {
    try {
      const courses = await this.getCirclesCourses();
      await this.migrationRepository.insertCourses(courses);

      return {
        status: "SUCCESS",
        message: "Successfully migrated courses",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async updateCourses(): Promise<IResponse> {
    try {
      const courses = await this.getCirclesCourses();
      await this.migrationRepository.upsertCourses(courses);

      return {
        status: "SUCCESS",
        message: "Successfully updated courses",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async updateUser(zid: string) {
    try {
      await this.migrationRepository.updateUser(zid);
      return {
        status: "SUCCESS",
        message: "Successfully updated user to admin" + ` ${zid}`,
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  async flush(): Promise<IResponse> {
    try {
      await this.migrationRepository.flush();
      return {
        status: "SUCCESS",
        message: "Successfully flushed database",
      };
    } catch (err) {
      return {
        status: "FAILURE",
        message: this.inferError(err),
      };
    }
  }

  convertToCourseEntity(course: CirclesCourse): CourseEntity {
    const getTerms = (terms: string[]): number[] => {
      const termNums: number[] = [];
      for (const term of terms) {
        if (term === "SC") {
          termNums.push(0);
          continue;
        }

        if (term.split(" ")[0] === "Term") {
          const termNum = parseInt(term.slice(5));
          termNums.push(termNum);
        } else if (term.split("T")[0] === "") {
          const termNum = parseInt(term.slice(1));
          termNums.push(termNum);
        } else if (term.split("S")[0] === "") {
          // old semesters are S1, S2
          const termNum = parseInt(term.slice(1)) * -1;
          termNums.push(termNum);
        } else {
          console.log("Unknown term: ", term);
        }
      }
      return termNums.filter((term) => !isNaN(term));
    };

    const entity = new CourseEntity();
    entity.courseCode = course.code;
    entity.archived = course.is_legacy;
    entity.attributes = [];
    entity.calendar = "3+";
    entity.campus = course.campus;
    entity.description = course.description;
    entity.enrolmentRules = course.raw_requirements;
    entity.equivalents = Object.keys(course.equivalents);
    entity.exclusions = Object.keys(course.exclusions);
    entity.faculty = course.faculty;
    entity.fieldOfEducation = course.school ?? course.faculty;
    entity.school = course.school ?? course.faculty;
    entity.genEd = course.gen_ed;
    entity.uoc = course.UOC;
    entity.level = course.level;
    entity.studyLevel = course.study_level;
    entity.terms = getTerms(course.terms);
    entity.title = course.title;
    entity.rating = -1;

    return entity;
  }

  async getCirclesCourses(): Promise<CourseEntity[]> {
    const circlesCourses = await this.fetcher.getCourses();
    const courses: CourseEntity[] = [];
    const courseSet = new Set<string>();

    for (const course of circlesCourses) {
      if (courseSet.has(course.code)) {
        continue;
      }

      courses.push(this.convertToCourseEntity(course));
      courseSet.add(course.code);
    }
    return courses;
  }
}
