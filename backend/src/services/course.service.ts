import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import {
  badRequest,
  internalServerError,
  unauthorizedError,
} from "../utils/constants";
import { CourseRepository } from "../repositories/course.repository";
import { UserRepository } from "../repositories/user.repository";
import RedisClient from "../modules/redis";
import {
  Course,
  CourseBody,
  CoursesSuccessResponse,
} from "../api/schemas/course.schema";
import { SearchFilterCriteria } from "ICourseFilter";

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

  async searchCourse(
    searchTerm: string,
  ): Promise<CoursesSuccessResponse | undefined> {
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

  async searchCourseCriteria(criteria: SearchFilterCriteria): Promise<CoursesSuccessResponse | undefined> {
    console.log("here")
    // Construct a cache key based on the filter criteria
    const cacheKey = JSON.stringify(criteria);

    let courses = await this.redis.get<Course[]>(`searchCoursesCriteria:${cacheKey}`);

    if (!courses) {
      this.logger.info(`Cache miss on searchCoursesCriteria:${cacheKey}`);
      // Call repository function passing the filter criteria
      courses = await this.courseRepository.searchCoursesByCriteria(criteria);

      await this.redis.set(`searchCoursesCriteria:${cacheKey}`, courses);
    } else {
      this.logger.info(`Cache hit on searchCoursesCriteria:${cacheKey}`);
    }

    this.logger.info(`Found ${courses.length} courses.`);
    return { courses };
  }

  async flushKey(zid: string, key: string) {
    const userInfo = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    if (!userInfo.isAdmin) {
      this.logger.error(`Non-admin ${zid} tried flushing key`);
      throw new HTTPError(unauthorizedError);
    }

    await this.redis.del(key);
  }

  async flushAll(zid: string) {
    const userInfo = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    if (!userInfo.isAdmin) {
      this.logger.error(`Non-admin ${zid} tried flushing all`);
      throw new HTTPError(unauthorizedError);
    }

    await this.redis.flushAll();
  }
}
