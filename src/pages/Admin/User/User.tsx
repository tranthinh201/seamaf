import axios from "axios";
import { useEffect, useState } from "react";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../../utils/ToastMessage";
import { Link } from "react-router-dom";
const User = () => {
  const [user, setUser] = useState([]);
  async function getAllUser() {
    try {
      const res = await axios(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/"
      );
      const { data } = res.data;
      setUser(data);
    } catch (err) {
      showToastMessageError(err);
    }
  }
  useEffect(() => {
    getAllUser();
  }, []);

  async function handleDeleteCategory(id: number) {
    const res = await axios.delete(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/${id}`
    );
    console.log(res);
    if (res.status === 200) {
      showToastMessageSuccess("Xoá thành công!");
      getAllUser();
    } else {
      showToastMessageError("Xoá thất bại!");
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg container m-auto my-20">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              User name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Admin
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user?.map((item: user) => (
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
                <td
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-center"
                >
                  {item.username}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-center"
                >
                  {item.email}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.admin ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 flex justify-around">
                  <Link
                    to={`update/${item.id_user}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleDeleteCategory(item.id_user)}
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

export { User };
