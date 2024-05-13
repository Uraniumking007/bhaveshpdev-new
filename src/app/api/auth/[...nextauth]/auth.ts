import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { NextAuthOptions, getServerSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials!;

        const userData = await prisma.user.findFirst({
          where: { email },
        });

        if (!userData) {
          return null;
        }

        const hashedPassword = userData?.password;

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
          return null;
        }

        return {
          id: userData.id,
          email: userData.email as string,
          isAdmin: userData.isAdmin,
          username: userData.username,
          isDemo: userData.isDemo,
        }; // Return the user object
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          username: user.username,
          isDemo: user.isDemo,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          isAdmin: token.isAdmin,
          username: token.username,
          isDemo: token.isDemo,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
