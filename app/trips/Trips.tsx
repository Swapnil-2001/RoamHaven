"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { ModifiedReservation, ModifiedUser } from "../types";
import { cancelReservationErrorMessage } from "../constants/errorMessages";
import { toastStyles } from "../constants/toastStyles";

interface TripsProps {
  reservations: ModifiedReservation[];
  currentUser?: ModifiedUser;
}

const Trips: React.FC<TripsProps> = ({ reservations, currentUser }) => {
  const [idOfReservationToCancel, setIdOfReservationToCancel] =
    useState<string>("");

  const router = useRouter();

  const handleCancelReservation = async (
    reservationId: string
  ): Promise<void> => {
    setIdOfReservationToCancel(reservationId);
    try {
      await axios.delete(`/api/reservations/${reservationId}`);
      toast.success("Reservation cancelled.", { style: toastStyles });
      router.refresh();
    } catch (error) {
      toast.error(cancelReservationErrorMessage, {
        style: toastStyles,
      });
    } finally {
      setIdOfReservationToCancel("");
    }
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
        center
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            currentUser={currentUser}
            reservation={reservation}
            isDisabled={idOfReservationToCancel === reservation.id}
            actionId={reservation.id}
            actionLabel="Cancel reservation"
            onAction={handleCancelReservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
