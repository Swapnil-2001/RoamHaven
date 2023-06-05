"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const Logo: React.FC = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="mr-2 hidden cursor-pointer text-xl font-bold text-indigo-500 md:block lg:w-1/3"
    >
      RoamHaven
    </div>
  );
};

export default Logo;
