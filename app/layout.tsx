import { Montserrat } from "next/font/google";

import ListOfModals from "./components/modals/ListOfModals";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const fontFamily = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Waterbnb",
  description: "A Next app with Airbnb-like functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Navbar />
        <ListOfModals />
        {children}
      </body>
    </html>
  );
}
