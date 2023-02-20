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
