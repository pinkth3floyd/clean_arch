import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TansTackProvider from "./core/providers/tanstackprovider";
import { ContainerProvider } from "./core/main/di/container";
import { configureDependencies } from "./core/config/di";



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


const container = configureDependencies();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <TansTackProvider>

        {/* <ContainerProvider container={container}> */}

          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>

        {/* </ContainerProvider> */}
      </TansTackProvider>


    </html>
  );
}
