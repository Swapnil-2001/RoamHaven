"use client";

import { Reservation } from "@prisma/client";
import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/listings/ListingHeader";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { ModifiedListing, ModifiedUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";

interface ListingProps {
  listing: ModifiedListing & { user: ModifiedUser };
  currentUser?: ModifiedUser | null;
  reservations?: Reservation[];
}

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
}): JSX.Element => {
  const currentCategory = categories.find(
    (category) => category.label === listing.category
  );
  return (
    <Container>
      <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
        <ListingHeader
          id={listing.id}
          title={listing.title}
          locationCode={listing.location}
          imageURL={listing.imageURL}
          currentUser={currentUser}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            user={listing.user}
            description={listing.description}
            location={listing.location}
            category={currentCategory}
            guestCount={listing.guestCount}
            roomCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <></>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
