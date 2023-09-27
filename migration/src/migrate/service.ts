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
import { num } from "envsafe";

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
      // Retrieve current database of old reviews
      const reviewsObj = await this.fb.getReviews();
      const oldReviews = Object.values(reviewsObj);

      /* 
        1.  Create a hash map of old reviews, indexed by a concatenated string of values of intersecting keys;
        2.  Iterate through old reviews, adding the timestamp of each old review to this aforementioned key;
        3.  Iterate through new reviews of each course, updating the value of the timestamp from the corresponding old review using the key;
        NOTE(S).  For duplicates: 
                    on insertion, simply push; and
                    on extraction, once you extract a time value, remove the first value so the next will be used.
                  Time complexity: O(n).
      */

      // 1 --
      const verboseHashOfOldReviews: {[key: string]: number[] } = {};
      function oldReviewKeyConstructor(r: IOldReview): string {
        return (`${r.courseCode}, ${r.title}, ${r.comment}, ${r.termTaken}, ${r.rating.usefulness}, ${r.rating.enjoyment}, ${r.rating.overall}}`);
      };
      function newReviewKeyConstructor(r: ReviewEntity, courseCode: string): string { // No course code available :sob:
        return (`${courseCode}, ${r.title}, ${r.description}, ${r.termTaken}, ${r.usefulness}, ${r.enjoyability}, ${r.overallRating}}`);
      }
      // -- /

      // 2 --
      let numDuplicates = 0;
      oldReviews.forEach((r) => {
        const key = oldReviewKeyConstructor(r);
        if (verboseHashOfOldReviews[key] === undefined) {
          verboseHashOfOldReviews[key] = [r.timestamp];
        } else {
          verboseHashOfOldReviews[key].push(r.timestamp);
          numDuplicates++;
        }
        });
      // -- /

      // 3 --
      let numMismatches = 0;
      const allCourseCodes = await this.migrationRepository.getCourseCodes();
      for (const c of allCourseCodes) {
        // Retrieve reviews for that course code
        const currentReviews = await this.migrationRepository.getCourseReviews(c);
        
        // For each outdated review, do step 3. Shift the array when done.
        currentReviews.forEach((r) => {
          const key = newReviewKeyConstructor(r, c);
          if (verboseHashOfOldReviews[key] !== undefined) {
            this.migrationRepository.updateReview(r.reviewId, new Date(verboseHashOfOldReviews[key][0]));
            verboseHashOfOldReviews[key].shift();
          } else {
            numMismatches++;
          }
        });
      };
      // -- /

      // Testing
      // Find the last post in the old reviews
      let lastOldReview: number = 0;
      oldReviews.forEach((r) => {
        if (r.timestamp > lastOldReview) {
          lastOldReview = r.timestamp;
        }
      });
      console.log(`Some ${numDuplicates} duplicates were found, with ${numMismatches} mismatches.`);
      console.log(`There are ${oldReviews.length} old reviews in old db.`);
      const n = await this.migrationRepository.getReviews();
      const m = n.filter((r) => r.createdTimestamp.valueOf() <= lastOldReview);
      console.log(`There are ${m.length} old reviews in new db.`);

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
