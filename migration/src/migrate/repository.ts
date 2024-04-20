import { EntityManager } from "typeorm";
import { CourseEntity } from "src/entity/Course";
import { ReviewEntity } from "src/entity/Review";
import { IReview } from "src/types/IReview";

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

  async updateReview(reviewId: string, timestamp: number) {
    await this.manager.query(`
    update unilectives.reviews SET created_timestamp = TO_TIMESTAMP(${timestamp}/ 1000.0) where review_id = '${reviewId}';
    `);
  }

  async getReviews(): Promise<IReview[]> {
    const reviews: any = await this.manager.query(`
    select * from unilectives.reviews
    `);
    return reviews.map((r: any) => ({
      reviewId: r.review_id,
      zid: r.zid,
      courseCode: r.course_code,
      authorName: r.author_name,
      title: r.title,
      description: r.description,
      grade: r.grade,
      termTaken: r.term_taken,
      createdTimestamp: r.created_timestamp,
      updatedTimestamp: r.updated_timestamp,
      upvotes: r.upvotes,
      manageability: r.manageability,
      usefulness: r.usefulness,
      enjoyability: r.enjoyability,
      overallRating: r.overall_rating,
    }));
  }

  async insertCourses(courses: CourseEntity[]): Promise<void> {
    await this.manager.save(courses, { chunk: 1000 });
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
