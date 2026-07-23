import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(
    "https://sora-cosmetics.vercel.app"
  ),

  title: {
    default: "Sora Cosmetics | Premium Skincare & Beauty Products",
    template: "%s | Sora Cosmetics",
  },

  description:
    "Shop premium skincare, makeup and beauty products from Sora Cosmetics. Discover quality beauty products at affordable prices.",

  keywords: [
    "Sora Cosmetics",
    "skincare products",
    "beauty products",
    "makeup",
    "cosmetics shop",
    "face cream",
    "beauty care",
  ],

  authors: [
    {
      name: "Sora Cosmetics",
    },
  ],

  creator: "Sora Cosmetics",

  openGraph: {
    title:
      "Sora Cosmetics | Premium Skincare & Beauty Products",

    description:
      "Discover premium skincare, makeup and beauty products from Sora Cosmetics.",

    url: "https://sora-cosmetics.vercel.app",

    siteName: "Sora Cosmetics",

    type: "website",

    locale: "en_US",

  },

  twitter: {
    card: "summary_large_image",

    title:
      "Sora Cosmetics | Beauty Products",

    description:
      "Premium skincare and beauty products from Sora Cosmetics.",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >

        <CartProvider>

          <Navbar />

          {children}

          <Footer />

        </CartProvider>


      </body>

    </html>

  );

}