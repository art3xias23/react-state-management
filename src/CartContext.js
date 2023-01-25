import React, { useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

export const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (error) {
  console.error("The cart could not get parsed into json", error);
  initialCart = [];
}

export function CartProvider(props) {

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
const contextValue = {cart, dispatch}
  return <CartContext.Provider value={contextValue}>props.children</CartContext.Provider>;
}
