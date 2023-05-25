import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

import prismaClient from "@/app/libs/prismadb";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const reqBody: RequestBody = await request.json();
  const { name, email, password } = reqBody;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const newUser: User = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(newUser);
};
