import { User } from "@prisma/client";

// Don't use keys with type 'DateTime'; hydration errors possible
export type ModifiedUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
