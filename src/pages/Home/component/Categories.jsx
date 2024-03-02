import React, { useState, useEffect } from 'react';
import style from './Categories.module.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Categories() {
  const [categories, setCategories] = useState([]);
   
  const getCategories = async()=>{
    const response = await fetch('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10');
    const data =await response.json();
    console.log(data.categories);
    setCategories(data.categories);

  }
  useEffect( ()=>{
    getCategories()
  },[]);

  return (
  
      <div className={style.container}>
         <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      
     
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    ><div className='carousel'>
      <div  className='inner-carousel'>
        {
      categories.map(categorie =>(
        <SwiperSlide className={style.item} key={categorie._id}>
          <div className={style.card}>
            <img src={categorie.image.secure_url}/>
            <h2>{categorie.name}</h2>
          </div>
        </SwiperSlide>
        
        
      ))
    }
      </div>
    </div>
      
     
      
    </Swiper>
      </div>


  
  )
}

export default Categories