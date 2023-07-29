import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "csesoc",
      name: "csesoc-auth",
      type: "oauth",
      idToken: true,
      wellKnown: process.env.AUTH_WELL_KNOWN,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: { params: { scope: "openid" } },
      profile(profile, token) {
        return {
          id: profile.sub,
          accessToken: token.access_token,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.zid = user.id;
        token.accessToken = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.zid;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
