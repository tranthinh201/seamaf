import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../../utils/ToastMessage";
import { Link } from "react-router-dom";

function Checkout() {
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

  async function handleRemoveProduct(id: number) {
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
    <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
      <div className="flex flex-col justify-start items-start w-full space-y-9">
        <div className="flex justify-start flex-col items-start space-y-2">
          <button className="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1">
            <svg
              className="fill-stroke"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.91681 7H11.0835"
                stroke="currentColor"
                stroke-width="0.666667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.91681 7L5.25014 9.33333"
                stroke="currentColor"
                stroke-width="0.666667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.91681 7.00002L5.25014 4.66669"
                stroke="currentColor"
                stroke-width="0.666667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm leading-none">
              <Link to={"/cart"}>Back to cart</Link>
            </p>
          </button>
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
            Checkout
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
          <div className="flex flex-col">
            {cartItem.map((item: any) => (
              <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                <div className="flex flex-col justify-start items-start w-full space-y-4">
                  <div className="flex justify-between">
                    <p className="text-xl md:text-2xl leading-normal text-gray-800 dark:text-gray-50 w-3/5">
                      {item.name}
                    </p>
                    <p
                      className="cursor-pointer underline"
                      onClick={() => handleRemoveProduct(item.id_cart)}
                    >
                      Remove
                    </p>
                  </div>
                  <p className="text-base font-semibold leading-none text-gray-600 dark:text-white">
                    Price: {item.price}
                  </p>
                  <p className="text-base font-semibold leading-none text-gray-600 dark:text-white">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-32 xl:w-auto">
                  <img src={item.path} alt={item.name} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
            <button className="border border-transparent hover:border-gray-300 bg-gray-900 dark:bg-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:text-gray-900 dark:hover:text-white hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
              <div>
                <p className="text-base leading-4">Epu Paint</p>
              </div>
            </button>

            <div className="flex flex-row justify-center items-center mt-6">
              <hr className="border w-full" />
              <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 dark:text-white">
                pay
              </p>
              <hr className="border w-full" />
            </div>

            <div className="mt-8">
              <input
                className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                placeholder="Name"
              />
            </div>

            <div className="mt-8">
              <input
                className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-8">
              <input
                className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                placeholder="Phone number"
              />
            </div>

            <div className="mt-8">
              <textarea
                rows={12}
                className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                placeholder="Address"
              />
            </div>

            <button className="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
              <div>
                <p className="text-base leading-4">Pay {getTotalPrice()}$</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
