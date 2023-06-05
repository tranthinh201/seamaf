import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import SliderProduct from "../../component/SliderProduct/SliderProduct";
import {
  showToastMessageSuccess,
  showToastMessageError,
  showToastWarning,
} from "../../utils/ToastMessage";
import productApi from "../../axios/productApi";
import axios from "axios";
import "./DetailProduct.css";

const DetailProduct: React.FC = () => {
  const { id } = useParams<any>();
  const [detail, setDetail] = useState<any>([]);

  let [count, setCount] = useState<number>(0);
  let [desc, setDesc] = useState<boolean>(false);
  let [shipping, setShipping] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getDetail() {
      try {
        const res = await productApi.getDetail(id);
        setDetail(res.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
    getDetail();
  }, [id]);

  const listColor = [
    {
      id: 1,
      color: "Green",
    },
    {
      id: 2,
      color: "Blue",
    },
    {
      id: 3,
      color: "Gray",
    },
    {
      id: 4,
      color: "Purple",
    },
  ];

  function handelShowDesc() {
    setDesc(!desc);
    setShipping(false);
  }

  function handelShowShipping() {
    setShipping(!shipping);
    setDesc(false);
  }

  const imageRef = useRef<any>("");

  function zoomImage(e: any) {
    const zoomer = e.currentTarget;
    const x = (e.offsetX / zoomer.offsetWidth) * 100;
    const y = (e.offsetY / zoomer.offsetHeight) * 100;
    imageRef.current.style.backgroundPosition = x + "% " + y + "%";
  }

  const user =
    useSelector((state: any) => state.auth.login.currentUser?.data) || null;
  const addToCart = async (id: number) => {
    if (user) {
      const product = {
        idUser: user.id_user,
        idProduct: id,
      };
      const res = await axios.post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart",
        product
      );
      if (res.status === 200) {
        showToastMessageSuccess("Thêm vào giỏ hàng thành công!");
      } else {
        showToastMessageError("Thêm vào giỏ hàng thất bại!");
      }
    } else {
      showToastWarning(
        "Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!"
      );
    }
  };

  const [image, setImage] = useState<Image[]>([]);

  useEffect(() => {
    async function getImageById() {
      const res = await axios.get(
        `https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/getImageProduct/${detail.id_product}`
      );
      const { data } = res.data;
      console.log(data);
      setImage(data);
    }
    getImageById();
  }, [detail.id_product]);

  return (
    <div>
      <div>
        <div className="bg-[#f8f7f7] pt-5 pb-3">
          <div className="container m-auto text-black font-bold">
            <h1 className="text-[24px]">{detail?.name}</h1>
            <div className="text-[14px]">
              <Link to={"/"}>Home</Link>/<Link to={"/"}>Shop</Link>
            </div>
          </div>
        </div>
        <div className="container m-auto pt-5 pb-[65px]">
          <div className="text-[12px] pb-[50px]">
            <Link to={"/"}>{" << Back to Categories"}</Link>
          </div>
          <div className="flex">
            <div className="w-[50%] py-4 pr-4">
              <div className="mh-[400px] w-full">
                <figure
                  ref={imageRef}
                  onMouseMove={zoomImage}
                  className="zoom w-full"
                  style={{
                    backgroundImage: `url(${detail.thumbnail})`,
                  }}
                >
                  <img src={detail.thumbnail} alt="image" />
                </figure>
              </div>
              <div className="flex h-[100px] mt-4">
                {image &&
                  image.map((el) => (
                    <div
                      className="mr-6 border-2 border-[#dc3545]"
                      key={el.id_image}
                    >
                      {el.path && (
                        <img src={el.path} className="h-full" alt="image" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[50%] p-4">
              <div className="border-b-2 w-full border-[#e1e1e1] pb-[60px]">
                <h2 className="text-[18px] mb-4 font-bold">{detail?.name}</h2>
                <h3 className="mb-3 text-[24px] font-bold">${detail?.price}</h3>
                <span className="text-[12px] font-bold">
                  Availability: <span className="text-[#f51167]">In stack</span>
                </span>
                <div className="mb-[40px] flex pt-3 items-center">
                  <h3 className="text-[16px] font-bold mr-4">COLOR</h3>
                  <div className="flex items-center">
                    {listColor.map((item) => (
                      <button
                        key={item.id}
                        className="border-2 border-black rounded-[4px] px-[10px] py-[5px] text-[14px] mx-2 focus:bg-[#f51167] focus:border-[#f51167] focus:text-white"
                      >
                        <p>{item?.color}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => addToCart(detail?.id_product)}
                    className="border border-transparent  bg-gray-900  text-white flex flex-row justify-center items-center space-x-2 py-4 rounded w-full"
                  >
                    <div>
                      <p className="text-base leading-4">ADD TO CART</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="border-b-2 w-full border-[#e1e1e1] min-h-[70px] mt-[50px]">
                <div className="flex items-center justify-between pb-[20px]">
                  <h2 className="text-[15px] font-bold">DESCRIPTION</h2>
                  {shipping ? (
                    <MdKeyboardArrowUp
                      className="text-[28px]"
                      onClick={() => handelShowShipping()}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      className="text-[28px]"
                      onClick={() => handelShowShipping()}
                    />
                  )}
                </div>
                {shipping ? (
                  <div className="pb-2 transition duration-700 ease-in-out">
                    {detail?.description}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="border-b-2 w-full border-[#e1e1e1] min-h-[70px]">
                <div className="flex items-center justify-between pb-[20px]">
                  <h2 className="text-[15px] font-bold">SHIPPING & RETURN</h2>
                  {desc ? (
                    <MdKeyboardArrowUp
                      className="text-[28px]"
                      onClick={() => handelShowDesc()}
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      className="text-[28px]"
                      onClick={() => handelShowDesc()}
                    />
                  )}
                </div>
                {desc ? (
                  <div className="pb-2 transition duration-700">
                    Small ring baskets on white
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-5">
          <h2 className="text-center text-[20px] font-bold">LATES PRODUCTS</h2>
        </div>
        <SliderProduct />
      </div>
    </div>
  );
};

export default DetailProduct;
