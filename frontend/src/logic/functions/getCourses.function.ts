import Config from "../../Config";
import {
  ApiError,
  IGetCoursesResponse,
} from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getCourses = async (): Promise<IGetCoursesResponse | ApiError> => {
  return get(`${Config.apiUri}/v1/courses`) as Promise<
    IGetCoursesResponse | ApiError
  >;
};
