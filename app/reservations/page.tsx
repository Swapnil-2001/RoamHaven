import EmptyState from "@/app/components/EmptyState";

import Reservations from "./Reservations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { ModifiedUser } from "../types";

const ReservationsPage = async () => {
  const currentUser: ModifiedUser | null = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ creatorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return <Reservations reservations={reservations} currentUser={currentUser} />;
};

export default ReservationsPage;
