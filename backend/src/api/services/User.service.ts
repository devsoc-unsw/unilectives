import { IPostUserSuccessResponse } from "IApiResponses";
import { getLogger } from "../../utils/Logger";
import { UserEntity } from "../../entity/User";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { EntityManager } from "typeorm";
import { UserRepository } from "../../repositories/User.repository";

export class UserService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private repo = new UserRepository(this.manager);

  // TODO: Add the csesoc login stuff
  async createUser(zid: string): Promise<IPostUserSuccessResponse | undefined> {
    const userExists = await this.repo.getUser(zid);

    // existing user
    if (userExists) {
      this.logger.debug(`User with zid ${zid} already exists in the database.`);
      return { user: convertUserEntityToInterface(userExists) };
    }

    // first time user
    const newUser = new UserEntity();
    newUser.zid = zid;
    newUser.isAdmin = false;
    newUser.bookmarkedCourses = [];
    newUser.bookmarkedReviews = [];
    newUser.reviews = [];
    newUser.reports = [];

    const saveUser = await this.repo.saveUser(newUser);

    if (!saveUser) {
      this.logger.error(`Database could not save user with zid ${zid}`);
      throw new HTTPError(internalServerError);
    }
    return { user: convertUserEntityToInterface(saveUser) };
  }
}
