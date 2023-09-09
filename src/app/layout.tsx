"use client";
import { ToastContainer } from "react-toastify";
import SideCart from "@/components/organisms/SideCart";
import 'react-toastify/dist/ReactToastify.css'
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar">
      <body className={inter.className}>
        <SWRConfig
          value={{
            errorRetryCount: 1,
          }}
        >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            draggable={true}
            theme="colored"
            limit={1}
          />
          <SideCart />

          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
