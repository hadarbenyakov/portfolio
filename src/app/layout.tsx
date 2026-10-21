import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Clash Grotesk (Fontshare, ITF Free Font License) — the home hero display face */
const clashGrotesk = localFont({
  src: [
    { path: "./fonts/ClashGrotesk-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/ClashGrotesk-400.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hadar Ben Yaakov — Portfolio",
  description:
    "Hey, I'm Hadar Ben Yaakov. Selected product and interaction design work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${clashGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
