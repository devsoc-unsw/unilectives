import { Request, Response, NextFunction } from "express";
import { getLogger } from "../../utils/logger";
import fetch from "node-fetch";

const logger = getLogger();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.token;
  const zid = req.headers.zid
  if (token === undefined) {
    logger.error("No token provided in authorisation field in request body, access denied")
    return res.status(401).json({ message: "unauthorised" })
  }

  try {
    const response = await fetch('https://id.csesoc.unsw.edu.au/userinfo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      logger.error(`unauthorised: response code ${response.status}`);
      return res.status(401).json({ message: "unauthorised" });
    }

    const json = await response.json() as { sub: string };
    logger.info("Token authorised succesfully")
    const tokenZid = json.sub;
    if (tokenZid !== zid) {
      logger.error("unauthorised: not the same zid")
      return res.status(401).json({ message: "unauthorised" });
    }

    return next();
  } catch (error) {
    const err = error as Error
    logger.error(`An error occurred: ${err.message}`);
    return res.status(401).json({ message: "unauthorised" });
  }
};

export default verifyToken;
