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

export const BookmarkCourseSchema = z
  .object({
    courseCode: z.string(),
    zid: z.string(),
    bookmark: z.boolean(),
  })
  .strict();

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
    rating: z.number(),
    reviewCount: z.number(),
    overallRating: z.number(),
    manageability: z.number(),
    usefulness: z.number(),
    enjoyability: z.number(),
  })
  .strict();

const CourseBodySchema = z
  .object({
    course: CourseSchema,
  })
  .strict();

export type CourseBody = z.infer<typeof CourseBodySchema>;

export const CoursesSuccessResponseSchema = z
  .object({
    courses: z.array(CourseSchema),
  })
  .strict();
