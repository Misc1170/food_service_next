"use client";

import { CartContext } from "@contexts/cart.jsx";
import { useContext } from "react";
import GreenButton from "./GreenButton.jsx";
import { ModalContext } from "@/contexts/modal.jsx";

export default function AddToCartButton({propItem}) {
  const { getDelieveryAddress } = useContext(DelieveryAddressContext);
  const { handleModal } = useContext(ModalContext);
  const { addToCart } = useContext(CartContext);

  const addItemToCart = () => {
      addToCart(propItem);

    // const delieveryAddress = getDelieveryAddress();
    console.log("propItem", propItem);
    // console.log("delieveryAddress", delieveryAddress);

    if (!delieveryAddress) {
        handleModal(<div>qwe</div>)
    }
  };

  return <GreenButton clickHandle={() => addItemToCart()}>В корзину</GreenButton>;
}
