import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import { badRequest, internalServerError } from "../utils/constants";
import { CourseRepository } from "../repositories/course.repository";
import { UserRepository } from "../repositories/user.repository";
import RedisClient from "../modules/redis";
import {
  BookmarkCourse,
  Course,
  CourseBody,
  CoursesSuccessResponse,
} from "../api/schemas/course.schema";

export class CourseService {
  private logger = getLogger();
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
    private readonly redis: RedisClient,
  ) {}

  async getCourses(): Promise<CoursesSuccessResponse | undefined> {
    const courses = await this.courseRepository.getAllCourses();
    if (courses.length === 0) {
      this.logger.error("Database returned with no courses.");
      throw new HTTPError(internalServerError);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return { courses };
  }

  async getCoursesFromOffset(
    offset: number,
  ): Promise<CoursesSuccessResponse | undefined> {
    let courses = await this.redis.get<Course[]>(`courses:${offset}`);

    if (!courses) {
      this.logger.info(`Cache miss on courses:${offset}`);
      courses = await this.courseRepository.getCoursesFromOffset(offset);
      await this.redis.set(`courses:${offset}`, courses);
    } else {
      this.logger.info(`Cache hit on courses:${offset}`);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return { courses };
  }

  async getCourse(courseCode: string): Promise<CourseBody | undefined> {
    const cacheCourse = await this.redis.get<Course>(`course:${courseCode}`);
    let course: Course | null;

    if (!cacheCourse) {
      this.logger.info(`Cache miss on course:${courseCode}`);
      course = await this.courseRepository.getCourse(courseCode);
      if (!course) {
        this.logger.error(`There is no course with courseCode ${courseCode}.`);
        throw new HTTPError(badRequest);
      }
      await this.redis.set(`course:${courseCode}`, course);
    } else {
      this.logger.info(`Cache hit on course:${courseCode}`);
      course = cacheCourse;
    }

    this.logger.info(`Found course with courseCode ${courseCode}.`);
    return { course };
  }

  async searchCourse(searchTerm: string): Promise<CoursesSuccessResponse | undefined> {
    let courses = await this.redis.get<Course[]>(`searchCourses:${searchTerm}`);    

    if (!courses) {
      this.logger.info(`Cache miss on searchCourses:${searchTerm}`);
      courses = await this.courseRepository.searchCourse(searchTerm);
      await this.redis.set(`searchCourses:${searchTerm}`, courses);
    } else {
      this.logger.info(`Cache hit on searchCourses:${searchTerm}`);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return { courses };
  }

  async updateCourse(updatedCourse: Course): Promise<CourseBody | undefined> {
    let course = await this.courseRepository.getCourse(
      updatedCourse.courseCode,
    );

    if (!course) {
      this.logger.error(
        `There is no course with courseCode ${updatedCourse.courseCode}.`,
      );
      throw new HTTPError(badRequest);
    }

    course = await this.courseRepository.save(course);

    this.logger.info(
      `Successfully updated course with courseCode ${updatedCourse.courseCode}.`,
    );
    return { course };
  }

  async bookmarkCourse(
    bookmarkDetails: BookmarkCourse,
  ): Promise<CourseBody | undefined> {
    const course = await this.courseRepository.getCourse(
      bookmarkDetails.courseCode,
    );

    if (!course) {
      this.logger.error(
        `There is no course with courseCode ${bookmarkDetails.courseCode}.`,
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
        (course) => course !== bookmarkDetails.courseCode,
      );
    }

    user = await this.userRepository.saveUser(user);

    this.logger.info(
      `Successfully ${
        bookmarkDetails.bookmark ? "bookmarked" : "removed bookmarked"
      } course with courseCode ${
        bookmarkDetails.courseCode
      } for user with zID ${bookmarkDetails.zid}.`,
    );
    return { course };
  }

  async flushKey(key: string) {
    await this.redis.del(key);
  }
}
