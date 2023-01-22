import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
    const {id} = useParams();
    console.log(`Id: ${id}`)
    const {data: product, loading, error} = useFetch(`products/${id}`)

    console.log("Data: ");
    console.dir(product);

  if (loading) return <Spinner></Spinner>;
  if(!product) return <PageNotFound></PageNotFound>
  if (error) throw error;
//   TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
