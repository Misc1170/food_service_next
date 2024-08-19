"use client";

import { createContext, useEffect, useState } from "react";

export const DelieveryAddressContext = createContext();

export const DelieveryAddressProvider = ({ children }) => {
  const [delieveryAddress, setDelieveryAddress] = useState({});

  useEffect(() => {
    const localStorage = localStorage.getItem("delieveryAddress")
      ? JSON.parse(localStorage.getItem("delieveryAddress"))
      : {};

    setDelieveryAddress(localStorage);
  }, []);

  //   useEffect(() => {
  //     if (initialRender.current) {
  //       initialRender.current = false;
  //       return;
  //     }
  //     localStorage.setItem("delieveryAddress", JSON.stringify(delieveryAddress));
  //   }, [delieveryAddress]);

  //   const addDelieveryAddress = (item) => {
  //     setDelieveryAddress(item);
  //   };

  const getDelieveryAddress = () => {
    console.log("delievery context");
    return delieveryAddress;
  };

  return (
    <DelieveryAddressContext.Provider value={{ getDelieveryAddress }}>
      {children}
    </DelieveryAddressContext.Provider>
  );
};
