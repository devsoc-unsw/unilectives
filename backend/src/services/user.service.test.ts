import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { UserService } from "./user.service";
import {
  getUserEntity,
  getMockNewUser,
  getMockUser,
  getMockCourses,
} from "../utils/testData";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { AuthService } from "../modules/Auth";
import { CourseRepository } from "../repositories/course.repository";
import { UserRepository } from "../repositories/user.repository";
import { ReviewRepository } from "../repositories/review.repository";

describe("UserService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  let manager: EntityManager;
  let auth: AuthService;
  const courseRepository = {} as CourseRepository;
  const userRepository = {} as UserRepository;
  const reviewRepository = {} as ReviewRepository;

  beforeEach(() => {
    manager = {} as EntityManager;
    auth = new AuthService();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userService = () =>
    new UserService(auth, courseRepository, userRepository, reviewRepository);

  describe("createUser", () => {
    it("should throw HTTP 400 error if could user exists in database", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();

      userRepository.getUser = jest.fn().mockReturnValue(entity);

      const errorResult = new HTTPError(badRequest);
      expect(service.createUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created user", async () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();

      userRepository.getUser = jest.fn().mockReturnValue(null);
      userRepository.saveUser = jest.fn().mockReturnValue(entity);

      const result = await service.createUser(user.zid);
      expect(result.user).toEqual(user);
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
      manager.findBy = jest.fn().mockReturnValue([]);
      const result = await service.getUser(user.zid);
      expect(result.user).toEqual(user);
    });
  });
});
