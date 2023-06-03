import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../../utils/ToastMessage";

const Product: React.FC = () => {
  const [product, setProduct] = useState([]);

  async function getProduct() {
    try {
      const res = await axios.get(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/getAll"
      );
      const { data } = res.data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  console.log(product);

  async function handleDeleteProduct(id: number) {
    console.log(id);
    const res = await axios.delete(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/delete/${id}`
    );
    if (res.status === 200) {
      showToastMessageSuccess("Xoá thành công!");
      getProduct();
    } else {
      showToastMessageError("Xoá thất bại!");
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container m-auto my-20">
      <div className="flex justify-end mr-8 my-4">
        <Link to={"add"} className="bg-slate-400 px-4 py-1 ">
          Add
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Outstanding
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {product?.map((item: product) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-black"
              key={item.id_product}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
              >
                {item.id_product}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
              >
                <img src={item.thumbnail} alt={item.name} className="w-14" />
              </td>
              <td className="px-6 py-4 text-center">{item.name}</td>
              <td className="px-6 py-4 text-center">{item.name_category}</td>
              <td className="px-6 py-4 text-center">{item.price}</td>
              <td className="px-6 py-4 text-center">{item.quantity}</td>
              <td className="px-6 py-4 text-center">
                {item.outstanding ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 flex justify-around">
                <Link
                  to={`update/${item.id_product}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleDeleteProduct(item.id_product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
