import React, { useState } from "react";
import style from "../component/SendCode.module.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function SendCode() {
  const [email, setEmail] = useState("");
  const navgate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/auth/sendcode`,
        { email }
      );
      console.log(data);
      if (data.message == "success") {
        toast.success("Send Code Is success !", {
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
        navgate("/reset");
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
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <h2>Send Code</h2>

        <form className={style.formLogin} onSubmit={handleSubmit}>
          <div className={style.inputbox}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <button type="submit" className={style.btn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
