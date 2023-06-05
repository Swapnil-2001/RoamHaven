import { User } from "@prisma/client";

// Don't use keys with type 'DateTime'; hydration errors possible
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
