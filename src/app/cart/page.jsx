"use client";

import PageTitleName from "@components/Text/PageTitleName.jsx";
import { useContext } from "react";
import { CartContext } from "@contexts/cart.jsx";
// import {FcCancel} from "react-icons/fc";
import GreenButton from "@components/Buttons/GreenButton.jsx";
import Link from "next/link";
import OrderContents from "@/components/OrderContents";

export default function CartPage() {
  const {
    cartItems,
    getCartTotal,
  } = useContext(CartContext);

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <OrderContents
            orderItems={cartItems}
            totalPrice={getCartTotal()}
            isClearOrder={true}
            isChangeQuantityItem={true} />
        </>
      ) : (
        <>
          <PageTitleName titleName={"Корзина"} />
          <div className={"flex flex-col items-center"}>
            <h1 className="text-lg font-bold">Ваша корзина пуста</h1>
            <Link href="/dishes">
              <GreenButton>Выбрать блюдо</GreenButton>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
