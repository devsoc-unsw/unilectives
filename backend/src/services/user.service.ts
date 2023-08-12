import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { UserRepository } from "../repositories/user.repository";
import { CreateUser } from "../api/schemas/user.schema";
import { ReviewRepository } from "../repositories/review.repository";
import RedisClient from "../modules/redis";

export class UserService {
  private logger = getLogger();
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly redis: RedisClient,
  ) {}

  async saveUser(zid: string) {
    const userExists = await this.redis.get<boolean>(`user:${zid}`);
    if (!userExists) {
      this.logger.info(`User with zid ${zid} not in cache.`);
      const user = await this.userRepository.getUser(zid);

      // first time user
      if (!user) {
        const newUser: CreateUser = {
          zid: zid,
          isAdmin: false,
        };
        await this.userRepository.saveUser(newUser);
        this.logger.info(`User with zid ${zid} created.`);
      } else {
        this.logger.info(
          `User with zid ${zid} already exists in the database.`,
        );
      }

      await this.redis.set(`user:${zid}`, true);
    }

    return { user: true };
  }

  async getUser(zid: string) {
    // get user info
    const userInfo = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    const bookmarkedReviews = await this.reviewRepository.getReviewsById(
      userInfo.bookmarkedReviews,
    );

    return {
      user: {
        ...userInfo,
        bookmarkedReviews,
      },
    };
  }
}
