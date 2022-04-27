import {
  IGetCoursesSuccessResponse,
  IPutCoursesSuccessResponse,
} from "IApiResponses";
import { getLogger } from "../../utils/Logger";
import { CourseEntity } from "../../entity/Course";
import {
  convertCourseEntityToInterface,
  convertCourseInterfaceToEntity,
} from "../../converters/Course.converter";
import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { EntityManager } from "typeorm";
import { CourseRepository } from "../../repositories/Course.repository";
import { ICourse } from "ICourse";

export class CourseService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private courseRepository = new CourseRepository(this.manager);

  async getCourses(): Promise<IGetCoursesSuccessResponse | undefined> {
    const courses: CourseEntity[] = await this.courseRepository.getAllCourses();
    if (courses.length === 0) {
      this.logger.error("Database returned with no courses.");
      throw new HTTPError(internalServerError);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return {
      courses: courses.map(convertCourseEntityToInterface),
    };
  }

  async updateCourse(
    updatedCourse: ICourse
  ): Promise<IPutCoursesSuccessResponse | undefined> {
    let course = await this.courseRepository.getCourse(
      updatedCourse.courseCode
    );

    if (!course) {
      this.logger.error(
        `There is no course with courseCode ${updatedCourse.courseCode}.`
      );
      throw new HTTPError(badRequest);
    }

    const newCourseEntity: CourseEntity =
      convertCourseInterfaceToEntity(updatedCourse);
    course = await this.courseRepository.save(newCourseEntity);

    this.logger.info(
      `Successfully updated course with courseCode ${updatedCourse.courseCode}.`
    );
    return {
      course: convertCourseEntityToInterface(course),
    };
  }
}
