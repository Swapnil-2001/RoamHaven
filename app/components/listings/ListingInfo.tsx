import { IconType } from "react-icons";

import ListingCategory from "./ListingCategory";
import { ModifiedUser } from "@/app/types";

interface ListingInfoProps {
  user: ModifiedUser;
  description: string;
  location: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  location,
  category,
  guestCount,
  roomCount,
  bathroomCount,
}): JSX.Element => (
  <div className="col-span-4 flex flex-col gap-8">
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2 text-xl font-semibold">
        Hosted by {user?.name}
      </div>
      <div className="font-lighttext-neutral-500 flex flex-row items-center gap-4">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
    </div>
    <hr />
    {category && (
      <ListingCategory
        icon={category.icon}
        label={category?.label}
        description={category?.description}
      />
    )}
    <hr />
    <div className="text-lg font-light text-neutral-500">{description}</div>
    <hr />
  </div>
);

export default ListingInfo;
