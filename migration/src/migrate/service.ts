import Firebase from "src/db/firebase";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";
import { IResponse } from "src/types/IApi";
import { CirclesCourse } from "src/types/ICircles";
import Fetcher from "./fetcher";
import MigrationRepository from "./repository";
import { Timestamp } from "typeorm";
import { IOldReview } from "src/types/IReview";
import { version } from "os";

export default class MigrationService {
  constructor(
    readonly fb: Firebase,
    readonly fetcher: Fetcher,
    readonly migrationRepository: MigrationRepository,
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

  async updateReviews(): Promise<IResponse> {
    try {
      // Retrieve old reviews
      const reviewsObj = await this.fb.getReviews();
      const oldReviews = Object.values(reviewsObj);
      console.log(oldReviews.length)

      // Retrieve current database of old and new reviews
      const currentReviews = await this.migrationRepository.getReviews();

      // Filter out the new reviews
      const outdatedReviews = currentReviews.filter((r) => r.createdTimestamp.valueOf() <= Date.parse("2023-09-24T11:20"));
      console.log(outdatedReviews.length)
      
      /* 
        1. Create a hash map of old reviews, indexed by a concatenated string of values of intersecting keys;
        2. Iterate through old reviews, adding the timestamp of each old review to this aforementioned key;
        3. Iterate through new reviews, updating the value of the timestamp from the corresponding old review using the key;
        NOTE(S).  Not sure what to do about duplicates.
                  Time complexity: O(n)
      */

      // Step 1 --
      const verboseHashOfOldReviews: {[key: string]: number } = {};
      function oldReviewKeyConstructor(r: IOldReview): string {
        return (`${r.courseCode}, ${r.title}, ${r.comment}, ${r.termTaken}, ${r.rating.usefulness}, ${r.rating.enjoyment}, ${r.rating.overall}}`);
      };
      function newReviewKeyConstructor(r: ReviewEntity): string {
        return (`${r.courseCode}, ${r.title}, ${r.description}, ${r.termTaken}, ${r.usefulness}, ${r.enjoyability}, ${r.overallRating}}`);
      }
      // -- /

      // Step 2 --
      let c = 0;
      oldReviews.forEach((r) => {
        const key = oldReviewKeyConstructor(r);
        verboseHashOfOldReviews[key] = r.timestamp;
        if (r.comment.includes("Useful info")) {
          console.log(key)
          c++;
        }
      });
      // -- /

      // Step 3 --
      outdatedReviews.forEach((r) => {
        const key = newReviewKeyConstructor(r);
        if (r.reviewId==="a65da825-843a-4ccf-9cba-b1a7a608aad4") {console.log(r)}
        // console.log("Key: ")
        // console.log(key)
        // console.log("Timestamp: ")
        // console.log(verboseHashOfOldReviews[key])
        //this.migrationRepository.updateReview(r.reviewId, new Date(verboseHashOfOldReviews[key]));
      });
      // -- /

      // Testing
      const n = await this.migrationRepository.getReviews();
      console.log(n.filter((r) => r.createdTimestamp.valueOf() <= Date.parse("2023-01-01T00:00")));

      return {
        status: "SUCCESS",
        message: "Successfully updated reviews",
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
      const courses = await this.getCirclesCourses();
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

  async updateCourses(): Promise<IResponse> {
    try {
      const courses = await this.getCirclesCourses();
      await this.migrationRepository.upsertCourses(courses);

      return {
        status: "SUCCESS",
        message: "Successfully updated courses",
      };
    } catch (err: any) {
      return {
        status: "FAILURE",
        message: err.message,
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
      };
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
