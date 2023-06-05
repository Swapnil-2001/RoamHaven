import { Montserrat } from "next/font/google";

import ListOfModals from "./components/modals/ListOfModals";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import { ModifiedUser } from "./types";
import "./globals.css";

const fontFamily = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "RoamHaven",
  description: "A Next app with Airbnb-like functionality",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: ModifiedUser | null = await getCurrentUser();
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Navbar currentUser={currentUser} />
        <ListOfModals />
        <ToasterProvider />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
