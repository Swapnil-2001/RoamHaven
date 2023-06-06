import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prismaClient from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ModifiedUser } from "@/app/types";

interface IParams {
  reservationId?: string;
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid ID");

  const reservation: Prisma.BatchPayload =
    await prismaClient.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

  return NextResponse.json(reservation);
}
