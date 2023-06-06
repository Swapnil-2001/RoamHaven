import Image from "next/image";

import Heading from "../Heading";
import LikeButton from "../LikeButton";
import useCountries from "@/app/hooks/useCountries";
import { ModifiedUser } from "@/app/types";

interface ListingHeaderProps {
  id: string;
  title: string;
  locationCode: string;
  imageURL: string;
  currentUser?: ModifiedUser | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  id,
  title,
  locationCode,
  imageURL,
  currentUser,
}): JSX.Element => {
  const { getCountryByCode } = useCountries();

  const location = getCountryByCode(locationCode);
  return (
    <div className="mt-2">
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
        center
      />
      <div className="relative mt-8 h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageURL}
          fill
          className="w-full object-cover"
          alt="Image"
        />
        <div className="absolute right-5 top-5">
          <LikeButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
