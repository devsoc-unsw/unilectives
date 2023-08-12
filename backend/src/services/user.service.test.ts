import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { UserService } from "./user.service";
import {
  getUserEntity,
  getMockNewUser,
  getMockUser,
  getMockCourses,
} from "../utils/testData";
import { CourseRepository } from "../repositories/course.repository";
import { UserRepository } from "../repositories/user.repository";
import { ReviewRepository } from "../repositories/review.repository";
import RedisClient from "../modules/redis";

describe("UserService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  const courseRepository = {} as CourseRepository;
  const userRepository = {} as UserRepository;
  const reviewRepository = {} as ReviewRepository;
  const redis = {} as RedisClient;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userService = () =>
    new UserService(userRepository, reviewRepository, redis);

  describe("createUser", () => {
    it("should resolve and return new created user", async () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();

      redis.get = jest.fn().mockReturnValue(false);
      redis.set = jest.fn().mockReturnValue("ok");
      userRepository.getUser = jest.fn().mockReturnValue(null);
      userRepository.saveUser = jest.fn().mockReturnValue(entity);

      const result = await service.saveUser(user.zid);
      expect(result.user).toEqual(true);
    });
  });

  describe("getUser", () => {
    it("should throw HTTP 400 error if could user not in database", () => {
      const service = userService();
      const user = getMockNewUser();

      userRepository.getUser = jest.fn().mockReturnValue(null);

      const errorResult = new HTTPError(badRequest);
      expect(service.getUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return existing user", async () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();
      const course = getMockCourses()[0];

      userRepository.getUser = jest.fn().mockReturnValue(entity);
      reviewRepository.getReviewsById = jest.fn().mockReturnValue([]);
      courseRepository.getCoursesById = jest.fn().mockReturnValue([]);

      courseRepository.getCoursesById = jest.fn().mockReturnValueOnce([course]);
      const result = await service.getUser(user.zid);
      expect(result.user).toEqual(user);
    });
  });
});
