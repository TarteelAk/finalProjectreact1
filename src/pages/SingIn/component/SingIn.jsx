import React, { useContext, useState } from "react";
import style from "./SingIN.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/User";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";

export default function SingIn() {
  const { setUsetToken } = useContext(UserContext);
  const [error, setError] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const vaildetData = async () => {
    let schema = object({
      email: string().email().required(),
      password: string().required(),
    });
    try {
      await schema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("error , invalid data ", error.errors);
      setError(error.errors);
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const vaildData = await vaildetData(user, { abortEarly: false });
    console.log(vaildData);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/signin`,
        user
      );
      setUser({
        email: "",
        password: "",
      });
      console.log(data);
      if (data.message == "success") {
        toast.success("Login Is success !", {
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
        navigate("/categories");
        localStorage.setItem("userToken", data.token);
        setUsetToken(data.token);
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
  return (
    <div className={style.body}>
      <div className={style.wrapper}>
        <div className={style.login}>
          <h2>Sing In</h2>
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
            <div className={style.rememberforget}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forget">Forgot Password</Link>
            </div>
            <button
              type="submit"
              disabled={loader ? "disabled" : null}
              className={style.btn}
            >
              {!loader ? "Sign In" : "wait..."}{" "}
            </button>
            <div className={style.loginregister}>
              <p>
                Do not have an account ?{" "}
                <Link href="#" to="/signUp" className={style.reglink}>
                  Sing Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    /* <div className={style.signin}>
        <h2>Sing In</h2>
            <form className={style.formLogin}>
                <div className={style.inputbox}>
                    <input type='email'/>
                    <label>Email</label>
                </div>
                <div className={style.inputbox}>
                    <input type='password'/>
                    <label>Password</label>
                </div>
                <div className={style.rememberforget}>
                    <label><input type='checkbox'/>Remember me</label>
                    <a href='#'>Forgot Password</a>
                </div>
                <button type='submit' className={style.btn}>Sing In</button>
                <div className={style.loginregister}>
                    <p>Do not have an account ? <Link href='#' to='/signUp'className={style.reglink}>Sing Up</Link></p>
                </div>
            </form>

    </div>*/
  );
}
