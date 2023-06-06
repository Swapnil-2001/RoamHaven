import { Listing, Reservation, User } from "@prisma/client";

// Don't use keys with type 'DateTime'; hydration errors possible
export type ModifiedListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type ModifiedReservation = Omit<
  Reservation,
  "startDate" | "endDate" | "listing" | "createdAt"
> & {
  startDate: string;
  endDate: string;
  listing: ModifiedListing;
  createdAt: string;
};

export type ModifiedUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type CountryInputValue = {
  label: string;
  code: string;
  region: string;
  flag: string;
  latlng: number[];
};
