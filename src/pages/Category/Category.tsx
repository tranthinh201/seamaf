import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../../component/ProductItem/ProductItem";
import Page404 from "../Page404";

const CategoryProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<product[]>([]);
  const [nameCategory, setNameCategory] = useState("");
  useEffect(() => {
    async function getImageById() {
      const res = await axios.post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/getByCategory",
        { id }
      );
      const { data } = res.data;
      setNameCategory(data[0] && data[0].name_category);
      setProducts(data);
    }
    getImageById();
  }, [id]);
  console.log(products);
  return products.length > 0 ? (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container m-auto my-20">
      <div className="my-10 mx-6">Category: {nameCategory}</div>
      <div className="flex flex-wrap">
        {products.map((el) => (
          <ProductItem data={el} key={el.id_product} />
        ))}
      </div>
    </div>
  ) : (
    <div className="min-h-[50vh] flex justify-center items-center">
      Coming soon -&nbsp;
      <Link to={"/"} className="text-[#f00]">
        Back to home
      </Link>
    </div>
  );
};
export default CategoryProduct;
