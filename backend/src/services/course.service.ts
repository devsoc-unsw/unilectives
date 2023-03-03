import {
  IGetCoursesSuccessResponse,
  IPostCoursesBookmarkRequestBody,
  IPutCoursesSuccessResponse,
} from "IApiResponses";
import { getLogger } from "../utils/logger";
import { CourseEntity } from "../entity/Course";
import {
  convertCourseEntityToInterface,
  convertCourseInterfaceToEntity,
} from "../converters/course.converter";
import { HTTPError } from "../utils/errors";
import { badRequest, internalServerError } from "../utils/constants";
import { CourseRepository } from "../repositories/course.repository";
import { ICourse } from "ICourse";
import { UserRepository } from "../repositories/user.repository";

export class CourseService {
  private logger = getLogger();
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository
  ) {}

  /* GET ALL COURSES SERVICE
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
  */

  async getCoursesFromOffset(
    offset: number
  ): Promise<IGetCoursesSuccessResponse | undefined> {
    const courses: CourseEntity[] =
      await this.courseRepository.getCoursesFromOffset(offset);
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

    const newCourseEntity: CourseEntity = convertCourseInterfaceToEntity({
      ...course,
      ...updatedCourse,
    });
    course = await this.courseRepository.save(newCourseEntity);

    this.logger.info(
      `Successfully updated course with courseCode ${updatedCourse.courseCode}.`
    );
    return {
      course: convertCourseEntityToInterface(course),
    };
  }

  async bookmarkCourse(
    bookmarkDetails: IPostCoursesBookmarkRequestBody
  ): Promise<IPutCoursesSuccessResponse | undefined> {
    const course = await this.courseRepository.getCourse(
      bookmarkDetails.courseCode
    );

    if (!course) {
      this.logger.error(
        `There is no course with courseCode ${bookmarkDetails.courseCode}.`
      );
      throw new HTTPError(badRequest);
    }
    let user = await this.userRepository.getUser(bookmarkDetails.zid);

    if (!user) {
      this.logger.error(`There is no user with zid ${bookmarkDetails.zid}.`);
      throw new HTTPError(badRequest);
    }

    if (bookmarkDetails.bookmark) {
      user.bookmarkedCourses = [
        ...user.bookmarkedCourses,
        bookmarkDetails.courseCode,
      ];
    } else {
      user.bookmarkedCourses.filter(
        (course) => course !== bookmarkDetails.courseCode
      );
    }

    user = await this.userRepository.saveUser(user);

    this.logger.info(
      `Successfully ${
        bookmarkDetails.bookmark ? "bookmarked" : "removed bookmarked"
      } course with courseCode ${
        bookmarkDetails.courseCode
      } for user with zID ${bookmarkDetails.zid}.`
    );
    return {
      course: convertCourseEntityToInterface(course),
    };
  }
}
