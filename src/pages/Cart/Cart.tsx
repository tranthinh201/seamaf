import React, { useEffect, useState } from "react";

import SliderProduct from "../../component/SliderProduct/SliderProduct";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../utils/ToastMessage";

import { Link } from "react-router-dom";
import axios from "axios";

import { CiSquareRemove } from "react-icons/ci";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector } from "react-redux";

const Cart: React.FC = () => {
  const [cartItem, setCartItem] = useState([]);

  const user =
    useSelector((state: any) => state.auth.login.currentUser?.data) || null;

  const getCart = async () => {
    const userCart: any = {
      idUser: user?.id_user,
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

    if (res.status === 200) {
      res?.data?.message && showToastMessageError(res?.data?.message);
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
      showToastMessageSuccess("Xoá thành công!");
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
    <div className="container m-auto py-[105px]">
      {cartItem?.length === 0 ? (
        <div className="flex justify-center text-lg">
          <Link to={"/"}>Back to home</Link>
        </div>
      ) : (
        <div className="flex">
          <div className="bg-[#f0f0f0] rounded-[27px] w-[70%] flex flex-col justify-between">
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
                    <tr key={item.id_cart} className="text-black">
                      <td className="flex items-center py-4">
                        <img
                          src={`${item.path}`}
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
          <div className="flex flex-col w-[30%] mx-5">
            <div>
              <form className="border relative rounded-[80px] pl-3 pr-10">
                <input
                  type="text"
                  placeholder="Enter promo code "
                  className="text-[16px] pl-[24px] outline-none py-4"
                />
                <button className="absolute text-[#f51167] font-bold top-[50%] translate-y-[-50%] right-5">
                  SUBMIT
                </button>
              </form>
            </div>
            <div className="border rounded-[20px] my-5 px-8">
              <div className="py-4">
                <h3 className="font-bold text-[18px] pt-1">SHIPPING OPTIONS</h3>
                <div className="flex items-center py-4">
                  <h3 className="mr-4 text-[16px] font-bold">Select zone</h3>
                  <select className="border px-3 py-2 outline-none">
                    <option value="1">Greendale</option>
                    <option value="1">Greendale</option>
                    <option value="1">Greendale</option>
                    <option value="1">Greendale</option>
                    <option value="1">Greendale</option>
                  </select>
                </div>
                <div>
                  <button className="border bg-black rounded-[5px] text-white py-[0.375rem] px-[0.75rem] font-bold">
                    Caculate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white">
                <button className="bg-[#f51167] w-full mb-4 py-3 rounded-[10px] text-[16px] font-bold">
                  <Link to={"/checkout"}>PROCEED TO CHECKOUT</Link>
                </button>
              </div>
              <div className="text-white">
                <button className="bg-black w-full mb-4 py-3 rounded-[10px] text-[16px] font-bold">
                  CONTINUTE SHOPPING
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="py-5 mt-20">
          <h2 className="text-center text-[22px] font-bold">LATES PRODUCTS</h2>
        </div>
        <SliderProduct />
      </div>
    </div>
  );
};

export default Cart;
