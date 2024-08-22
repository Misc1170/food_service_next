"use client";

import { CartContext } from "@contexts/cart.jsx";
import { useContext } from "react";
import GreenButton from "./GreenButton.jsx";

export default function AddToCartButton({ propItem }) {
  const { addToCart } = useContext(CartContext);

  const addItemToCart = () => {
    addToCart(propItem);
  };

  return <GreenButton clickHandle={() => addItemToCart()}>В корзину</GreenButton>;
}
