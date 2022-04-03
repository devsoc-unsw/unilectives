import { IPostUserSuccessResponse } from "IApiResponses";
import { getLogger } from "../../utils/Logger";
import { UserEntity } from "../../entity/User";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { EntityManager } from "typeorm";

export class UserService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}

  private async getUser(zid: string): Promise<UserEntity | null> {
    return await this.manager.findOne(UserEntity, {
      relations: ["reports", "reviews"],
      where: { zid },
    });
  }
  // TODO: Add the csesoc login stuff
  async createUser(zid: string): Promise<IPostUserSuccessResponse | undefined> {
    const userExists = await this.getUser(zid);

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

    const saveUser = await this.manager.save(UserEntity, newUser);

    if (!saveUser) {
      this.logger.error(`Database could not save user with zid ${zid}`);
      throw new HTTPError(internalServerError);
    }
    return { user: convertUserEntityToInterface(saveUser) };
  }
}
