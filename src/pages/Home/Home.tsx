import { useEffect, useState } from "react";
import productApi from "../../axios/productApi";
import Banner from "../../component/Banner/Banner";
import ProductItem from "../../component/ProductItem/ProductItem";
import Slider from "../../component/Slider/Slider";
import SliderProduct from "../../component/SliderProduct/SliderProduct";
import axios from "axios";

function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getAll() {
      try {
        const res = await axios.get(
          "https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/getAll"
        );
        setProduct(res.data.data);
      } catch (e) {
        console.log(e);
      }
    }
    getAll();
  }, []);

  return (
    <div>
      <Slider />
      <div className="hidden md:flex">
        <div className="w-[33.33%] flex items-center justify-center py-[20px] px-[25px] bg-[#f8f8f8]">
          <img
            src="https://seamaf.com/frontend/img/icons/1.png"
            alt="image"
            className="w-[30px] mr-2"
          />
          <span className="text-[16px] font-[600] text-[#111111]">
            Fast Secure Payments
          </span>
        </div>
        <div className="w-[33.33%] flex items-center justify-center py-[20px] px-[25px] bg-[#f51167]">
          <img
            src="https://seamaf.com/frontend/img/icons/2.png"
            alt="image"
            className="w-[30px] mr-2"
          />
          <span className="text-[16px] font-[600] text-[#fff]">
            Fast Secure Payments
          </span>
        </div>
        <div className="w-[33.33%] flex items-center justify-center py-[20px] px-[25px] bg-[#f8f8f8]">
          <img
            src="https://seamaf.com/frontend/img/icons/3.png"
            alt="image"
            className="w-[30px] mr-2"
          />
          <span className="text-[16px] font-[600] text-[#111111]">
            Fast Secure Payments
          </span>
        </div>
      </div>
      <div>
        <div className="py-5">
          <h2 className="text-center text-[20px] font-bold">LATES PRODUCTS</h2>
        </div>
        <SliderProduct />
      </div>
      <div className="container flex flex-col md:flex-col sm:flex-col m-auto lg:flex-row xl:flex-row">
        <Banner
          image={
            "https://seamaf.com/storage/uploads/banners/jellyfish-698521_1280.jpg.jpg.webp"
          }
          title={"HANDMADE"}
          desc={"HURRY! 60% OFF"}
        />
        <Banner
          image={
            "https://seamaf.com/storage/uploads/banners/milky-way-2695569_1280.jpg.jpg.webp"
          }
          title={"EVENTS"}
          desc={"WEDDING & PARTY ACCESSORIES"}
        />
      </div>
      <div>
        <div className="py-5">
          <h2 className="text-center text-[20px] font-bold">
            BROWSE TOP SELLING PRODUCTS
          </h2>
        </div>
        <div className="container m-auto grid grid-cols-1 ssm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {product &&
            product?.map((item, index) => (
              <ProductItem data={item} key={index} />
            ))}
        </div>
      </div>
      <div className="container m-auto">
        <Banner
          image={
            "https://seamaf.com/storage/uploads/banners/nature-4103140_1280.jpg.jpg.webp"
          }
          title={"BEADING TOOLS"}
          desc={"3% DISCOUNT"}
        />
      </div>
    </div>
  );
}

export default Home;
