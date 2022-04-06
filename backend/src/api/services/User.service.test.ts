import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { UserService } from "./User.service";
import {
  getUserEntity,
  getMockNewUser,
  getMockUser,
  getMockCourses,
} from "../../utils/testData";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { DataSource } from "typeorm";

describe("UserService", () => {
  let manager: EntityManager;
  let connection: DataSource;

  beforeEach(() => {
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userService = () => new UserService(manager);

  describe("createUser", () => {
    it("should return existing user info if user in database", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();
      const course = getMockCourses()[0];
      manager.findOneBy = jest.fn().mockReturnValue(entity);
      manager.findBy = jest
        .fn()
        .mockReturnValueOnce([])
        .mockReturnValueOnce([course]);
      expect(service.createUser(user.zid)).resolves.toEqual({ user });
    });

    it("should resolve and return new created user", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();
      manager.findOneBy = jest.fn().mockReturnValue(null);
      manager.save = jest.fn().mockReturnValue(entity);
      expect(service.createUser(user.zid)).resolves.toEqual({ user });
    });
  });

  describe("getUser", () => {
    it("should throw HTTP 404 error if could user not in database", () => {
      const service = userService();
      const user = getMockNewUser();
      manager.findOneBy = jest.fn().mockReturnValue(null);
      const errorResult = new HTTPError(badRequest);
      expect(service.getUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return existing user", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockUser();
      const course = getMockCourses()[0];
      manager.findOneBy = jest.fn().mockReturnValue(entity);
      manager.findBy = jest
        .fn()
        .mockReturnValueOnce([])
        .mockReturnValueOnce([course]);
      expect(service.getUser(user.zid)).resolves.toEqual({ user });
    });
  });
});
