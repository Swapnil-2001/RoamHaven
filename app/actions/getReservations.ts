import { Listing, Reservation } from "@prisma/client";

import prismaClient from "../libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  creatorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, creatorId } = params;

    const query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (creatorId) query.listing = { userId: creatorId };

    const reservations: (Reservation & {
      listing: Listing;
    })[] = await prismaClient.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const modifiedReservations = reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return modifiedReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
