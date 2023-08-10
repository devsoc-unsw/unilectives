const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, any>,
) => {
  const prefix = "/api/v1";
  const baseUrl = process.env.NODE_ENV !== "development"
      ? `https://cselectives.staging.csesoc.unsw.edu.au${prefix}${url}`
      : `http://localhost:3030${prefix}${url}`;

  const payload =
    method === "GET"
      ? {
          method
        }
        : {
          method,
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(options),
        };

  return (await fetch(baseUrl, { ...payload, cache: "no-store" })).json();
};

export const validatedReq = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  authToken: string,
  zid: string
) => {
  const prefix = "/api/v1";
  const baseUrl =
    process.env.NODE_ENV !== "development"
      ? `https://cselectives.staging.csesoc.unsw.edu.au${prefix}${url}`
      : `http://localhost:3030${prefix}${url}`;
  const payload = {
    method,
    headers: {
      token: authToken,
      zid: zid,
    },
  };
  return (
    await fetch(baseUrl, {
      ...payload,
    })
  ).json();
};

export const get = (url: string, options?: Record<string, string>) =>
  request(url, "GET", options);

export const post = (url: string, options?: Record<string, any>) =>
  request(url, "POST", options);

export const put = (url: string, options?: Record<string, any>) =>
  request(url, "PUT", options);

export const del = (url: string, options?: Record<string, any>) =>
  request(url, "DELETE", options);
