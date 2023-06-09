import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "../hooks/useFavorite";
import { ModifiedUser } from "../types";

interface LikeButtonProps {
  listingId: string;
  currentUser?: ModifiedUser | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  listingId,
  currentUser,
}): JSX.Element => {
  const { isFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={`${isFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default LikeButton;
