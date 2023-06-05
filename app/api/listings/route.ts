import { NextResponse } from "next/server";

import prismaClient from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageURL,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prismaClient.listing.create({
    data: {
      userId: currentUser.id,
      title,
      description,
      imageURL,
      location: location.code,
      category,
      price: parseInt(price, 10),
      guestCount,
      roomCount,
      bathroomCount,
    },
  });

  return NextResponse.json(listing);
};
