import axios from "axios";
import React, { useState } from "react";
import style from "../component/Forget.module.css";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function ForgetPaswword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `https://ecommerce-node4-five.vercel.app/auth/forgotPassword`,
        user
      );
      console.log(data);
      if (data.message == "success") {
        toast.success("reset password successfuly!", {
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
        navigate("/signIn");
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
        <h2>Forget Password</h2>

        <form className={style.formLogin} onSubmit={handleSubmit}>
          <div className={style.inputbox}>
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className={style.inputbox}>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <div className={style.inputbox}>
            <input
              type="text"
              value={user.code}
              name="code"
              onChange={handleChange}
            />
            <label>Code</label>
          </div>

          <button type="submit" className={style.btn}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
