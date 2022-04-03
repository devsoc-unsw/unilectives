import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { UserService } from "./User.service";
import { getUserEntity, getMockNewUser } from "../../utils/testData";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { DataSource } from "typeorm";

describe("UserService", () => {
  let manager: EntityManager;
  let connection: DataSource;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    connection = new DataSource({ type: "postgres" });
    manager = new EntityManager(connection);
  });

  const userService = () => new UserService(manager);

  describe("createUser", () => {
    it("should return existing user info if user in database", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();
      manager.findOne = jest.fn().mockReturnValue(entity);
      expect(service.createUser(user.zid)).resolves.toEqual({ user });
    });

    it("should throw HTTP 500 error if could not save user in database", () => {
      const service = userService();
      const user = getMockNewUser();
      manager.findOne = jest.fn().mockReturnValue(undefined);
      manager.save = jest.fn().mockReturnValue(undefined);
      const errorResult = new HTTPError(internalServerError);
      expect(service.createUser(user.zid)).rejects.toThrow(errorResult);
    });

    it("should resolve and return new created user", () => {
      const service = userService();
      const entity = getUserEntity();
      const user = getMockNewUser();
      manager.findOne = jest.fn().mockReturnValue(undefined);
      manager.save = jest.fn().mockReturnValue(entity);
      expect(service.createUser(user.zid)).resolves.toEqual({ user });
    });
  });
});
