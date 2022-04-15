import { unauthorizedError } from "../../utils/Constants";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { IToken } from "IToken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: make proper env file
  const secret = process.env.JWT_SECRET ?? "randomsecret";
  const tokenArray = req.headers["authorization"]?.split(" ");

  if (!tokenArray || tokenArray[0] !== "Bearer" || tokenArray.length !== 2) {
    return res
      .status(unauthorizedError.errorCode)
      .json({ message: "A bearer token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(tokenArray[1], secret) as IToken;
    res.locals.jwtPayload = decoded;

    // Token is valid for 1 hour
    // New token on every request
    const { zid } = decoded;
    const newToken = jwt.sign({ zid }, secret, {
      expiresIn: "1h",
    });
    res.setHeader("Authorization", "Bearer " + newToken);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(unauthorizedError.errorCode)
        .json({ message: "Expired token" });
    }
    return res
      .status(unauthorizedError.errorCode)
      .json({ message: "Invalid Token" });
  }
  return next();
};

export default verifyToken;
