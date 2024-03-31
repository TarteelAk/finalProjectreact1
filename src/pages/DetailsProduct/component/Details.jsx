import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Details.module.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function Details() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);
  const token = localStorage.getItem("userToken");
  console.log(token);
  const { id } = useParams();
  console.log(id);
  const getProduct = async () => {
    const response = await fetch(
      `https://ecommerce-node4-five.vercel.app/products/${id}`
    );
    const data = await response.json();
    console.log(data.product);
    setProducts(data.product);
  };
  useEffect(() => {
    getProduct();
  }, [id]);

  const addToCart = async (productId) => {
    // const{data}=await axios.post(`https://ecommerce-node4.vercel.app/cart`,{
    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data);
      if (data) {
        toast.success(" Done ", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      {
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };
  const navigate = useNavigate();
  const handleAdd = (prodId) => {
    if (!token) {
      navigate("/signIn");
      toast.info("You must SingIn first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else addToCart(prodId);
  };
  return (
    <div className="cards">
      {
        <>
          <h2>Name : {products.name}</h2>
          <h2>Price : {products.price}</h2>
          <h2>Stock : {products.stock}</h2>
          <img src={products.mainImage?.secure_url} />
          <button onClick={() => handleAdd(products._id)}>Add To Cart </button>
          <Link to={`/products/${products._id}/review`}>Add Review</Link>
        </>
      }
    </div>
  );
}
