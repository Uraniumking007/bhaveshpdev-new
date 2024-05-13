import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { authOptions } from "./auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    isAdmin: boolean;
    isDemo: boolean;
    username: string;
  }
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    isAdmin: boolean;
    isDemo: boolean;
    username: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
      isDemo: boolean;
      username: string;
    };
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    id: string;
    email: string;
    isAdmin: boolean;
    isDemo: boolean;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
