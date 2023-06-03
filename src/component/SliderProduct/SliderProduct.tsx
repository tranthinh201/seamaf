import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductItem from "../ProductItem/ProductItem";
import productApi from "../../axios/productApi";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SliderProduct() {
  const [latesProducts, setLatesProduct] = useState([]);

  useEffect(() => {
    async function getAll() {
      try {
        const res = await axios.get(
          "https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/getLatesProduct"
        );

        setLatesProduct(res.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    getAll();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{ delay: 1500 }}
        loop={true}
        onScroll={(s, e) => {
          e.preventDefault();
        }}
        modules={[Autoplay]}
        className="mySwiper container mb-10"
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          400: {
            slidesPerView: 1,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          984: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {latesProducts.map((item, index) => (
          <SwiperSlide className="flex justify-center" key={index}>
            <ProductItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

<style></style>;
