import React, { useEffect, useState } from "react";

import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../../utils/ToastMessage";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { CiSquareRemove } from "react-icons/ci";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const AdminCartUpdate: React.FC = () => {
  const [cartItem, setCartItem] = useState([]);
  const { id } = useParams();

  const getCart = async () => {
    const userCart: any = {
      idUser: id,
    };
    try {
      const res = await axios.post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart/getCart",
        userCart
      );

      const { data } = res.data;
      setCartItem(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleIncrementQuantity = async (id: number) => {
    const res = await axios.post(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart/increase/${id}`
    );
    console.log(res);
    if (res.status === 200) {
      res?.data?.message
        ? showToastMessageError(res?.data?.message)
        : showToastMessageSuccess("Cập nhập giỏ hàng của khách thành công!");
      getCart();
    } else {
      showToastMessageError("Lỗi!");
    }
  };

  const handleDecrementQuantity = async (id: number) => {
    const res = await axios.post(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart/decrease/${id}`
    );
    if (res.status === 200) {
      showToastMessageSuccess("Cập nhật giỏ hàng của khách hàng thành công!");
      getCart();
    } else {
      showToastMessageError("Lỗi!");
    }
  };

  async function handleDeleteProduct(id: number) {
    const res = await axios.delete(
      `https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart/delete/${id}`
    );
    if (res.status === 200) {
      showToastMessageSuccess("Xoá giỏ hàng của khách hàng thành công!");
      getCart();
    } else {
      showToastMessageError("Xoá thất bại!");
    }
  }

  const getTotalPrice = () => {
    let total = 0;
    cartItem.map((item: any) => {
      total += item.price * item.quantityCart;
    });
    return total;
  };

  return (
    <div className="container m-auto">
      <div className="py-5">
        <Link to={"/admin/cart"}>Back To Cart Manager</Link>
      </div>
      <div className="flex items-center justify-center pb-[105px] min-h-[50vh]">
        {cartItem?.length === 0 ? (
          <div className="flex justify-center text-lg">
            <Link to={"/"}>Giỏ hàng của khách hàng này trống!</Link>
          </div>
        ) : (
          <div className="bg-[#f0f0f0] rounded-[27px] w-[100%] flex flex-col justify-between">
            <div className="p-10">
              <h1 className="pb-10 font-bold text-[28px]">Your Cart</h1>
              <table className="w-full border-collapse border-spacing-0">
                <thead>
                  <tr className="text-left">
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem?.map((item: any) => (
                    <tr key={item.id_cart}>
                      <td className="flex items-center py-4">
                        <img
                          src={item.thumbnail}
                          alt="image"
                          className="w-[73px] mr-8"
                        />
                        <div className="text-[16px]">
                          <h2 className="font-bold">{item.name}</h2>
                          <p>${item.price}</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <div className="flex items-center border rounded-[40px] px-[20px] mr-3 bg-white">
                            <AiOutlineMinus
                              className="text-[10px]"
                              onClick={() => {
                                item?.quantityCart > 1
                                  ? handleDecrementQuantity(item.id_cart)
                                  : handleDeleteProduct(item.id_cart);
                              }}
                            />
                            <input
                              type="text"
                              value={item?.quantityCart || 0}
                              className=" outline-none w-7 leading-9 text-[12px] text-center mx-3"
                            />
                            <AiOutlinePlus
                              className="text-[10px]"
                              onClick={() => {
                                handleIncrementQuantity(item.id_cart);
                              }}
                            />
                          </div>
                          <BsCheckLg className="text-[#00FF00]" />
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <div className="flex justify-between">
                          <p className="mr-2 text-md font-bold">
                            ${item.price}
                          </p>
                          <CiSquareRemove
                            className="text-[22px] text-[#d63031]"
                            onClick={() => handleDeleteProduct(item.id_cart)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-[32px] bg-[#f51167] rounded-b-[27px] flex font-bold text-[18px] text-white justify-end px-10">
              <h3 className="mr-[20px]">Total</h3>
              <h1>${getTotalPrice() || 0}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCartUpdate;
