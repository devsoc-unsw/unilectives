import ky, { Options } from "ky";

const joinOptions = (options: (Options | undefined)[]): Options => {
  const incomingOptions = Object.assign({}, ...options) as Options;
  const customHeaders = {
    user_client_id: "null",
  };
  const customOptions: Options = {
    headers: customHeaders,
  };
  return {
    ...incomingOptions,
    ...customOptions,
  };
};

const createRequest = async (
  url: string,
  requestType: string,
  options?: Options
): Promise<unknown> => {
  const additionalOptions: Options = {
    timeout: 31000,
    method: requestType,
    retry: {
      limit: 2,
      statusCodes: [408, 413, 329],
    },
  };

  // eslint-disable-next-line no-useless-catch
  try {
    return await ky(url, joinOptions([additionalOptions, options])).json();
  } catch (ex) {
    throw ex;
  }
};

export const get = (url: string, options?: Options) =>
  createRequest(url, "GET", options);

export const post = (url: string, options?: Options) =>
  createRequest(url, "POST", options);

export const put = (url: string, options?: Options) =>
  createRequest(url, "PUT", options);

export const del = (url: string, options?: Options) =>
  createRequest(url, "DELETE", options);
