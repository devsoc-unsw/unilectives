import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { CourseRepository } from "../../repositories/Course.repository";
import { CourseService } from "./Course.service";
import {
  getCourseEntity,
  getMockCourses,
  getUserEntity,
} from "../../utils/testData";
import { UserRepository } from "../../repositories/User.repository";
import { IPostCoursesBookmarkRequestBody } from "IApiResponses";

describe("CourseService", () => {
  let courseRepository: CourseRepository;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    courseRepository = new CourseRepository();
    userRepository = new UserRepository();
  });
  const courseService = () =>
    new CourseService(courseRepository, userRepository);

  describe("getCourses", () => {
    it("should throw HTTP 500 error if no courses in database", () => {
      const service = courseService();
      courseRepository.getAllCourses = jest.fn().mockReturnValue([]);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getCourses()).rejects.toThrow(errorResult);
    });

    it("should resolve and return courses", () => {
      const service = courseService();
      const courses = getMockCourses();
      courseRepository.getAllCourses = jest.fn().mockReturnValue(courses);

      expect(service.getCourses()).resolves.toEqual({
        courses,
      });
    });
  });

  describe("updateCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateCourse(course)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new updated course", () => {
      const service = courseService();
      const entity = getCourseEntity();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockReturnValue(entity);
      courseRepository.save = jest.fn().mockReturnValue(entity);

      expect(service.updateCourse(course)).resolves.toEqual({
        course: course,
      });
    });
  });

  describe("bookmarkCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      courseRepository.getCourse = jest.fn().mockReturnValue(undefined);
      const request: IPostCoursesBookmarkRequestBody = {
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
      courseRepository.getCourse = jest.fn().mockReturnValue(courses[0]);
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      const request: IPostCoursesBookmarkRequestBody = {
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
      courseRepository.getCourse = jest.fn().mockReturnValue(courses[0]);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      userRepository.save = jest.fn().mockReturnValue(user);
      const request: IPostCoursesBookmarkRequestBody = {
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
      courseRepository.getCourse = jest.fn().mockReturnValue(courses[0]);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      userRepository.save = jest.fn().mockReturnValue(user);
      const request: IPostCoursesBookmarkRequestBody = {
        courseCode: courses[0].courseCode,
        zid: "5311111",
        bookmark: false,
      };

      expect(service.bookmarkCourse(request)).resolves.toEqual({
        course: courses[0],
      });
    });
  });
});
