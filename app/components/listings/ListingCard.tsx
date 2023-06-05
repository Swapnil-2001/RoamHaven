"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import Button from "../Button";
import LikeButton from "../LikeButton";
import { CountryInputValue, ModifiedUser } from "@/app/types";

interface ListingCardProps {
  data: Listing;
  currentUser?: ModifiedUser | null;
  reservation?: Reservation;
  isDisabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  isDisabled,
  actionId = "",
  actionLabel,
  onAction,
}): JSX.Element => {
  const router = useRouter();

  const { getCountryByCode } = useCountries();
  const location: CountryInputValue | undefined = getCountryByCode(
    data.location
  );

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    if (isDisabled) return;
    if (onAction) onAction(actionId);
  };

  const price: number = reservation ? reservation.totalPrice : data.price;

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 flex w-full cursor-pointer flex-col gap-2"
    >
      <div
        className="
          relative 
          aspect-square 
          w-full 
          overflow-hidden 
          rounded-xl
        "
      >
        <Image
          src={data.imageURL}
          alt="Listing"
          className="
            h-full 
            w-full 
            object-cover 
            transition 
            group-hover:scale-110
          "
          fill
        />
        <div
          className="
            absolute
            right-3
            top-3
          "
        >
          <LikeButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>
      <div className="text-lg font-semibold">
        {location?.region}, {location?.code}
      </div>
      <div className="font-light text-neutral-500">
        {reservationDate || data.category}
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">$ {price}</div>
        {!reservation && <div className="font-light">/ night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          isDisabled={isDisabled}
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
