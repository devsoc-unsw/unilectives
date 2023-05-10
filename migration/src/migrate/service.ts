import Firebase from "src/db/firebase";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";
import { IResponse } from "src/types/IApi";
import { CirclesCourse } from "src/types/ICircles";
import Fetcher from "./fetcher";
import MigrationRepository from "./repository";

export default class MigrationService {
  constructor(
    readonly fb: Firebase,
    readonly fetcher: Fetcher,
    readonly migrationRepository: MigrationRepository
  ) {}

  async migrateReviews(): Promise<IResponse> {
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
    } catch (err: any) {
      return {
        status: "FAILURE",
        message: err.message,
      };
    }
  }

  async migrateCourses(): Promise<IResponse> {
    try {
      const circleCourses = await this.fetcher.getCourses();
      const courses: CourseEntity[] = [];
      const courseSet = new Set<string>();

      for (const course of circleCourses) {
        if (courseSet.has(course.code)) {
          continue;
        }

        courses.push(this.convertToCourseEntity(course));
        courseSet.add(course.code);
      }
      await this.migrationRepository.insertCourses(courses);

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

  async flush(): Promise<IResponse> {
    try {
      await this.migrationRepository.flush();
      return {
        status: "SUCCESS",
        message: "Successfully flushed database",
      }
    } catch (err: any) {
      return {
        status: "FAILURE",
        message: err.message,
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
      return termNums;
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
}
