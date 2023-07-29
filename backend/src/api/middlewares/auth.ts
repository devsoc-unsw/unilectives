import { Request, Response, NextFunction } from "express";
import { getLogger } from "../../utils/logger";

const logger = getLogger();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header;
  const response = await fetch("https://id.csesoc.unsw.edu.au/userinfo", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      return res.status(401).json({ message: "unauthorised" });
    }
    let errorMessage = response.statusText;

    try {
      const json = (await response.json()) as { error: string };
      errorMessage = json.error;
    } catch (err) {}

    logger.error(
      `Verify error ${response.status} - ${response.statusText}: ${errorMessage}`
    );
    return res.status(response.status).json({ message: "unauthorised" });
  }

  const json = await response.json();
  const tokenZid = json.sub;
  if (tokenZid !== req.headers.zid) {
    return res.status(401).json({ message: "unauthorised" });
  }
  return next();
};

export default verifyToken;
