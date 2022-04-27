import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { CourseService } from "./Course.service";
import { getCourseEntity, getMockCourses } from "../../utils/testData";
import { DataSource, EntityManager } from "typeorm";

describe("CourseService", () => {
  let manager: EntityManager;
  let connection: DataSource;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
  });
  const courseService = () => new CourseService(manager);

  describe("getCourses", () => {
    it("should throw HTTP 500 error if no courses in database", () => {
      const service = courseService();
      manager.find = jest.fn().mockReturnValue([]);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getCourses()).rejects.toThrow(errorResult);
    });

    it("should resolve and return courses", () => {
      const service = courseService();
      const courses = getMockCourses();
      manager.find = jest.fn().mockReturnValue(courses);

      expect(service.getCourses()).resolves.toEqual({
        courses,
      });
    });
  });

  describe("updateCourse", () => {
    it("should throw HTTP 400 error if no courses in database", () => {
      const service = courseService();
      const course = getMockCourses()[0];
      manager.findOneBy = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.updateCourse(course)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new updated course", () => {
      const service = courseService();
      const entity = getCourseEntity();
      const course = getMockCourses()[0];
      manager.findOneBy = jest.fn().mockReturnValue(entity);
      manager.save = jest.fn().mockReturnValue(entity);

      expect(service.updateCourse(course)).resolves.toEqual({
        course: course,
      });
    });
  });
});
