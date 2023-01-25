import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Detail from "./Detail";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (error) {console.error("The cart could not get parsed into json", error)
  return []}
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
