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

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.dish_id === item.dish_id
    );

    if (isItemInCart) {
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
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.dish_id === item.dish_id
    );

    if (isItemInCart) {
      cartItems.map((cartItem) => {
        cartItem.dish_id = item.dish_id ? cartItems.removeItem() : cartItem;
      });
    }
    setCartItems(cartItems.remove);
  };

  const decreaseQuantity = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.dish_id === item.dish_id
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.dish_id === item.dish_id)
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
        getCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
