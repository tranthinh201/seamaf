import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../../utils/ToastMessage";

const UpdateUser = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState<string>();

  useEffect(() => {
    async function getCategoryById() {
      try {
        const res = await axios.get(
          `https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/${id}`
        );
        setAdmin(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getCategoryById();
  }, []);

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    const user = {
      admin: admin,
      id: id,
    };
    const res = await axios.put(
      "https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/update",
      user
    );
    console.log(res);
    if (res.status === 200) {
      showToastMessageSuccess("Cập nhật user thành công!");
    } else {
      showToastMessageError("Error");
    }
  };

  return (
    <div className="m-auto container">
      <div className="py-5">
        <Link to={"/admin/user"}>Back To User Manager</Link>
      </div>

      <form className=" p-10 min-h-[35vh]" onSubmit={handleUpdateUser}>
        <div className="-mx-3 mb-6 flex items-center">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-first-name"
            >
              Is Admin
            </label>
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
              defaultValue={admin}
              value={admin}
              onChange={(e: any) => setAdmin(e.target.value)}
            >
              <option value="" selected disabled hidden>
                {admin ? "Yes" : "No"}
              </option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { UpdateUser };
