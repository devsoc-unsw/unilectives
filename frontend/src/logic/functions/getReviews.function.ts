import {
  ApiError,
  IGetReviewsResponse,
} from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getReviews = async (
  courseCode: string
): Promise<IGetReviewsResponse | ApiError> => {
  return get(`https://cselectives.staging.csesoc.unsw.edu.au/api/v1/reviews/${courseCode}`) as Promise<
    IGetReviewsResponse | ApiError
  >;
};
