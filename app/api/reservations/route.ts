import { NextResponse } from "next/server";
import { ModifiedUser } from "@/app/types";
import { Listing } from "@prisma/client";

import prismaClient from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { listingId, totalPrice, startDate, endDate } = body;

  if (!listingId || !totalPrice || !startDate || !endDate)
    return NextResponse.error();

  const listingAndReservations: Listing = await prismaClient.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservations);
}
