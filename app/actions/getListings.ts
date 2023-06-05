import prismaClient from "../libs/prismadb";
import { ModifiedListing } from "../types";

const getListings = async (): Promise<ModifiedListing[]> => {
  try {
    const listings = await prismaClient.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const modifiedListings: ModifiedListing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return modifiedListings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListings;
