"use client";

import { useContext } from "react";
import DelieveryAddressForm from "../Forms/DelieveryAddressForm.jsx";
import GreenButton from "./GreenButton.jsx";
import { DelieveryAddressContext } from "@/contexts/delievery.jsx";
import { CartContext } from "@/contexts/cart.jsx";
import { ModalContext } from "@/contexts/modal.jsx";
import isEmpty from "@/functions/isEmpty.jsx";

export default function PayButton() {
  const {getDelieveryAddress} = useContext(DelieveryAddressContext);
  const {getCartItems} = useContext(CartContext)
  const {handleModal} = useContext(ModalContext)

  const payOrder = () => {
    const delieveryAddress = getDelieveryAddress();
    const cartItems = getCartItems();

    if (isEmpty(cartItems)) {
      alert('empty cart')
    }

    if (isEmpty(delieveryAddress)) {
      handleModal(<DelieveryAddressForm />)
    }

    console.log(['delieveryAddress', delieveryAddress, 'cartItems', cartItems])
  };

  return <GreenButton clickHandle={() => payOrder()}>Оплатить</GreenButton>;
}
