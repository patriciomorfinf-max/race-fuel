import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Race Fuel — Nutrition planning for endurance athletes",
  description:
    "Race Fuel turns your weight, race duration and nutrition targets into a precise fueling plan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
