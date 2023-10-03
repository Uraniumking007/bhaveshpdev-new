import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from "next-auth";
import { compare } from "bcryptjs";
import { prisma } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@prisma/client";
import { type JWT } from "next-auth/jwt";
import { type AdapterUser } from "next-auth/adapters";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}
declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    id: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      // console.log("jwt callback", token, user, session);
      if (user) {
        return {
          ...token,
          id: user.id,
          // username: user.username,
        };
      }
      return token;
    },
    session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }) {
      // console.log("session callback", session, token, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-Mail", placeholder: "user@mail.com", type: "text" },
        password: {
          label: "Password",
          placeholder: "**********",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        const user: User | null = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) return null;

        if (!user.password) return null;

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
          emailVerified: user.emailVerified ?? null,
          image: user.image ?? null,
          password: user.password,
          username: user.username,
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
