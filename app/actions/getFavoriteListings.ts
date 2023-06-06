import { Listing } from "@prisma/client";

import prismaClient from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { ModifiedListing, ModifiedUser } from "../types";

export default async function getFavoriteListings() {
  try {
    const currentUser: ModifiedUser | null = await getCurrentUser();

    if (!currentUser) return [];

    const favoriteListings: Listing[] = await prismaClient.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const modifiedFavoriteListings: ModifiedListing[] = favoriteListings.map(
      (favoriteListing) => ({
        ...favoriteListing,
        createdAt: favoriteListing.createdAt.toString(),
      })
    );

    return modifiedFavoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
