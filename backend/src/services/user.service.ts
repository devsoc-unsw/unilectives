import { getLogger } from "../utils/logger";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../modules/Auth";
import {
  CreateUser,
  UserTokenSuccessResponse,
} from "../api/schemas/user.schema";
import { ReviewRepository } from "../repositories/review.repository";

export class UserService {
  private logger = getLogger();
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async saveUser(zid: string): Promise<UserTokenSuccessResponse> {
    const userExists = await this.userRepository.getUser(zid);

    // existing user
    if (userExists) {
      this.logger.info(`User with zid ${zid} already exists in the database.`);
      throw new HTTPError(badRequest);
    }

    // first time user
    const newUser: CreateUser = {
      zid: zid,
      isAdmin: false,
    };

    const savedUser = await this.userRepository.saveUser(newUser);
    const token = this.authService.createToken(zid);

    return {
      user: {
        ...savedUser,
        bookmarkedCourses: [],
        bookmarkedReviews: [],
        reports: [],
        reviews: [],
      },
      token,
    };
  }

  async getUser(zid: string) {
    // get user info
    const userInfo = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    const bookmarkedReviews = await this.reviewRepository.getReviewsById(userInfo.bookmarkedReviews);

    return {
      user: {
        ...userInfo,
        bookmarkedReviews,
      },
    };
  }

  async loginUser(zid: string): Promise<UserTokenSuccessResponse> {
    const token = this.authService.createToken(zid);
    const { user } = await this.getUser(zid);
    return { user, token };
  }
}
