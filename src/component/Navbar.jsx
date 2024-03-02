import React from "react"
import { Link } from 'react-router-dom';
import style from './Navbar.module.css'


const Navbar = ()=>{
    return (
        <nav className={style.navbar}>
            <div className={style.menu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={style.links}>
                <li><Link className = {style.logo}to="/categories">Categories</Link></li>
                <li><Link className = {style.logo}to="/products">Products</Link></li>
                <li><Link className = {style.logo}to="/cart">Cart</Link></li>
            </ul>
            <div className={style.autho}>
            <Link className = {style.logo} to="/signUp">Sign Up</Link>
            <Link className = {style.logo} to="/signin">Sign In</Link>

            </div>


        </nav>
       
    );

}
export default Navbar;