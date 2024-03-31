import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Product.module.css";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getProduct = async () => {
    const response = await fetch(
      `https://ecommerce-node4-five.vercel.app/products/category/${id}`
    );
    const data = await response.json();
    console.log(data.products.length);
    if (data.products.length === 0) {
      alert("No Product");
    }
    setProducts(data.products);
  };
  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div className="cards">
      {products.map((product) => (
        <div className={style.card} key={product._id}>
          <h2>{product.name}</h2>
          <img src={product.mainImage.secure_url} />
          <button>
            <Link to={`/details/${product._id}`}>Details</Link>
          </button>
        </div>
      ))}
    </div>
  );
}
