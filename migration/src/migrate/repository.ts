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

  async upsertCourses(courses: CourseEntity[]): Promise<void> {
    for (const course of courses) {
      await this.manager
        .createQueryBuilder() 
        .insert()
        .into("courses")
        .values(course)
        .orUpdate([
          "archived", 
          "attributes", 
          "calendar", 
          "campus", 
          "description", 
          "enrolmentRules", 
          "equivalents", 
          "exclusions", 
          "faculty", 
          "fieldOfEducation", 
          "genEd", 
          "level", 
          "school", 
          "studyLevel", 
          "terms", 
          "title", 
          "uoc", 
          "rating", 
          ],
          ["courseCode"]
        )
        .execute()
      }
  }
  async flush(): Promise<void> {
    await this.manager.query("DELETE FROM courses");
    await this.manager.query("DELETE FROM reviews");
  }
}
