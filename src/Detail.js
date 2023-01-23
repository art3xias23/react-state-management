import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
    const {id} = useParams();
    const [size, setSize] = useState();
    console.log(`Id: ${id}`)
    const {data: product, loading, error} = useFetch(`products/${id}`)
    const navigate = useNavigate();

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
      <select
          id="size"
          value={size}
          onChange={(e) => {
            // debugger;
            setSize(e.target.value);
          }}
        >
          <option value="">What size?</option>
          {product.skus.map((x) => <option key={x.sku}>{x.size}</option>)}
        </select>
      <p>
        <button className="btn btn-primary" onClick={() => navigate("/cart")} disabled={!size}>
            Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
