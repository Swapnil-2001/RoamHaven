import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { ModifiedListing, ModifiedUser } from "../types";

interface FavoritesProps {
  listings: ModifiedListing[];
  currentUser?: ModifiedUser | null;
}

const Favorites: React.FC<FavoritesProps> = ({
  listings,
  currentUser,
}): JSX.Element => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
