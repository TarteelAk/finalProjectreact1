import React, { useState, useEffect } from "react";
import style from "./AllProduct.module.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

export default function AllProduc() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(
      "https://ecommerce-node4-five.vercel.app/products?page=1&limit=10"
    );
    const data = await response.json();
    console.log(data.products);
    setProducts(data.products);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={style.container}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <div className="carousel">
          <div className="inner-carousel">
            {products.map((product) => (
              <SwiperSlide className={style.item} key={product._id}>
                <div className={style.card}>
                  <img src={product.mainImage.secure_url} />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
    </div>
  );
}
