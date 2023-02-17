import { getReviewEntity, getMockReview } from "../utils/testData";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./review.converter";

describe("convertReviewEntityToInterface", () => {
  it("should convert ReviewEntity to IReview", () => {
    const date = new Date();
    const review = getMockReview(date);
    const entity = getReviewEntity(date);
    expect(convertReviewEntityToInterface(entity)).toEqual(review);
  });
});

describe("convertReviewInterfaceToEntity", () => {
  it("should convert IReview to ReviewEntity", () => {
    const date = new Date();
    const review = getMockReview(date);
    const entity = getReviewEntity(date);
    expect(convertReviewInterfaceToEntity(review)).toEqual(entity);
  });
});
