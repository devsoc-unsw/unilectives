import { IGetCoursesSuccessResponse } from "IApiResponses";
import { getLogger } from "../../utils/Logger";
import { CourseEntity } from "../../entity/Course";
import { convertCourseEntityToInterface } from "../../converters/Course.converter";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { EntityManager } from "typeorm";

export class CourseService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}

  async getCourses(): Promise<IGetCoursesSuccessResponse | undefined> {
    const courses: CourseEntity[] = await this.manager.find(CourseEntity);
    if (courses.length === 0) {
      this.logger.error("Database returned with no courses.");
      throw new HTTPError(internalServerError);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return {
      courses: courses.map(convertCourseEntityToInterface),
    };
  }
}
