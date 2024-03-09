import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import style from './Product.module.css'

export default function Product() {


   
    const [products, setProducts] = useState([]);
    const {id} = useParams();
    console.log(id);
    const getProduct =async()=>{
        const response = await fetch(`https://ecommerce-node4.vercel.app/products/category/${id}`);
        const data = await response.json();
        console.log(data);
        setProducts(data.products);

    }
    useEffect(()=>{
        getProduct();
    },[id]);
   
 
 
    return (
    
        <div className='cards'>
         {
            
            products.map(product =>(
               <div className={style.card}  key={product._id}>
                <h2>{product.name}</h2>
                <img src={product.mainImage.secure_url}/>
                <button><Link>Details</Link></button>
               </div>
            ))
         }
            
        </div>
           
        
   
  )
}
