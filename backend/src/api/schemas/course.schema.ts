import { z } from "zod";

export const UpdateCourseSchema = z
  .object({
    course: z.object({
      courseCode: z.string(),
      archived: z.boolean(),
      attributes: z.array(z.string()),
      calendar: z.string(),
      campus: z.string(),
      description: z.string(),
      enrolmentRules: z.string(),
      equivalents: z.array(z.string()),
      exclusions: z.array(z.string()),
      faculty: z.string(),
      fieldOfEducation: z.string(),
      genEd: z.boolean(),
      level: z.number(),
      school: z.string(),
      studyLevel: z.string(),
      terms: z.array(z.number()),
      title: z.string(),
      uoc: z.number(),
      rating: z.number(),
    }),
  })
  .strict();

export type UpdateCourse = z.infer<typeof UpdateCourseSchema>;

export const BookmarkCourseSchema = z
  .object({
    courseCode: z.string(),
    zid: z.string(),
    bookmark: z.boolean(),
  })
  .strict();

export type BookmarkCourse = z.infer<typeof BookmarkCourseSchema>;

export const CourseSchema = z
  .object({
    courseCode: z.string(),
    archived: z.boolean(),
    attributes: z.string().array(),
    calendar: z.string(),
    campus: z.string(),
    description: z.string(),
    enrolmentRules: z.string(),
    equivalents: z.string().array(),
    exclusions: z.string().array(),
    faculty: z.string(),
    fieldOfEducation: z.string(),
    genEd: z.boolean(),
    level: z.number(),
    school: z.string(),
    studyLevel: z.string(),
    terms: z.number().array(),
    title: z.string(),
    uoc: z.number(),
    reviewCount: z.number(),
    overallRating: z.number().nullable(),
    manageability: z.number().nullable(),
    usefulness: z.number().nullable(),
    enjoyability: z.number().nullable(),
  })
  .strict();

export type Course = z.infer<typeof CourseSchema>;

const CourseBodySchema = z
  .object({
    course: CourseSchema,
  })
  .strict();

export type CourseBody = z.infer<typeof CourseBodySchema>;

const CoursesSuccessResponseSchema = z
  .object({
    courses: z.array(CourseSchema),
  })
  .strict();

export type CoursesSuccessResponse = z.infer<
  typeof CoursesSuccessResponseSchema
>;

export const CourseCodeSchema = z.string().regex(/^[A-Za-z]{4}\d{4}$/);
