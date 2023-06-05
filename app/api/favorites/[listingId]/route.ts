import { NextResponse } from "next/server";

import prismaClient from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ModifiedUser } from "@/app/types";

interface IParams {
  listingId?: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid list ID.");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid list ID.");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
