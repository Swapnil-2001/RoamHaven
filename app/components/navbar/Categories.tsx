"use client";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to a beach.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a swimming pool.",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property offers skiing activities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities.",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert.",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious.",
  },
];

const Categories: React.FC = (): JSX.Element => {
  const params: ReadonlyURLSearchParams | null = useSearchParams();
  const category: string | null | undefined = params?.get("category");

  const pathname: string | null = usePathname();

  const isHomePage = pathname === "/";

  if (!isHomePage) return <></>;

  return (
    <Container>
      <div className="flex w-full flex-row items-center justify-between overflow-x-auto pt-4 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
        {categories.map((categoryItem) => (
          <CategoryBox
            key={categoryItem.label}
            label={categoryItem.label}
            icon={categoryItem.icon}
            selected={category === categoryItem.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
