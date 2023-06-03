import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../../utils/ToastMessage";

function Category() {
  const [category, setCategory] = useState([]);

  async function getCategory() {
    try {
      const res = await axios.get(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/category"
      );
      const { data } = res.data;
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

  async function handleDeleteCategory(id: number) {
    const res = await axios.get(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/category/${id}`
    );
    if (res.status === 200) {
      showToastMessageSuccess("Xoá thành công!");
      getCategory();
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item: category) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-black"
              key={item.id_category}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
              >
                {item.id_category}
              </td>
              <td className="px-6 py-4 text-center">{item.name_category}</td>
              <td className="px-6 py-4 flex justify-around">
                <Link
                  to={`update/${item.id_category}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleDeleteCategory(item.id_category)}
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
}

export default Category;
