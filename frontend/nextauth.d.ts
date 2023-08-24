import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface;
}

// Extends default session and user entities to add access token
declare module "next-auth" {
  interface User {
    accessToken: string | undefined;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

// Extends the default token to add zid and access token support
declare module "next-auth/jwt" {
  interface JWT {
    zid: string;
    accessToken: string | undefined;
  }
}
