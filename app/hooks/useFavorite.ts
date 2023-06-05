import { useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import useModal from "./useModal";
import { ModifiedUser } from "@/app/types";
import { toastStyles } from "../constants/toastStyles";

interface IUseFavorite {
  listingId: string;
  currentUser?: ModifiedUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const { openModal } = useModal();

  const isFavorited = useMemo(() => {
    const listOfFavoriteIds = currentUser?.favoriteIds || [];
    return listOfFavoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!currentUser) return openModal("login");
    try {
      if (isFavorited) await axios.delete(`/api/favorites/${listingId}`);
      else await axios.post(`/api/favorites/${listingId}`);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.", { style: toastStyles });
    }
  };

  return {
    isFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
