"use client";

import SideCart from "@/components/organisms/SideCart";
import "./globals.css";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProductElasticProvider from "@/contexts/productElasticContext";
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
          <ProductElasticProvider>
            <SideCart />
            {children}
          </ProductElasticProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
