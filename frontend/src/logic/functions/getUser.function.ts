import { ApiError } from "src/interfaces/ResponseInterface";
import { get } from "../createRequest";

export const getUser = async (): Promise<{} | ApiError> =>
  get(`url/v1/getUser/`) as Promise<{}>;
