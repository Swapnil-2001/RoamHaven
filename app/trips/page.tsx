import EmptyState from "@/app/components/EmptyState";
import Trips from "./Trips";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { ModifiedReservation, ModifiedUser } from "../types";

const TripsPage = async () => {
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations: ModifiedReservation[] = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return <Trips reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
