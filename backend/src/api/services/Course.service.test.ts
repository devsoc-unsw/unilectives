import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { CourseRepository } from "../../repositories/Course.repository";
import { CourseService } from "./Course.service";
import { getMockCourses } from "../../utils/testData";

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
});
