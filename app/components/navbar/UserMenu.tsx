"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useModal from "@/app/hooks/useModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu: React.FC = (): JSX.Element => {
  const { openModal } = useModal();

  return (
    <div className="relative lg:w-1/3">
      <div className="flex flex-row items-center justify-end gap-3">
        <div
          onClick={() => {}}
          className="ml-4 hidden cursor-pointer rounded-full px-4 py-3 text-center text-sm font-semibold transition duration-300 hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div className="group flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition duration-300 hover:border-neutral-400 md:px-3 md:py-1">
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar />
          </div>
          <div className="absolute right-0 top-14 flex w-[40vw] scale-0 transform cursor-pointer flex-col overflow-hidden rounded-lg border-[1px] border-gray-200 bg-white text-sm shadow-lg transition duration-200 ease-in-out group-hover:scale-100 md:w-3/4 lg:top-12 lg:w-1/2">
            <MenuItem handleMenuItemClick={() => {}} menuItemlabel="Login" />
            <MenuItem
              handleMenuItemClick={() => openModal("register")}
              menuItemlabel="Signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
