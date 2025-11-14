import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
          isAdmin: false,
          isDemo: false,
        };
      },
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (typeof email !== "string" || typeof password !== "string") {
            const missingCredentialsError = new CredentialsSignin(
              "Email and password are required."
            );
            missingCredentialsError.code = "missing_fields";
            throw missingCredentialsError;
          }

          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user) {
            throw new CredentialsSignin("Invalid email or password.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new CredentialsSignin("Invalid email or password.");
          }

          return user;
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }

          console.error("[auth][credentials][authorize]", error);
          const unknownCredentialsError = new CredentialsSignin(
            "We couldn't sign you in with those credentials."
          );
          unknownCredentialsError.code = "server_error";
          throw unknownCredentialsError;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/register",
  },
  trustHost: true,
  basePath: "/api/auth",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              email: user.email!,
              name: user.name,
              username: user.username || user.email!.split("@")[0],
              password: "github-auth", // Set a placeholder password for GitHub users
              isAdmin: false,
              isDemo: false,
            },
          });
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
        token.isDemo = user.isDemo;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.isAdmin = token.isAdmin as boolean;
      session.user.username = token.username as string;
      session.user.isDemo = token.isDemo as boolean;
      return session;
    },
  },
});
