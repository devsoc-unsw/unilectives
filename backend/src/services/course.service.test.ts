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

  describe("updateCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockResolvedValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateCourse(course)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new updated course", () => {
      const service = courseService();
      const entity = getCourseEntity();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockResolvedValue(entity);
      courseRepository.save = jest.fn().mockResolvedValue(entity);

      expect(service.updateCourse(course)).resolves.toEqual({
        course: course,
      });
    });
  });

  describe("bookmarkCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockResolvedValue(undefined);

      const request: BookmarkCourse = {
        courseCode: course.courseCode,
        zid: "5311111",
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkCourse(request)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if no user in database", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getCourse = jest.fn().mockResolvedValue(courses[0]);
      userRepository.getUser = jest.fn().mockResolvedValue(undefined);

      const request: BookmarkCourse = {
        courseCode: courses[0].courseCode,
        zid: "5311111",
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkCourse(request)).rejects.toThrow(errorResult);
    });

    it("should resolve and return bookmarked course", () => {
      const service = courseService();
      const courses = getMockCourses();
      const user = getUserEntity();
      courseRepository.getCourse = jest.fn().mockResolvedValue(courses[0]);
      userRepository.getUser = jest.fn().mockResolvedValue(user);

      userRepository.saveUser = jest.fn().mockResolvedValue(user);
      const request: BookmarkCourse = {
        courseCode: courses[0].courseCode,
        zid: "5311111",
        bookmark: true,
      };

      expect(service.bookmarkCourse(request)).resolves.toEqual({
        course: courses[0],
      });
    });

    it("should resolve and remove bookmarked course", () => {
      const service = courseService();
      const courses = getMockCourses();
      const user = getUserEntity();
      courseRepository.getCourse = jest.fn().mockResolvedValue(courses[0]);
      userRepository.getUser = jest.fn().mockResolvedValue(user);

      userRepository.saveUser = jest.fn().mockResolvedValue(user);
      const request: BookmarkCourse = {
        courseCode: courses[0].courseCode,
        zid: "5311111",
        bookmark: false,
      };
      expect(service.bookmarkCourse(request)).resolves.toEqual({
        course: courses[0],
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
});
