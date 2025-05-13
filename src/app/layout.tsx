import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TansTackProvider from "./core/providers/tanstackprovider";
import { TooltipProvider } from "./core/ui/elements/tooltip";
import { Toaster } from "../app/core/ui/elements/toaster";
import { Toaster as Sonner } from "../app/core/ui/elements/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clean Architecture Implementation",
  description: "Written By Prakash Niraula",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <TansTackProvider>
        <TooltipProvider>
          <Toaster/>
          {/* <Sonner/> */}

          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </TooltipProvider>

      </TansTackProvider>
    </html>
  );
}