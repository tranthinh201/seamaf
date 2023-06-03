import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminCart() {
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    async function getListUser() {
      try {
        const res = await axios.get(
          "https://thinh-201-pain-epu-backend.onrender.com/api/v1/user"
        );
        const { data } = res.data;
        setDataUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getListUser();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container m-auto my-20">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-black">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Email
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {dataUser?.map((item: user) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-black"
              key={item.id_user}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
              >
                {item.id_user}
              </td>
              <td className="px-6 py-4 text-center">{item.email}</td>
              <td className="px-6 py-4 flex justify-around">
                <Link
                  to={`update/${item.id_user}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Cart
                </Link>
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
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

export default AdminCart;
