import { PrismaClient, courses } from "@prisma/client";
import { Course } from "../api/schemas/course.schema";
import { EntityManager } from "typeorm";
import { toCamelCase } from "../converters/prisma.converter";

export class CourseRepository {
  constructor(private readonly manager: EntityManager) {}
  // will be passed in as a constructor argument after full migration
  private prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:password@0.0.0.0:5432/mydb?schema=cselectives",
      },
    },
  });

  private async createRatings(courseCode: string): Promise<Course> {
    const result = (await this.prisma.$queryRaw`
    SELECT
      AVG(r.overall_rating) AS "overallRating",
      AVG(r.manageability) AS "manageability",
      AVG(r.usefulness) AS "usefulness",
      AVG(r.enjoyability) AS "enjoyability",
      COUNT(r.review_id) AS "reviewCount"
    FROM courses c
    LEFT JOIN reviews r ON c.course_code = r.course_code
    WHERE c.course_code = ${courseCode}
    GROUP BY c.course_code
    `) as courses[];

    return result.map((course) =>
      toCamelCase(course)
    )[0] as Course;
  }

  private async processRatings(courses: courses[]): Promise<Course[]> {
    const courseDataWithRatings = (await Promise.all(
      courses.map(async (course) => {
        const ratings = await this.createRatings(course.courseCode);
        return { ...course, ...ratings };
      })
    )) as Course[];
    return courseDataWithRatings;
  }

  async getAllCourses(): Promise<Course[]> {
    const rawCourseData: courses[] = await this.prisma.courses.findMany();
    return this.processRatings(rawCourseData);
  }

  async getCoursesFromOffset(offset: number): Promise<Course[]> {
    const rawCourseData = await this.prisma.courses.findMany({
      skip: offset,
      take: 25,
      orderBy: { courseCode: "asc" },
    });
    return this.processRatings(rawCourseData);
  }

  async getCoursesById(courseCodes: string[]): Promise<Course[]> {
    const rawCourseData = (await this.prisma.courses.findMany({
      where: {
        courseCode: {
          in: courseCodes,
        },
      },
    })) as courses[];
    return this.processRatings(rawCourseData);
  }

  async getCourse(courseCode: string): Promise<Course | null> {
    const course = (await this.prisma.courses.findUnique({
      where: {
        courseCode: courseCode,
      },
    })) as courses;
    return this.createRatings(course.courseCode);
  }

  async save(course: Course): Promise<Course> {
    const rawCourseData = (await this.prisma.courses.findUnique({
      where: {
        courseCode: course.courseCode,
      },
    })) as courses;
    const newCourseData = await this.prisma.courses.upsert({
      where: { courseCode: rawCourseData.courseCode },
      update: { ...rawCourseData },
      create: { ...rawCourseData },
    });
    return this.createRatings(newCourseData.courseCode);
  }
}
