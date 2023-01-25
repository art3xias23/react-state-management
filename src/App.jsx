import React, { useReducer, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Detail from "./Detail";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";
import { CartContext } from "./CartContext";

let initialCart;
  try {
    initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
  } catch (error) {console.error("The cart could not get parsed into json", error)
initialCart= []}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{cart, dispatch}}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
