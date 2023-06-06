"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";

import useModal from "@/app/hooks/useModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { ModifiedUser } from "@/app/types";

interface UserMenuProps {
  currentUser: ModifiedUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }): JSX.Element => {
  const router = useRouter();

  const { openModal } = useModal();

  const handleRentYourHome = () => {
    if (!currentUser) openModal("login");
    else openModal("rent");
  };

  return (
    <div className="relative lg:w-1/3">
      <div className="flex flex-row items-center justify-end gap-3">
        <div
          onClick={handleRentYourHome}
          className="ml-4 hidden cursor-pointer rounded-full px-4 py-3 text-center text-sm font-semibold transition duration-300 hover:bg-neutral-100 md:block"
        >
          Rent your home
        </div>
        <div className="group flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition duration-300 hover:border-neutral-400 md:px-3 md:py-1">
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar isUserLoggedIn={currentUser !== null} />
          </div>
          <div className="absolute right-0 top-14 flex w-[40vw] scale-0 transform cursor-pointer flex-col overflow-hidden rounded-xl border-[1px] border-gray-200 bg-white text-sm shadow-lg transition duration-200 ease-in-out group-hover:scale-100 md:w-3/4 lg:top-11 lg:w-1/2">
            {currentUser ? (
              <>
                <MenuItem
                  handleMenuItemClick={() => router.push("/trips")}
                  menuItemlabel="My Trips"
                />
                <MenuItem
                  handleMenuItemClick={() => router.push("/favorites")}
                  menuItemlabel="My Favourites"
                />
                <MenuItem
                  handleMenuItemClick={() => router.push("/reservations")}
                  menuItemlabel="My Reservations"
                />
                <MenuItem
                  handleMenuItemClick={() => {}}
                  menuItemlabel="My Properties"
                />
                <MenuItem
                  handleMenuItemClick={handleRentYourHome}
                  menuItemlabel="Rent My Home"
                />
                <hr />
                <MenuItem
                  handleMenuItemClick={signOut}
                  menuItemlabel="Log Out"
                  isLogout
                />
              </>
            ) : (
              <>
                <MenuItem
                  handleMenuItemClick={() => openModal("login")}
                  menuItemlabel="Login"
                  icon={IoMdLogIn}
                />
                <MenuItem
                  handleMenuItemClick={() => openModal("register")}
                  menuItemlabel="Signup"
                  icon={BsPersonPlusFill}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
