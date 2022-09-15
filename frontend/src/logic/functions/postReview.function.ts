import { Options } from "ky";
import {
  ApiError,
  IPostReviewRequestBody,
  IPostReviewResponse,
} from "src/interfaces/ResponseInterface";
import { post } from "../createRequest";

export const postReview = async (
  req: IPostReviewRequestBody
): Promise<IPostReviewResponse | ApiError> => {
  const options: Options = {
    body: JSON.stringify(req),
  };

  return post("/api/v1/reviews", options) as Promise<
    IPostReviewResponse | ApiError
  >;
};
