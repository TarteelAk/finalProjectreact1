import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import style from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const getCart = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log(data.products);
      setCart(data.products);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (token == null) {
      navigate("/signIn");
    }
    getCart();
  }, [cart]);
  const incraseQuantity = async (productId) => {
    const { data } = await axios.patch(
      `https://ecommerce-node4-five.vercel.app/cart/incraseQuantity`,
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
  };
  const decraseQuantity = async (productId) => {
    const { data } = await axios.patch(
      `https://ecommerce-node4.vercel.app/cart/decraseQuantity`,
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
  };
  const removeItem = async (productId) => {
    const { data } = await axios.patch(
      `https://ecommerce-node4.vercel.app/cart/removeItem`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message === "success") {
      toast.success("remove success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className={style.cart}>
      {cart.map((product) => (
        <div className={style.cart1} key={product.productId}>
          <p>{product.details.name}</p>
          <button
            className={style.decInc}
            onClick={() => decraseQuantity(product.productId)}
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            className={style.decInc}
            onClick={() => incraseQuantity(product.productId)}
          >
            +
          </button>
          <button
            className={style.decInc}
            onClick={() => removeItem(product.productId)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
