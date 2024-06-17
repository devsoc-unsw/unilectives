import { HTTPError } from "../utils/errors";
import { badRequest, internalServerError } from "../utils/constants";
import { CourseService } from "./course.service";
import {
  getCourseEntity,
  getMockCourses,
  getUserEntity,
} from "../utils/testData";
import { UserRepository } from "../repositories/user.repository";
import { CourseRepository } from "../repositories/course.repository";
import { BookmarkCourse } from "../api/schemas/course.schema";
import RedisClient from "../modules/redis";
import { undefined } from "zod";

describe("CourseService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  const courseRepository = {} as CourseRepository;
  const userRepository = {} as UserRepository;
  const redis = new RedisClient() as RedisClient;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const courseService = () =>
    new CourseService(courseRepository, userRepository, redis);

  describe("getCourses", () => {
    it("should throw HTTP 500 error if no courses in database", () => {
      const service = courseService();
      courseRepository.getAllCourses = jest.fn().mockResolvedValue([]);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getCourses()).rejects.toThrow(errorResult);
    });

    it("should resolve and return courses", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getAllCourses = jest.fn().mockResolvedValue(courses);

      expect(service.getCourses()).resolves.toEqual({
        courses,
      });
    });
  });

  describe("searchCourses", () => {
    it("should return empty list", () => {
      const service = courseService();
      courseRepository.searchCourse = jest.fn().mockResolvedValue([]);

      expect(service.searchCourse("xddddddd")).resolves.toEqual({
        courses: [],
      });
    });

    it("should return one course", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.searchCourse = jest.fn().mockResolvedValue(courses);

      expect(service.searchCourse("comp1511")).resolves.toEqual({
        courses,
      });
    });
  });

  describe("getCourse", () => {
    it("should throw HTTP 500 error if there is no course in database", () => {
      const service = courseService();
      courseRepository.getCourse = jest.fn().mockResolvedValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.getCourse("COMP1511")).rejects.toThrow(errorResult);
    });

    it("should resolve and return course", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getCourse = jest.fn().mockResolvedValue(courses[0]);

      expect(service.getCourse("COMP1511")).resolves.toEqual({
        course: courses[0],
      });
    });
  });

  describe("getHighestEnjoyability", () => {
    it("should throw HTTP 500 error if there is no course in database", () => {
      const service = courseService();
      courseRepository.getHighestEnjoyability = jest
        .fn()
        .mockResolvedValue(undefined);
      const errorResult = new HTTPError(badRequest);
      expect(service.getHighestEnjoyability()).rejects.toThrow(errorResult);
    });

    it("should resolve and return the course with the highest enjoyability", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getHighestEnjoyability = jest
        .fn()
        .mockResolvedValue(courses[0]);
      expect(service.getHighestEnjoyability()).resolves.toEqual({
        courseCode: courses[0].courseCode,
      });
    });
  });

  describe("getHighestUsefulness", () => {
    it("should throw HTTP 500 error if there is no course in database", () => {
      const service = courseService();
      courseRepository.getHighestUsefulness = jest
        .fn()
        .mockResolvedValue(undefined);
      const errorResult = new HTTPError(badRequest);
      expect(service.getHighestUsefulness()).rejects.toThrow(errorResult);
    });

    it("should resolve and return the course with the highest usefulness", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getHighestUsefulness = jest
        .fn()
        .mockResolvedValue(courses[0]);
      expect(service.getHighestUsefulness()).resolves.toEqual({
        courseCode: courses[0].courseCode,
      });
    });
  });
});
