"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";

import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/listings/ListingHeader";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useModal from "@/app/hooks/useModal";
import { categories } from "@/app/components/navbar/Categories";
import {
  ModifiedListing,
  ModifiedReservation,
  ModifiedUser,
} from "@/app/types";
import { toastStyles } from "@/app/constants/toastStyles";

const initialDateRange: Range = {
  key: "selection",
  startDate: new Date(),
  endDate: new Date(),
};

interface ListingProps {
  listing: ModifiedListing & { user: ModifiedUser };
  currentUser?: ModifiedUser | null;
  reservations?: ModifiedReservation[];
}

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
  reservations = [],
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { openModal } = useModal();
  const router = useRouter();

  const disabledDates: Date[] = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: ModifiedReservation) => {
      const range: Date[] = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const currentCategory = categories.find(
    (category) => category.label === listing.category
  );

  const handleCreateReservation = async () => {
    if (!currentUser) return openModal("login");

    setIsLoading(true);

    try {
      await axios.post("/api/reservations", {
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
      toast.success("Listing reserved!", { style: toastStyles });
      setDateRange(initialDateRange);
      // router.push("/trips");
    } catch (error) {
      toast.error("Could not create reservation.", { style: toastStyles });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const numberOfDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (numberOfDays > 0 && listing.price)
        setTotalPrice(numberOfDays * listing.price);
      else setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

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
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              disabledDates={disabledDates}
              dateRange={dateRange}
              isDisabled={isLoading}
              handleChangeDate={(dateRange) => setDateRange(dateRange)}
              handleSubmit={handleCreateReservation}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
