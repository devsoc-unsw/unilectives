import { CourseEntity } from "../entity/Course";
import { EntityManager, In } from "typeorm";

export class CourseRepository {
  constructor(private readonly manager: EntityManager) {}

  /* GET ALL COURSES REPOSITORY METHOD
  async getAllCourses(): Promise<CourseEntity[]> {
    const rawCourses = await this.manager
      .createQueryBuilder(CourseEntity, "c")
      .select([
        "c.*",
        "AVG(r.overall_rating) AS avg_overall_rating",
        "AVG(r.manageability) AS avg_manageability",
        "AVG(r.usefulness) AS avg_usefulness",
        "AVG(r.enjoyability) AS avg_enjoyability",
        "COUNT(r.review_id) AS review_count",
      ])
      .leftJoin("c.reviews", "r")
      .groupBy("c.course_code")
      .addGroupBy("c.attributes")
      .addGroupBy("c.calendar")
      .addGroupBy("c.campus")
      .addGroupBy("c.description")
      .addGroupBy("c.enrolment_rules")
      .addGroupBy("c.equivalents")
      .addGroupBy("c.exclusions")
      .addGroupBy("c.faculty")
      .addGroupBy("c.field_of_education")
      .addGroupBy("c.gen_ed")
      .addGroupBy("c.level")
      .addGroupBy("c.school")
      .addGroupBy("c.study_level")
      .addGroupBy("c.terms")
      .addGroupBy("c.title")
      .addGroupBy("c.uoc")
      .getRawMany();
    return rawCourses.map((rawCourse) => {
      const course = new CourseEntity();
      course.courseCode = rawCourse.course_code;
      course.attributes = rawCourse.attributes;
      course.calendar = rawCourse.calendar;
      course.campus = rawCourse.campus;
      course.description = rawCourse.description;
      course.enrolmentRules = rawCourse.enrolment_rules;
      course.equivalents = rawCourse.equivalents;
      course.exclusions = rawCourse.exclusions;
      course.faculty = rawCourse.faculty;
      course.fieldOfEducation = rawCourse.field_of_education;
      course.genEd = rawCourse.gen_ed;
      course.level = rawCourse.level;
      course.school = rawCourse.school;
      course.studyLevel = rawCourse.study_level;
      course.terms = rawCourse.terms;
      course.title = rawCourse.title;
      course.uoc = rawCourse.uoc;
      course.rating = rawCourse.avg_overall_rating;
      course.overallRating = rawCourse.avg_overall_rating;
      course.manageability = rawCourse.avg_manageability;
      course.usefulness = rawCourse.avg_usefulness;
      course.enjoyability = rawCourse.avg_enjoyability;
      course.reviewCount = +rawCourse.review_count;
      return course;
    });
  }
  */

  async getCoursesFromOffset(offset: number): Promise<CourseEntity[]> {
    const rawCourses = await this.manager
      .createQueryBuilder(CourseEntity, "c")
      .select([
        "c.*",
        "AVG(r.overall_rating) AS avg_overall_rating",
        "AVG(r.manageability) AS avg_manageability",
        "AVG(r.usefulness) AS avg_usefulness",
        "AVG(r.enjoyability) AS avg_enjoyability",
        "COUNT(r.review_id) AS review_count",
      ])
      .leftJoin("c.reviews", "r")
      .groupBy("c.course_code")
      .addGroupBy("c.attributes")
      .addGroupBy("c.calendar")
      .addGroupBy("c.campus")
      .addGroupBy("c.description")
      .addGroupBy("c.enrolment_rules")
      .addGroupBy("c.equivalents")
      .addGroupBy("c.exclusions")
      .addGroupBy("c.faculty")
      .addGroupBy("c.field_of_education")
      .addGroupBy("c.gen_ed")
      .addGroupBy("c.level")
      .addGroupBy("c.school")
      .addGroupBy("c.study_level")
      .addGroupBy("c.terms")
      .addGroupBy("c.title")
      .addGroupBy("c.uoc")
      .orderBy("review_count", "DESC")
      .limit(25)
      .offset(offset)
      .getRawMany();
    return rawCourses.map((rawCourse) => {
      const course = new CourseEntity();
      course.courseCode = rawCourse.course_code;
      course.attributes = rawCourse.attributes;
      course.calendar = rawCourse.calendar;
      course.campus = rawCourse.campus;
      course.description = rawCourse.description;
      course.enrolmentRules = rawCourse.enrolment_rules;
      course.equivalents = rawCourse.equivalents;
      course.exclusions = rawCourse.exclusions;
      course.faculty = rawCourse.faculty;
      course.fieldOfEducation = rawCourse.field_of_education;
      course.genEd = rawCourse.gen_ed;
      course.level = rawCourse.level;
      course.school = rawCourse.school;
      course.studyLevel = rawCourse.study_level;
      course.terms = rawCourse.terms;
      course.title = rawCourse.title;
      course.uoc = rawCourse.uoc;
      course.rating = rawCourse.avg_overall_rating;
      course.overallRating = rawCourse.avg_overall_rating;
      course.manageability = rawCourse.avg_manageability;
      course.usefulness = rawCourse.avg_usefulness;
      course.enjoyability = rawCourse.avg_enjoyability;
      course.reviewCount = +rawCourse.review_count;
      return course;
    });
  }

  async getCoursesById(courseCodes: string[]): Promise<CourseEntity[]> {
    return await this.manager.findBy(CourseEntity, {
      courseCode: In(courseCodes),
    });
  }

  async getCourse(courseCode: string): Promise<CourseEntity | null> {
    return await this.manager.findOneBy(CourseEntity, {
      courseCode,
    });
  }

  async save(course: CourseEntity): Promise<CourseEntity> {
    return await this.manager.save(CourseEntity, course);
  }
}
