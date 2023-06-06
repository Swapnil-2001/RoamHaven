"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { cancelReservationErrorMessage } from "../constants/errorMessages";
import { ModifiedReservation, ModifiedUser } from "@/app/types";
import { toastStyles } from "../constants/toastStyles";

interface ReservationsProps {
  reservations: ModifiedReservation[];
  currentUser?: ModifiedUser;
}

const Reservations: React.FC<ReservationsProps> = ({
  reservations,
  currentUser,
}): JSX.Element => {
  const router = useRouter();
  const [idOfReservationToCancel, setIdOfReservationToCancel] = useState("");

  const handleCancelReservation = async (reservationId: string) => {
    setIdOfReservationToCancel(reservationId);
    try {
      await axios.delete(`/api/reservations/${reservationId}`);
      toast.success("Reservation cancelled", { style: toastStyles });
      router.refresh();
    } catch (error) {
      toast.error(cancelReservationErrorMessage, { style: toastStyles });
    } finally {
      setIdOfReservationToCancel("");
    }
  };

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleCancelReservation}
            isDisabled={idOfReservationToCancel === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Reservations;
