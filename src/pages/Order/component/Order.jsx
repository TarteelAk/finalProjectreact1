import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import style from "../component/Order.module.css";

export default function Order() {
  const token = localStorage.getItem("userToken");
  const [total, setTotal] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(data);
      setProducts(data.products);
    } finally {
      setLoader(false);
    }
  };
  const totalPrice = () => {
    let total = 0;
    products.map((index) => {
      total += index.details.finalPrice * index.quantity;
    });
    setTotal(total);
  };
  useEffect(() => {
    totalPrice();
  }, [products]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/order`,
        user,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      setUser({
        name: "",
        address: "",
        phone: "",
      });
      if (data.message == "success") {
        toast.success("Create Order", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div>
        <h2>Create Order</h2>

        {products.length > 0 ? (
          products.map((products) => (
            <div key={products.details.id} className={style.flex}>
              <h3> name : {products.details.name}</h3>

              <h3> Final Price : {products.details.finalPrice}$</h3>

              <h3>Quantity : {products.quantity}</h3>

              <h3>Total :{products.details.finalPrice * products.quantity}</h3>
            </div>
          ))
        ) : (
          <h2>Empty</h2>
        )}
        <h4>Total Price : {total}</h4>

        <div className={style.wrapper}>
          <div className={style.register}>
            <form onSubmit={handleOrder}>
              <div className={style.inputbox}>
                <input
                  type="text"
                  value={user.Name}
                  name={name}
                  onChange={handleChange}
                />
                <label>User Name</label>
              </div>

              <div className={style.inputbox}>
                <input
                  type="text"
                  value={user.address}
                  name="address"
                  onChange={handleChange}
                />
                <label>Address</label>
              </div>

              <div className={style.inputbox}>
                <input
                  type="text"
                  value={user.phone}
                  name="phone"
                  onChange={handleChange}
                />
                <label>Phonse</label>
              </div>

              <button
                type="submit"
                disabled={loader ? "disabled" : null}
                className={style.btn}
              >
                {!loader ? "Confirm Order" : "wait..."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
