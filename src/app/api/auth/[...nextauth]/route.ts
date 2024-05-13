import NextAuth, {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
  Session,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { User } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { DefaultJWT, JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from "./auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
    isAdmin: boolean;
    username: string;
  }
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    isAdmin: boolean;
    username: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
      username: string;
    };
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
