import { Montserrat } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const fontFamily = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "WaterBnB",
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
        {children}
      </body>
    </html>
  );
}
