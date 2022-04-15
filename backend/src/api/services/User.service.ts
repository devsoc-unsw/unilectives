import {
  IGetUserSuccessResponse,
  IPostUserSuccessResponse,
} from "IApiResponses";
import { getLogger } from "../../utils/Logger";
import { UserEntity } from "../../entity/User";
import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { EntityManager } from "typeorm";
import { UserRepository } from "../../repositories/User.repository";
import { ReviewRepository } from "../../repositories/Review.repository";
import { CourseRepository } from "../../repositories/Course.repository";
import { CourseEntity } from "../../entity/Course";
import { ReviewEntity } from "../../entity/Review";
import { ITokenData } from "IToken";
import * as jwt from "jsonwebtoken";

export class UserService {
  private logger = getLogger();
  constructor(private readonly manager: EntityManager) {}
  private userRepository = new UserRepository(this.manager);
  private courseRepository = new CourseRepository(this.manager);
  private reviewRepository = new ReviewRepository(this.manager);

  private createToken(zid: string): ITokenData {
    const expiresIn = "1hr";
    // TODO: make proper env file
    const secret = process.env.JWT_SECRET ?? "randomsecret";
    const tokenData = {
      zid,
    };
    return {
      expiresIn,
      token: "Bearer " + jwt.sign(tokenData, secret, { expiresIn }),
    };
  }
  async createUser(zid: string): Promise<IPostUserSuccessResponse> {
    const userExists = await this.userRepository.getUser(zid);

    // existing user
    if (userExists) {
      this.logger.debug(`User with zid ${zid} already exists in the database.`);
      throw new HTTPError(badRequest);
    }

    // first time user
    const newUser = new UserEntity();
    newUser.zid = zid;
    newUser.isAdmin = false;
    newUser.bookmarkedCourses = [];
    newUser.bookmarkedReviews = [];
    newUser.reviews = [];
    newUser.reports = [];

    const saveUser = await this.userRepository.saveUser(newUser);
    const token = this.createToken(zid);

    return { user: convertUserEntityToInterface(saveUser), token };
  }

  async getUser(zid: string): Promise<IGetUserSuccessResponse> {
    // get user info
    const userInfo: UserEntity | null = await this.userRepository.getUser(zid);
    if (!userInfo) {
      this.logger.error(`Database could not find user with zid ${zid}`);
      throw new HTTPError(badRequest);
    }

    // get user bookmarked reviews
    const bookmarkedReviews: ReviewEntity[] =
      await this.reviewRepository.getReviewsById(userInfo.bookmarkedReviews);
    const filteredBookmarkedReviews = bookmarkedReviews.filter(
      (review) => review !== undefined
    );

    // get user bookmarked courses
    const bookmarkedCourses: CourseEntity[] =
      await this.courseRepository.getCoursesById(userInfo.bookmarkedCourses);
    const filteredBookmarkedCourses = bookmarkedCourses.filter(
      (course) => course !== undefined
    );

    return {
      user: convertUserEntityToInterface(
        userInfo,
        filteredBookmarkedCourses,
        filteredBookmarkedReviews
      ),
    };
  }

  async loginUser(zid: string): Promise<IPostUserSuccessResponse> {
    const token = this.createToken(zid);
    const { user } = await this.getUser(zid);
    return { user, token };
  }
}
