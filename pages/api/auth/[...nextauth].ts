import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";

import prismaClient from "@/app/libs/prismadb";

const DEFAULT_LOGIN_ERROR_MESSAGE = "Invalid credentials.";
const EMAIL_NOT_FOUND_ERROR_MESSAGE =
  "This email does not exist in our database.";
const INCORRECT_PASSWORD_ERROR_MESSAGE = "Incorrect password.";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(DEFAULT_LOGIN_ERROR_MESSAGE);
        }

        const user: User | null = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user?.hashedPassword) {
          throw new Error(EMAIL_NOT_FOUND_ERROR_MESSAGE);
        }

        const isPasswordCorrect: boolean = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordCorrect) {
          throw new Error(INCORRECT_PASSWORD_ERROR_MESSAGE);
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
