import React from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, dispatch }) {
  const navigate = useNavigate();
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                dispatch({ type: "updateQuantity", sku, quantity });
              }}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  return (
    <>
      <section id="cart">
        <h1>
          {numItemsInCart === 0
            ? "Your cart is empty"
            : numItemsInCart > 1
            ? numItemsInCart + " items"
            : numItemsInCart + " item"}{" "}
        </h1>
        <ul>{cart.map(renderItem)}</ul>
        <button
          disabled={numItemsInCart === 0}
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </section>
    </>
  );
}
