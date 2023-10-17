import "./globals.css";
import type { Metadata } from "next";
import { Quintessential } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./componets/Navbar";

const quintessential = Quintessential({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday",
  description: "BriBri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quintessential.className}>
        <Navbar />
        <div className="mx-auto max-w-7xl overflow-hidden">
          <div className="mx-auto max-w-xl">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
