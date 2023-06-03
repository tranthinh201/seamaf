import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

import {
  showToastMessageError,
  showToastMessageSuccess,
  showToastWarning,
} from "../../utils/ToastMessage";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

type Props = {
  data: {
    id_product: number;
    new: boolean;
    sale: boolean;
    name: string;
    price: number;
    thumbnail: string;
  };
};

const ProductItem: React.FC<Props | any> = ({ data }: Props) => {
  const user =
    useSelector((state: any) => state.auth.login.currentUser?.data) || null;
  const addToCart = async (id: number) => {
    if (user) {
      const product = {
        idUser: user.id_user,
        idProduct: id,
      };
      const res = await axios.post(
        `https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart`,
        product
      );
      if (res.status === 200) {
        res?.data?.message
          ? showToastMessageError(res?.data?.message)
          : showToastMessageSuccess("Thêm vào giỏ hàng thành công!");
      } else {
        showToastMessageError("Thêm vào giỏ hàng thất bại!");
      }
    } else {
      showToastWarning(
        "Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!"
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[262px] m-4">
        <div className="relative border border-[#dee2e6] min-h-[260px] overflow-hidden">
          <Link to={`/detail/${data.id_product}`}>
            {<img src={data.thumbnail} alt="image" className="h-[260px]" />}
          </Link>
          {data.new ? (
            <div className="absolute top-[16px] flex justify-between left-4 right-4">
              <div className=" bg-[#50e550] px-[6px] py-[2px] font-bold text-white rounded-[15px]">
                <p className="text-[10px]">NEW</p>
              </div>
              {data.sale ? (
                <div className=" bg-[#f51167] px-[6px] py-[2px] font-bold text-white rounded-[15px]">
                  <p className="text-[10px]">SALE</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="absolute right-[5px] bottom-[8px] flex flex-col items-end ">
            <button
              onClick={() => {
                addToCart(data?.id_product);
              }}
              className="bg-[#f1f1f1] flex items-center px-2 py-[10px] text-center mb-2 button-cart"
            >
              <FiShoppingCart />
              <span className="font-[600] pl-6 text-[12px] hidden invisible relative">
                ADD TO CART
              </span>
            </button>
            <button className="bg-[#f1f1f1] px-2 py-[10px] text-center w-8">
              <AiOutlineHeart />
            </button>
          </div>
        </div>
        <div className="flex justify-between pt-[22px] h-[87px]">
          <Link to={"/"} className="pr-14">
            <p className="text-[14px]">{data.name}</p>
          </Link>
          <span className="font-bold text-[#11111]">${data.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
