import * as jwt from "jsonwebtoken";
import { z } from "zod";
import { TokenDataSchema } from "../api/schemas/user.schema";

export class AuthService {
  public createToken(zid: string): z.infer<typeof TokenDataSchema> {
    const expiresIn = "12h";
    const secret = process.env.JWT_SECRET ?? "randomsecret";
    const tokenData = {
      zid,
    };
    return {
      expiresIn,
      token: "Bearer " + jwt.sign(tokenData, secret, { expiresIn }),
    };
  }
}
