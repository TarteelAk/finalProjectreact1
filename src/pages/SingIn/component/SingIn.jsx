import React, { useState } from 'react'
import style from './SingIN.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';


export default function SingIn() {
    const [user,setUser] = useState({
      
        email:'',
        password:'',
       
      });
      const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser({
          ...user,
          [name] : value
        })
      };

    
      const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signin`,user);
        console.log(data);
      };
  return (
    <div className={style.body}>
    <div className={style.wrapper}>
        <div className={style.login}>
            <h2>Sing In</h2>
            <form className={style.formLogin} onSubmit={handleSubmit}>
                <div className={style.inputbox}>
                    <input type='email' value={user.email} name="email" onChange={handleChange}/>
                    <label>Email</label>
                </div>
                <div className={style.inputbox}>
                    <input type='password' value={user.password} name="password" onChange={handleChange}/>
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
        </div>
    </div></div>
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
  )
}
