import { headers } from "next/dist/client/components/headers";

const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options?: Record<string, string>,
  headers?: Record<string, string>
) => {
  const prefix = "/api/v1";
  const baseUrl =
    process.env.NODE_ENV !== "development" ? `http://cselectives.staging.csesoc.unsw.edu.au${prefix}${url}` : `http://localhost:3030${prefix}${url}`;

  const payload = method === "GET" ? {
    method,
    headers: {
      'Content-type': 'application/json',
      ...headers
    }
  } : {
    method,
    headers: {
      'Content-type': 'application/json',
      ...headers
    },
    body: JSON.stringify(options)
  }

  return (await fetch(baseUrl, { ...payload, cache: 'no-store' })).json();
};

export const get = (url: string, options?: Record<string, string>, headers?: Record<string, string>) =>
  request(url, "GET", options, headers);

export const post = (url: string, options?: Record<string, string>, headers?: Record<string, string>) =>
  request(url, "POST", options, headers);

export const put = (url: string, options?: Record<string, string>, headers?: Record<string, string>) =>
  request(url, "PUT", options, headers);

export const del = (url: string, options?: Record<string, string>, headers?: Record<string, string>) =>
  request(url, "DELETE", options, headers);
