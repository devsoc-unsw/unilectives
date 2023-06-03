import { PrismaClient } from "@prisma/client";
import {
  Course,
  CourseSchema,
} from "../api/schemas/course.schema";
import { courseFieldsWithRatings } from "../utils/constants";

export class CourseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllCourses(): Promise<Course[]> {
    const rawCourses = (await this.prisma.$queryRaw`
      SELECT
      c.course_code AS "courseCode",
      c.archived,
      c.attributes,
      c.calendar,
      c.campus,
      c.description,
      c.enrolment_rules AS "enrolmentRules",
      c.equivalents,
      c.exclusions,
      c.faculty,
      c.field_of_education AS "fieldOfEducation",
      c.gen_ed AS "genEd",
      c.level,
      c.school,
      c.study_level AS "studyLevel",
      c.terms,
      c.title,
      c.uoc,
      AVG(r.overall_rating) AS "overallRating",
      AVG(r.manageability) AS "manageability",
      AVG(r.usefulness) AS "usefulness",
      AVG(r.enjoyability) AS "enjoyability",
      CAST(COUNT(r.review_id) AS INT) AS "reviewCount"
      FROM courses c
      LEFT JOIN reviews r ON c.course_code = r.course_code
      GROUP BY c.course_code
      ORDER BY "reviewCount" DESC
      `) as any[];
      const courses = rawCourses.map(course => CourseSchema.parse(course));
      return courses;
  }

  async getCoursesFromOffset(offset: number): Promise<Course[]> {
    const courses = (await this.prisma.$queryRaw`
    SELECT
    c.course_code AS "courseCode",
    c.archived,
    c.attributes,
    c.calendar,
    c.campus,
    c.description,
    c.enrolment_rules AS "enrolmentRules",
    c.equivalents,
    c.exclusions,
    c.faculty,
    c.field_of_education AS "fieldOfEducation",
    c.gen_ed AS "genEd",
    c.level,
    c.school,
    c.study_level AS "studyLevel",
    c.terms,
    c.title,
    c.uoc,
    AVG(r.overall_rating) AS "overallRating",
    AVG(r.manageability) AS "manageability",
    AVG(r.usefulness) AS "usefulness",
    AVG(r.enjoyability) AS "enjoyability",
    CAST(COUNT(r.review_id) AS INT) AS "reviewCount"
    FROM courses c
    LEFT JOIN reviews r ON c.course_code = r.course_code
    GROUP BY c.course_code
    ORDER BY "reviewCount" DESC
    LIMIT 25 OFFSET ${offset};
    `) as any[];
    return courses;
  }

  async getCoursesById(courseCodes: string[]): Promise<Course[]> {
    const courseCodesString = courseCodes.map(code => `'${code}'`).join(',');

    const rawCourses = (await this.prisma.$queryRaw`
    SELECT
    c.course_code AS "courseCode",
    c.archived,
    c.attributes,
    c.calendar,
    c.campus,
    c.description,
    c.enrolment_rules AS "enrolmentRules",
    c.equivalents,
    c.exclusions,
    c.faculty,
    c.field_of_education AS "fieldOfEducation",
    c.gen_ed AS "genEd",
    c.level,
    c.school,
    c.study_level AS "studyLevel",
    c.terms,
    c.title,
    c.uoc,
    AVG(r.overall_rating) AS "overallRating",
    AVG(r.manageability) AS "manageability",
    AVG(r.usefulness) AS "usefulness",
    AVG(r.enjoyability) AS "enjoyability",
    CAST(COUNT(r.review_id) AS INT) AS "reviewCount"
    FROM courses c
    LEFT JOIN reviews r ON c.course_code = r.course_code
    WHERE c.course_code IN (${courseCodesString})
    GROUP BY c.course_code
    ORDER BY "reviewCount" DESC;
    `) as any[];
    const courses = rawCourses.map(course => CourseSchema.parse(course));
    return courses;
  }

  async getCourse(courseCode: string): Promise<Course | null> {
    const rawCourse = (await this.prisma.$queryRaw`
    SELECT
    c.course_code AS "courseCode",
    c.archived,
    c.attributes,
    c.calendar,
    c.campus,
    c.description,
    c.enrolment_rules AS "enrolmentRules",
    c.equivalents,
    c.exclusions,
    c.faculty,
    c.field_of_education AS "fieldOfEducation",
    c.gen_ed AS "genEd",
    c.level,
    c.school,
    c.study_level AS "studyLevel",
    c.terms,
    c.title,
    c.uoc,
    AVG(r.overall_rating) AS "overallRating",
    AVG(r.manageability) AS "manageability",
    AVG(r.usefulness) AS "usefulness",
    AVG(r.enjoyability) AS "enjoyability",
    CAST(COUNT(r.review_id) AS INT) AS "reviewCount"
    FROM courses c
    LEFT JOIN reviews r ON c.course_code = r.course_code
    WHERE c.course_code = '${courseCode}'
    GROUP BY c.course_code
    ORDER BY "reviewCount" DESC;
    `);
    const course = CourseSchema.parse(rawCourse);
    return course;
  }

  async save(course: Course): Promise<Course> {
    const newCourseData = await this.prisma.courses.upsert({
      where: { courseCode: course.courseCode },
      update: { ...course },
      create: { ...course },
    });
    const updatedCourse = this.getCourse(course.courseCode);
    const newCourse = CourseSchema.parse(updatedCourse);
    return newCourse;
  }
}
