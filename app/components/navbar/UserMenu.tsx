"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu: React.FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen: () => void = useCallback(() => {
    setIsMenuOpen((value) => !value);
  }, []);

  return (
    <div className="relative lg:w-1/3">
      <div className="flex flex-row items-center justify-end gap-3">
        <div
          onClick={() => {}}
          className="ml-4 hidden cursor-pointer rounded-full px-4 py-3 text-center text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleMenuOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition duration-300 hover:border-neutral-400 md:px-3 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 top-14 flex w-[40vw] cursor-pointer flex-col overflow-hidden rounded-lg border-[1px] border-gray-200 bg-white text-sm shadow-lg md:w-3/4 lg:top-12">
          <MenuItem handleMenuItemClick={() => {}} menuItemlabel="Login" />
          <MenuItem handleMenuItemClick={() => {}} menuItemlabel="Signup" />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
