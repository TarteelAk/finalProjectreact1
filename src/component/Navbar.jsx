import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { UserContext } from "../context/User";

const Navbar = () => {
  const { userName, setUserToken, setUserName } = useContext(UserContext);

  const Logout = () => {
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.menu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={style.links}>
        <li>
          <NavLink className={style.logo} to="/categories">
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className={style.logo} to="/product">
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink className={style.logo} to="/cart">
            Cart
          </NavLink>
        </li>
      </ul>

      {userName ? (
        <div className={style.flex}>
          <NavLink className={style.log} to="/order">
            Order
          </NavLink>
          <NavLink className={style.log} to="/profile">
            Profile
          </NavLink>
          <NavLink className={style.btn} onClick={Logout}>
            LogOut
          </NavLink>
        </div>
      ) : (
        <>
          {" "}
          <div className={style.autho}>
            <NavLink className={style.logo} to="/signUp">
              Sign Up
            </NavLink>
            <NavLink className={style.logo} to="/signIn">
              Sign In
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
};
export default Navbar;
