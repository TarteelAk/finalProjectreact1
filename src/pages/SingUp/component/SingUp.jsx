import React, { useState } from 'react'
import style from './SingUp.module.css'
import axios from 'axios';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';

export default function SingUp() {
  const [user,setUser] = useState({
    userName:'',
    email:'',
    password:'',
    image:'',
  });
  const [error,setError] = useState([]);
  const [loader,setLoader] = useState(false);
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setUser({
      ...user,
      [name] : value
    })
  };
  const handleImageChange = (e)=>{
    const {name,files} = e.target;
    setUser({
      ...user,
      [name] : files[0]
    })

  };
   const vaildetData = async()=>{

    const schema=object({
      userName:string().min(4).max(20).required(),
      email:string().email().required(),
      password:string().min(8).max(25).required(),
      image:string().required(),
    })
    try{
      await schema.validate(user);
      return true ;
    }catch(error){
      console.log("error , invalid data ",error.errors);
      setError(error.errors);
      setLoader(false);
      return false;
    }
    
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoader(true);
   const vaildData = await vaildetData(user,{abortEarly:false});
   console.log(vaildData);
    const formData = new FormData();
    formData.append('userName',user.userName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('image',user.image);
    try{
    const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signup`,formData);
    setUser({
      userName:'',
    email:'',
    password:'',
    image:'',
    })
    console.log(data);
    if(data.message=='success'){
      toast.success('Create Account Done !', {
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
    }}catch(error){
      if(error.response.status === 409){
        toast.warn(error.response.data.message, {
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

    }
    finally{
      setLoader(false);
    }
  };
 
  return (
    <div className={style.wrapper}>
    <div className={style.register}>
        <h2>Sing Up</h2>
        {error.length > 0?error.map(err => 
        <p>{err}</p>):''}
        <form className={style.formLogin} onSubmit={handleSubmit} >
        <div className={style.inputbox}>
                <input type='text' value={user.userName} name="userName" onChange={handleChange}/>
                <label>User Name</label>
            </div>
            <div className={style.inputbox}>
                <input type='email' value={user.email} name="email" onChange={handleChange}/>
                <label>Email</label>
            </div>
            <div className={style.inputbox}>
                <input type='password' value={user.password} name="password" onChange={handleChange}/>
                <label>Password</label>
            </div>
            
            <div className={style.image}>
                <input type='file'  name="image" onChange={handleImageChange}/>
                <label>Image</label>
            </div>
            <div className={style.rememberforget}>
                    <label><input type='checkbox'/>I agree to the terms & conditions</label>
                    
                </div>
                <button type='submit' className={style.btn  }>{!loader?'Register':'wait...'}</button>
            
            
            
        </form>
    </div>
</div>
  )
}
