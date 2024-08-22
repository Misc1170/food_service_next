"use client";

import { createContext, useEffect, useState } from "react";

export const DelieveryAddressContext = createContext();

export const DelieveryAddressProvider = ({ children }) => {
  const [delieveryAddress, setDelieveryAddress] = useState({});

  useEffect(() => {
    const localstorage = localStorage.getItem("delieveryAddress")
      ? JSON.parse(localStorage.getItem("delieveryAddress"))
      : {};

    setDelieveryAddress(localstorage);
  }, []);

  const set = (formData) => {
    localStorage.setItem("delieveryAddress", JSON.stringify(formData));
    setDelieveryAddress(formData);
  }

  const getDelieveryAddress = () => {
    console.log('getDelievery', delieveryAddress)
    return delieveryAddress;
  };

  return (
    <DelieveryAddressContext.Provider value={{ getDelieveryAddress, set }}>
      {children}
    </DelieveryAddressContext.Provider>
  );
};
