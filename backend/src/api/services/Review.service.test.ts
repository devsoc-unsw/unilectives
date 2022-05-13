import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { ReviewService } from "./Review.service";
import {
  getReviewEntity,
  getMockReviews,
  getMockCOMP2521Reviews
} from "../../utils/testData";
import { EntityManager, DataSource } from "typeorm";
import {
  IPostReviewRequestBody,
} from "IApiResponses";

describe("ReviewService", () => {
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

  const reviewService = () => new ReviewService(manager);

  describe("getAllReviews", () => {
    it("should return all reviews", () => {
      const service = reviewService();
      const reviews = getMockReviews();
      manager.find = jest.fn().mockReturnValue(reviews);
      expect(service.getAllReviews()).resolves.toEqual({
        reviews,
      });
    });

    it("should throw HTTP 500 error if no reviews in database", () => {
      const service = reviewService();
      manager.find = jest.fn().mockReturnValue([]);
      const errorResult = new HTTPError(internalServerError);
      expect(service.getAllReviews()).rejects.toThrow(errorResult);
    });
  });
  
  describe("getCourseReviews", () => {
    it("should return all reviews associated with course", () => {
      const service = reviewService();
      const reviews = getMockCOMP2521Reviews();
      manager.find = jest.fn().mockReturnValue(reviews);
      expect(service.getCourseReviews("COMP2521")).resolves.toEqual({
        reviews,
      });
    });
  });

  describe("postReview", () => {
    it("should resolve and post a new review", async () => {
      const service = reviewService();
      const reviewEntity = getReviewEntity();
      const review = getMockReviews()[0];

      const reviewRequest: IPostReviewRequestBody = {
        zid: reviewEntity.zid,
        courseCode: reviewEntity.courseCode,
        authorName: reviewEntity.authorName,
        description: reviewEntity.description,
        grade: reviewEntity.grade,
        termTaken: reviewEntity.termTaken,
      };

      manager.findOneBy = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(reviewEntity);
      manager.save = jest.fn().mockReturnValue(reviewEntity);

      expect(service.postReview(reviewRequest)).resolves.toEqual({
        review: review,
      });
    });
  });

});
