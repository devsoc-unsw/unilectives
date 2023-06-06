import ky, { Options } from "ky";

/**
 * Fetch request to backend
 * @param url
 * @param method
 * @param options
 * @returns unknown
 */
const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Options
) => {
  const baseUrl =
    process.env.NODE_ENV === "development" ? `http://localhost:3030${url}` : `http://cselectives.staging.csesoc.unsw.edu.au${url}`;

  const additionalOptions: Options = {
    timeout: 31000,
    method,
    retry: {
      limit: 2,
      statusCodes: [408, 413, 329],
    },
    cache: 'no-store'
  };

  try {
    return await ky(baseUrl, { ...options, ...additionalOptions }).json();
  } catch (err) {
    throw err;
  }
};

/**
 * Fetch GET endpoints from backend
 * @param url
 * @param options
 * @returns unknown
 */
export const get = (url: string, options?: Options) =>
  request(url, "GET", options);

/**
 * Fetch POST endpoints from backend
 * @param url
 * @param options
 * @returns unknown
 */
export const post = (url: string, options?: Options) =>
  request(url, "POST", options);

/**
 * Fetch PUT endpoints from backend
 * @param url
 * @param options
 * @returns unknown
 */
export const put = (url: string, options?: Options) =>
  request(url, "PUT", options);

/**
 * Fetch DELETE endpoints from backend
 * @param url
 * @param options
 * @returns unknown
 */
export const del = (url: string, options?: Options) =>
  request(url, "DELETE", options);
