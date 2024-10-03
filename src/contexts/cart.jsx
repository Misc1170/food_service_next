"use client";

import { createContext, useState, useEffect, useRef } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialRender = useRef(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const localstorage = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    setCartItems(localstorage);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const isItemInCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.dish_id === item.dish_id
    );

    return isItemInCart; // Поменять возврат объекта на тру фолсе
  }

  const addToCart = (item) => {
    if (isItemInCart(item)) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.dish_id === item.dish_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    if (isItemInCart(item)) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.dish_id !== item.dish_id)
      );
    }
  };

  const decreaseQuantity = (item) => {
    const isItemInCart = isItemInCart(item);

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.dish_id !== item.dish_id)
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.dish_id === item.dish_id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price_sell * item.quantity,
      0
    );
  };

  const getCartItems = () => {
    return cartItems;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        getCartTotal,
        getCartItems,
        isItemInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
