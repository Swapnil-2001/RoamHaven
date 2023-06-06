import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import Favorites from "./Favorites";
import { ModifiedUser } from "../types";

const ListingPage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <Favorites listings={favoriteListings} currentUser={currentUser} />;
};

export default ListingPage;
