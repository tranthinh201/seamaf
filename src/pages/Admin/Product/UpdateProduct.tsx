import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  showToastMessageError,
  showToastMessageSuccess,
  showToastWarning,
} from "../../../utils/ToastMessage";
import productApi from "../../../axios/productApi";

const UpdateProduct: React.FC = () => {
  const [category, setCategory] = useState([]);
  const [nameProduct, setNameProduct] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [thumbnail, setThumbnail] = useState<File | "undefined">();
  const [desc, setDesc] = useState<string>("");
  const [quantity, setQuantity] = useState<number>();
  const [outstanding, setOutstanding] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();
  const [showImage, setShowImage] = useState([]);

  const { id } = useParams<any>();
  const [detailProduct, setDetailProduct] = useState<product>();

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
    async function getDetail() {
      try {
        const res = await productApi.getDetail(id);
        console.log(res);
        setDetailProduct(res.data[0].description);
        setNameProduct(res.data[0].name);
        setQuantity(res.data[0].quantity);
        setPrice(res.data[0].price);
      } catch (e) {
        console.log(e);
      }
    }
    getDetail();
  }, []);

  useEffect(() => {
    getCategory();
  }, []);
  const navigate = useNavigate();

  const product = {
    name: nameProduct,
    categoryId: categoryId,
    quantity: quantity,
    price: price,
    description: desc,
    thumbnail: thumbnail,
    outstanding: outstanding,
    id: id,
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    if (nameProduct === "" || price === 0 || desc === "") {
      showToastWarning("Không được để trống!");
    } else {
      const res = await axios({
        method: "put",
        url: "https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/update",
        data: product,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        setNameProduct("");
        setDesc("");
        setPrice(0);
        showToastMessageSuccess("Cập nhật sản phẩm thành công!");
      } else {
        showToastMessageError("Error");
      }
    }
  };

  const files = Array.from(showImage).map((f) => URL.createObjectURL(f));

  return (
    <div className="container m-auto">
      <div className="py-5">
        <Link to={"/admin/product"}>Back To Product Manager</Link>
      </div>
      <form
        className="p-10"
        onSubmit={() => handleAddProduct(event)}
        encType="multipart/form-data"
      >
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-first-name"
            >
              Name Product
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="grid-first-name"
              type="text"
              placeholder={detailProduct?.name}
              value={nameProduct}
              onChange={(e: any) => setNameProduct(e.target.value)}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-last-name"
            >
              Price
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-last-name"
              type="text"
              placeholder={detailProduct?.price}
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-password"
            >
              Thumbnail
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-password"
              type="file"
              placeholder="...."
              multiple
              onChange={(e: any) => {
                setThumbnail(e.target.files);
                setShowImage(e.target.files);
              }}
            />
            <div className="flex">
              {/* {files &&
                files.map((el: any, index) => (
                  <div className="mr-20 border" key={index}>
                    <img
                      alt="Choose image"
                      src={URL.createObjectURL(e)}
                      className="w-[200px]"
                    />
                  </div>
                ))} */}
              <div className="border border-red-600">
                <img
                  alt="Choose image"
                  src={detailProduct?.thumbnail}
                  className="w-[200px]"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-password"
            >
              Description
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-password"
              type="text"
              placeholder="Description product"
              value={desc}
              onChange={(e: any) => setDesc(e.target.value)}
            />
            <p className="text-xs italic text-gray-600">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="-mx-3 mb-2 flex flex-wrap">
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-city"
            >
              Quantity
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-city"
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e: any) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-state"
            >
              Outstanding
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-state"
                value={outstanding}
                onChange={(e: any) => setOutstanding(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  {detailProduct?.outstanding ? "Yes" : "No"}
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-state"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-state"
                value={categoryId}
                onChange={(e: any) => setCategoryId(e.target.value)}
              >
                {category?.map((item: category) => (
                  <option key={item.id_category} value={item.id_category}>
                    {item.name_category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
