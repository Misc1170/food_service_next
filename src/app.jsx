import "./bootstrap";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "@components/App";
import { CartProvider } from "./contexts/cart.jsx";
import { ModalProvider } from "@/contexts/modal.jsx";
import { DelieveryAddressProvider } from "@contexts/delievery.jsx";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DelieveryAddressProvider>
        <CartProvider>
          {/* <ModalProvider> */}
            <App />
          {/* </ModalProvider> */}
        </CartProvider>
      </DelieveryAddressProvider>
    </BrowserRouter>
  </React.StrictMode>
);
