import {
  ApiError,
  IGetReviewsResponse,
} from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getCourses = async (): Promise<IGetReviewsResponse | ApiError> => {
  return get("/api/v1/courses") as Promise<IGetReviewsResponse | ApiError>;
};
