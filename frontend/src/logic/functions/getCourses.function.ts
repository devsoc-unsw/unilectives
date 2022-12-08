import {
  ApiError,
  IGetCoursesResponse,
} from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getCourses = async (): Promise<IGetCoursesResponse | ApiError> => {
  return get("https://cselectives.staging.csesoc.unsw.edu.au/api/v1/courses") as Promise<IGetCoursesResponse | ApiError>;
};
