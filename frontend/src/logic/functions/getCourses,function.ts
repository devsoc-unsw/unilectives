import Config from "../../Config";
import { Options } from "ky";
import { ApiError, IGetCourseResponse } from "../../interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getCourses = async (
): Promise<IGetCourseResponse | ApiError> => {

  return get(`${Config.apiUri}/v1/courses`) as Promise<
    IGetCourseResponse | ApiError
  >;
};
