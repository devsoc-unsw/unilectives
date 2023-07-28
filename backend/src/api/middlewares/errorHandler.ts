import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../../utils/errors";
import {
  getResponseFromHttpError,
  internalServerError,
} from "../../utils/constants";

export const errorHandlerMiddleware = (
  err: Error | HTTPError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HTTPError) {
    return res.status(err.errorCode).json(getResponseFromHttpError(err));
  }
  return res.status(internalServerError.errorCode).json(internalServerError);
};
