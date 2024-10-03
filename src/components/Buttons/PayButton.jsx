"use client";

import { useContext } from "react";
import DelieveryAddressForm from "../Forms/DelieveryAddressForm.jsx";
import GreenButton from "./GreenButton.jsx";
import { DelieveryAddressContext } from "@/contexts/delievery.jsx";
import { ModalContext } from "@/contexts/modal.jsx";
import isEmpty from "@/functions/isEmpty.jsx";

export default function PayButton({orderItems}) {
  const {getDelieveryAddress} = useContext(DelieveryAddressContext);
  const {handleModal} = useContext(ModalContext)

  const payOrder = () => {
    const delieveryAddress = getDelieveryAddress();

    if (isEmpty(orderItems)) {
      alert('empty cart')
    }

    if (isEmpty(delieveryAddress)) {
      handleModal(<DelieveryAddressForm />)
    }

    console.log(['delieveryAddress', delieveryAddress, 'orderItems', orderItems])
  };

  return <GreenButton clickHandle={() => payOrder()}>Оплатить</GreenButton>;
}
