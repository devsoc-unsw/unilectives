import { EntityManager } from "typeorm";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";

export default class MigrationRepository {
  constructor(private readonly manager: EntityManager) {}
  
  async insertReviews(reviews: ReviewEntity[]): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .insert()
      .into("reviews")
      .values(reviews)
      .execute();
  }

  async insertCourses(courses: CourseEntity[]): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .insert()
      .into("courses")
      .values(courses)
      .execute();
  }

  async upsertCourses(): Promise<void> {
    // update course info and add any new courses into the database
  }

  async flush(): Promise<void> {
    await this.manager.query("DELETE FROM courses");
    await this.manager.query("DELETE FROM reviews");
  }
}





    // } catch {
    //   for (const course of courses) {
    //     await this.manager
    //       .createQueryBuilder()
    //       .update("courses")
    //       .set(course)
    //       .where("courseCode = :courseCode", { courseCode: course.courseCode })
    //       .execute();
    //   }