import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  showToastMessageError,
  showToastMessageSuccess,
  showToastWarning,
} from "../../../utils/ToastMessage";

function UpdateCategory() {
  const { id } = useParams();

  const [nameCategory, setNameCategory] = useState<string>("");
  const [category, setCategory] = useState([]);
  interface category {
    nameCategory: string;
    id: any;
  }

  useEffect(() => {
    async function getCategoryById() {
      try {
        const res = await axios.get(
          `https://thinh-201-pain-epu-backend.onrender.com/api/v1/category/getId/${id}`
        );
        setCategory(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getCategoryById();
  }, []);

  const handleUpdateCategory = async (e: any) => {
    e.preventDefault();
    const category: category = {
      nameCategory: nameCategory,
      id: id,
    };
    console.log(category);
    if (nameCategory === "") {
      showToastWarning("Không được để trống!");
    } else {
      const res = await axios.post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/category/update",
        category
      );
      if (res.status === 200) {
        setNameCategory("");
        showToastMessageSuccess("Cập nhật category thành công!");
      } else {
        showToastMessageError("Error");
      }
    }
  };

  return (
    <div className="m-auto container">
      <div className="py-5">
        <Link to={"/admin/category"}>Back To Category Manager</Link>
      </div>

      <form
        className=" p-10 min-h-[35vh]"
        onSubmit={() => handleUpdateCategory(event)}
      >
        <div className="-mx-3 mb-6 flex items-center">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-first-name"
            >
              Name Category
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded   bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white outline-none"
              id="grid-first-name"
              type="text"
              placeholder="Category"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
            />
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
}

export default UpdateCategory;
