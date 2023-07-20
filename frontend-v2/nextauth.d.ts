import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface;
}

declare module "next-auth" {
  interface User {
    accessToken: string | undefined;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    zid: string;
    accessToken: string | undefined;
  }
}
