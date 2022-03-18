import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { CourseRepository } from "../../repositories/Course.repository";
import { CourseService } from "./Course.service";
import { getCourseEntity, getMockCourses } from "../../utils/testData";

describe("CourseService", () => {
  let repository: CourseRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    repository = new CourseRepository();
  });
  const courseService = () => new CourseService(repository);

  describe("getCourses", () => {
    it("should throw HTTP 500 error if no courses in database", () => {
      const service = courseService();
      repository.getAllCourses = jest.fn().mockReturnValue([]);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getCourses()).rejects.toThrow(errorResult);
    });

    it("should resolve and return courses", () => {
      const service = courseService();
      const courses = getMockCourses();
      repository.getAllCourses = jest.fn().mockReturnValue(courses);

      expect(service.getCourses()).resolves.toEqual({
        courses,
      });
    });
  });

  describe("updateCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      repository.getCourse = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateCourse(course)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new updated course", () => {
      const service = courseService();
      const entity = getCourseEntity();
      const course = getMockCourses()[0];
      repository.getCourse = jest.fn().mockReturnValue(entity);
      repository.save = jest.fn().mockReturnValue(entity);

      expect(service.updateCourse(course)).resolves.toEqual({
        course: course,
      });
    });
  });
});
