import { IGetCoursesSuccessResponse } from "IApiResponses";
import { CourseRepository } from "../../repositories/Course.repository";
import { getLogger } from "../../utils/Logger";
import { CourseEntity } from "../../entity/Course";
import { convertCourseEntityToInterface } from "../../converters/Course.converter";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";

export class CourseService {
  private logger = getLogger();
  constructor(private readonly courseRepository: CourseRepository) {}

  async getCourses(): Promise<IGetCoursesSuccessResponse | undefined> {
    const courses: CourseEntity[] = await this.courseRepository.getAllCourses();
    if (courses.length === 0) {
      this.logger.error("Database returned with no courses.");
      throw new HTTPError(internalServerError);
    }
    return {
      courses: courses.map((course) => convertCourseEntityToInterface(course)),
    };
  }
}
