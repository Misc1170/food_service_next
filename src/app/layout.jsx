"use client";

import "./index.css";
import Navbar from "@/components/Headers/Navbar";
import Footer from "@/components/Footers/Footer";
import { CartProvider } from "@/contexts/cart";
import { ModalProvider } from "@/contexts/modal";
import { usePathname } from "next/navigation";
import { DelieveryAddressProvider } from "@/contexts/delievery";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  const pathName = usePathname();

  return (
    <html lang="en">
      <body>
        <div id="modal-root"></div>
        <NextUIProvider>
          <DelieveryAddressProvider>
            <CartProvider>
              <ModalProvider>
                <Navbar />
                <div className={`${pathName === "/" ? "bg-main" : "bg-white"} min-h-[700px]`}>
                  <div className="container mx-auto">{children}</div>
                </div>
                <Footer />
              </ModalProvider>
            </CartProvider>
          </DelieveryAddressProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
