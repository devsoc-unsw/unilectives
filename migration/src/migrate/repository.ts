import { EntityManager } from "typeorm";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";

export default class MigrationRepository {
  private readonly logger = console;

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

  async updateUser(zid: string) {
    await this.manager
      .createQueryBuilder()
      .update("users")
      .set({
        isAdmin: true,
      })
      .where("zid = :zid", { zid })
      .execute();
  }

  async upsertCourses(courses: CourseEntity[]): Promise<void> {
    for (const course of courses) {
      this.logger.debug(
        `Updating/inserting course with course code ${course.courseCode}`,
      );
      await this.manager
        .createQueryBuilder()
        .insert()
        .into("courses")
        .values(course)
        .orUpdate(
          [
            "archived",
            "attributes",
            "calendar",
            "campus",
            "description",
            "enrolment_rules",
            "equivalents",
            "exclusions",
            "faculty",
            "field_of_education",
            "gen_ed",
            "level",
            "school",
            "study_level",
            "terms",
            "title",
            "uoc",
            "rating",
          ],
          ["course_code"],
          { skipUpdateIfNoValuesChanged: true },
        )
        .execute();
    }
  }

  async flush(): Promise<void> {
    await this.manager.query("DELETE FROM cselectives.reviews");
    await this.manager.query("DELETE FROM cselectives.courses");
  }
}
