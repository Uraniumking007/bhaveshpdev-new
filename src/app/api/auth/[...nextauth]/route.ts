import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { handlers } from "./auth";

declare module "next-auth" {
  interface User {
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
  interface AdapterUser {
    id: string;
    email: string;
    isAdmin: boolean;
    isDemo: boolean;
    username: string;
  }
}

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

export const { GET, POST } = handlers;
