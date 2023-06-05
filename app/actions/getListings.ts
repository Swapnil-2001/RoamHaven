import { Listing } from "@prisma/client";

import prismaClient from "../libs/prismadb";

const getListings = async (): Promise<Listing[]> => {
  try {
    const listings = await prismaClient.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error) {
    return [];
  }
};

export default getListings;
