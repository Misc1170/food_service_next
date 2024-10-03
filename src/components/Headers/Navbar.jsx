"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import NavLinksWrapper from "@components/Wrappers/NavLinksWrapper";
import cartIcon from "@icons/cart.svg";
import personalIcon from "@icons/personal.svg";
import { CartContext } from "@contexts/cart.jsx";
import SpanLg from "@components/Text/SpanTags/SpanLg.jsx";
import AuthActions from "@/components/Auth/AuthActions.jsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const { cartItems } = useContext(CartContext);
  const [isDisplayActions, setIsDisplayActions] = useState(false);

  const toggleDisplayActions = () => {
    setIsDisplayActions(!isDisplayActions);
  };

  const ref = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDisplayActions(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return (
    <nav className="bg-F06D00 shadow-xl shadow-1F0000 py-4">
      <div className={"container mx-auto flex justify-between"}>
        <Link className="navbar-link" href="/">
          <div>
            <div>LOGO</div>
            <div>Название сервиса</div>
          </div>
        </Link>

        <NavLinksWrapper className="flex gap-x-4">
          <Link
            className={`navbar-link ${/dishes.*/.test(pathName) ? "active" : ""}`}
            href="/dishes"
          >
            Блюда
          </Link>
          <Link
            className={`navbar-link ${pathName === "/sets" ? "active" : ""}`}
            href="/sets"
          >
            Наборы готовых блюд
          </Link>
          <Link
            className={`navbar-link ${pathName === "/condition-delievery" ? "active" : ""}`}
            href="/condition-delievery"
          >
            Условия доставки
          </Link>
        </NavLinksWrapper>

        <NavLinksWrapper className={"relative"}>
          <Link
            className={`navbar-link ${pathName === "/cart" ? "active" : ""
              } relative`}
            href="/cart"
          >
            <Image width={50} height={50} src={cartIcon} alt="" />
            {cartItems.length > 0 ? (
              <div
                className={
                  "absolute top-0 right-0 w-6 h-6 border-2 border-white rounded-2xl bg-EEC7A6 flex justify-center items-center"
                }
              >
                <SpanLg className={"text-black font-bold"}>
                  {cartItems.length}
                </SpanLg>
              </div>
            ) : null}
          </Link>
          <div className={"relative"}>
            <Image
              width={50}
              height={50}
              src={personalIcon}
              alt=""
              className={
                "cursor-pointer " +
                (isDisplayActions ? "active" : "")
              }
              onClick={() => toggleDisplayActions()}
            />
            <div
              className={
                "bg-black border-0 rounded-2xl p-4 absolute right-0 " +
                (isDisplayActions ? "block" : "hidden")
              }
              ref={ref}
            >
              <AuthActions />
            </div>
          </div>
        </NavLinksWrapper>
      </div>
    </nav>
  );
}
