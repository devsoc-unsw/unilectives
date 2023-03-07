import { getLogger } from "../utils/logger";
import { UserEntity } from "../entity/User";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { convertUserEntityToInterface } from "../converters/user.converter";
import { EntityManager } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { ReviewRepository } from "../repositories/review.repository";
import { CourseRepository } from "../repositories/course.repository";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { AuthService } from "../modules/Auth";
import { z } from "zod";
import {
  UserSuccessResponse,
  UserTokenSuccessResponse,
} from "../api/schemas/user.schema";

export class UserService {
  private logger = getLogger();
  constructor(
    private readonly manager: EntityManager,
    private readonly authService: AuthService
  ) {}
  private userRepository = new UserRepository(this.manager);
  private courseRepository = new CourseRepository(this.manager);
  private reviewRepository = new ReviewRepository(this.manager);

  async createUser(
    zid: string
  ): Promise<z.infer<typeof UserTokenSuccessResponse>> {
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
    const token = this.authService.createToken(zid);

    return { user: convertUserEntityToInterface(saveUser), token };
  }

  async getUser(zid: string): Promise<z.infer<typeof UserSuccessResponse>> {
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

  async loginUser(
    zid: string
  ): Promise<z.infer<typeof UserTokenSuccessResponse>> {
    const token = this.authService.createToken(zid);
    const { user } = await this.getUser(zid);
    return { user, token };
  }
}
