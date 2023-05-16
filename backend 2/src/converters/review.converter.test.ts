import { getReviewEntity, getMockReview } from "../utils/testData";
import {
  convertReviewEntityToInterface,
  convertReviewInterfaceToEntity,
} from "./review.converter";

describe("convertReviewEntityToInterface", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert ReviewEntity to IReview", () => {
    const date = new Date();
    const review = getMockReview(date);
    const entity = getReviewEntity(date);
    expect(convertReviewEntityToInterface(entity)).toEqual(review);
  });
});

describe("convertReviewInterfaceToEntity", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  it("should convert IReview to ReviewEntity", () => {
    const date = new Date();
    const review = getMockReview(date);
    const entity = getReviewEntity(date);
    expect(convertReviewInterfaceToEntity(review)).toEqual(entity);
  });
});
