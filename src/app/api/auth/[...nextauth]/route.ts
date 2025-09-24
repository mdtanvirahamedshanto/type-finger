import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Session } from "next-auth";

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

interface SessionParams {
  session: Session;
  user: {
    id: string;
    [key: string]: unknown;
  };
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }: SessionParams) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };