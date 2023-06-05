import { Listing } from "@prisma/client";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import { ModifiedUser } from "./types";

export default async function Home() {
  const currentUser: ModifiedUser | null = await getCurrentUser();
  const listings: Listing[] = await getListings();

  if (listings.length === 0) return <EmptyState showReset />;

  return (
    <Container>
      <div
        className="
          grid
          grid-cols-1 
          gap-8 
          pt-24 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
