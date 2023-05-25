import { Montserrat } from "next/font/google";
import { User } from "@prisma/client";

import ListOfModals from "./components/modals/ListOfModals";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import "./globals.css";

const fontFamily = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Waterbnb",
  description: "A Next app with Airbnb-like functionality",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: User | null = await getCurrentUser();
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Navbar currentUser={currentUser} />
        <ListOfModals />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
