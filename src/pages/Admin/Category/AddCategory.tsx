import axios from "axios";
import { useState } from "react";
import {
  showToastMessageError,
  showToastMessageSuccess,
  showToastWarning,
} from "../../../utils/ToastMessage";
import { Link } from "react-router-dom";

function AddCategory() {
  const [nameCategory, setNameCategory] = useState<string>("");
  interface category {
    nameCategory: string;
  }

  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    const category: category = {
      nameCategory: nameCategory,
    };
    if (nameCategory === "") {
      showToastWarning("Không được để trống!");
    } else {
      const res = await axios.post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/category",
        category
      );
      if (res.status === 200) {
        setNameCategory("");
        showToastMessageSuccess("Thêm category thành công!");
      } else {
        showToastMessageError("Error");
      }
    }
  };

  return (
    <div className="container m-auto">
      <div className="py-5">
        <Link to={"/admin/category"}>Back To Category Manager</Link>
      </div>
      <form
        className="p-10 min-h-[35vh]"
        onSubmit={() => handleAddCategory(event)}
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
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
