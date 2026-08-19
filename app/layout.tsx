//----------------------------------------------------------------------------
// Base layout for all pages in the website.
//----------------------------------------------------------------------------

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import siteInfo from "@/siteinfo";
import "@/app/styles/globals.css";
import SkipLink from "@/components/skiplink";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <header className="sticky top-0 w-full bg-(--color-background) z-10 ">
          <SkipLink />
          <Navbar />
        </header>

        <main id="main" className="p-2">
          {children}
        </main>
      </body>
    </html>
  );
}
