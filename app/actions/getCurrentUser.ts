import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { User } from "@prisma/client";

import prismaClient from "../libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getSession = async (): Promise<Session | null> => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session: Session | null = await getSession();

    if (!session?.user?.email) return null;

    const currentUser: User | null = await prismaClient.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
