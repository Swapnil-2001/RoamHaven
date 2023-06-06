import EmptyState from "@/app/components/EmptyState";
import Listing from "./Listing";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;
  return (
    <Listing
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
