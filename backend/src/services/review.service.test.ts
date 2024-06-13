import { HTTPError } from "../utils/errors";
import { badRequest, internalServerError } from "../utils/constants";
import { ReviewService } from "./review.service";
import RedisClient from "../modules/redis";
import {
  getUserEntity,
  getReviewEntity,
  getMockReviews,
  getMockCOMP2521Reviews,
  getMockReview,
} from "../utils/testData";
import {
  BookmarkReview,
  PostReviewRequestBody,
  PutReviewRequestBody,
} from "../api/schemas/review.schema";
import { UserRepository } from "../repositories/user.repository";
import { ReviewRepository } from "../repositories/review.repository";

describe("ReviewService", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  const userRepository = {} as UserRepository;
  const reviewRepository = {} as ReviewRepository;
  const redis = {} as RedisClient;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reviewService = () =>
    new ReviewService(redis, reviewRepository, userRepository);
  const date = new Date();

  describe("getAllReviews", () => {
    it("should return all reviews", () => {
      const service = reviewService();
      const reviews = getMockReviews();

      reviewRepository.getAllReviews = jest.fn().mockReturnValue(reviews);
      expect(service.getAllReviews()).resolves.toEqual({
        reviews,
      });
    });

    it("should throw HTTP 500 error if no reviews in database", () => {
      const service = reviewService();
      reviewRepository.getAllReviews = jest.fn().mockReturnValue([]);
      const errorResult = new HTTPError(internalServerError);
      expect(service.getAllReviews()).rejects.toThrow(errorResult);
    });
  });

  describe("getCourseReviews", () => {
    it("should return all reviews associated with course", () => {
      const service = reviewService();
      const reviews = getMockCOMP2521Reviews();
      reviewRepository.getCourseReviews = jest.fn().mockReturnValue(reviews);
      redis.get = jest.fn().mockReturnValue(null);
      redis.set = jest.fn().mockReturnValue(null);
      expect(service.getCourseReviews("COMP2521")).resolves.toEqual({
        reviews,
      });
    });
  });

  describe("postReview", () => {
    it("should resolve and post a new review", async () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity(date);
      const review = getMockReviews(date)[0];

      const reviewRequest: PostReviewRequestBody = {
        zid: reviewEntity.zid,
        courseCode: reviewEntity.courseCode,
        authorName: reviewEntity.authorName,
        title: reviewEntity.title,
        description: reviewEntity.description,
        grade: reviewEntity.grade,
        termTaken: reviewEntity.termTaken,
        manageability: 5,
        usefulness: 5,
        enjoyability: 5,
        overallRating: 5,
      };

      redis.set = jest.fn().mockReturnValue(null);
      reviewRepository.save = jest.fn().mockReturnValue(reviewEntity);

      expect(service.postReview(reviewRequest)).resolves.toEqual({
        review: review,
      });
    });
  });

  describe("updateReview", () => {
    it("should resolve and update an existing review", () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity(date);
      const review = getMockReviews(date)[0];

      const reviewRequest: PutReviewRequestBody = {
        authorName: reviewEntity.authorName,
        grade: reviewEntity.grade,
      };

      reviewRepository.getReview = jest.fn().mockReturnValue(reviewEntity);
      reviewRepository.getCourseReviews = jest
        .fn()
        .mockReturnValue([reviewEntity]);
      redis.set = jest.fn().mockReturnValue("ok");
      reviewRepository.update = jest.fn().mockReturnValue(reviewEntity);

      expect(
        service.updateReview(reviewRequest, reviewEntity.reviewId),
      ).resolves.toEqual({
        review: review,
      });
    });
  });

  describe("deleteReview", () => {
    it("should resolve and delete an existing review", () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity();
      const id = reviewEntity.reviewId;

      reviewRepository.getReview = jest.fn().mockReturnValue(reviewEntity);
      reviewRepository.deleteReview = jest.fn().mockReturnValue(reviewEntity);

      // Should this have an empty toEqual()?
      expect(service.deleteReview(id)).resolves.toEqual("OK");
    });
  });

  describe("bookmarkReview", () => {
    it("should throw HTTP 400 error if no reviews in database", () => {
      const service = reviewService();
      const reviews = getMockReviews()[0];
      reviewRepository.getReview = jest.fn().mockReturnValue(undefined);
      const request: BookmarkReview = {
        reviewId: reviews.reviewId,
        zid: reviews.zid,
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkReview(request)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 400 error if no user in database", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const reviewEntity = getReviewEntity();

      reviewRepository.getReview = jest.fn().mockReturnValue(reviewEntity);
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      const request: BookmarkReview = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: true,
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.bookmarkReview(request)).rejects.toThrow(errorResult);
    });

    it("should resolve and return bookmarked review", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const user = getUserEntity();

      reviewRepository.getReview = jest.fn().mockReturnValue(reviews[0]);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      userRepository.updateUser = jest.fn().mockReturnValue(user);

      const request: BookmarkReview = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: true,
      };

      expect(service.bookmarkReview(request)).resolves.toEqual({
        review: reviews[0],
      });
    });

    it("should resolve and remove bookmarked review", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const user = getUserEntity();

      reviewRepository.getReview = jest.fn().mockReturnValue(reviews[0]);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      userRepository.updateUser = jest.fn().mockReturnValue(user);

      const request: BookmarkReview = {
        reviewId: reviews[0].reviewId,
        zid: reviews[0].zid,
        bookmark: false,
      };
      expect(service.bookmarkReview(request)).resolves.toEqual({
        review: reviews[0],
      });
    });
  });

  describe("getMostLikedReview", () => {
    it("should throw HTTP 500 error if no reviews in database", () => {
      const service = reviewService();
      reviewRepository.getMostLikedReview = jest
        .fn()
        .mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(service.getMostLikedReview()).rejects.toThrow(errorResult);
    });

    it("should retrieve the reviewId for the review with the most votes", async () => {
      const service = reviewService();
      const reviews = getMockReviews();
      const { reviewId } = reviews[1];
      reviewRepository.getMostLikedReview = jest
        .fn()
        .mockResolvedValue({ reviewId });
      expect(await service.getMostLikedReview()).toEqual({ reviewId });
    });
  });
});
