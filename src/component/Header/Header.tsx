import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

import axios from "axios";

import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";

import "./Header.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [focus, setFocus] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState([]);

  // const user = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root") || "null").auth
  // );
  // const admin = user?.login?.currentUser?.data?.admin || null;

  const user = useSelector(
    (state: any) => state.auth.login?.currentUser?.data || null
  );

  const getCart = async () => {
    const userCart: any = {
      idUser: user?.id_user,
    };
    try {
      const res = await axios.post(
        `https://thinh-201-pain-epu-backend.onrender.com/api/v1/cart/getCart`,
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

  const [category, setCategory] = useState();

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await axios.get(
          "https://thinh-201-pain-epu-backend.onrender.com/api/v1/category"
        );
        const { data } = res.data;
        setCategory(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCategory();
  }, []);

  const listMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Our Shop",
      path: "/",
      submenu: category,
    },
    {
      id: 3,
      name: "On Sale",
      path: "/sale",
      sale: "SALE",
    },
    {
      id: 4,
      name: "Our Services",
      path: "/",
    },
    {
      id: 5,
      name: "Blog",
      path: "/",
    },
    {
      id: 6,
      name: "Contact",
      path: "/contact",
    },
    {
      id: 7,
      name: "Signin",
      path: "/signin",
      hidden: user ? true : false,
    },
  ];

  const [data, setData] = useState<Product[]>([]);

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const keySearch = {
        name: event.currentTarget.value,
      };
      const res = await axios.post<{ data: Product[] }>(
        `https://thinh-201-pain-epu-backend.onrender.com/api/v1/product/find`,
        keySearch
      );
      const { data } = res.data;
      setData(data);
      setFocus(true);
    }
  };

  const getTotalQuantity = () => {
    let total: number = 0;
    cartItem.map((item: cart) => {
      total += item.quantityCart;
    });
    return total;
  };

  return (
    <header>
      <div className="lg:m-auto lg:container xl:m-auto xl:container">
        <div className="flex m-auto justify-between items-center pt-[18px] pb-[16px] flex-col ssm:flex-col sm:flex-col lg:flex-row xl:flex-row">
          <div>
            <Link to={"/"} className="font-bold text-[24px]">
              ilubooks
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search on ilubooks.."
              onBlur={() => setFocus(false)}
              onKeyDown={(event) => handleSearch(event)}
              className="bg-[#ccc] show-header-search outline-none rounded-[20px] w-[100%] font-[14px] px-[20px] py-[10px] ssm:mb-[10px] sm:mb-[10px] lg:mb-0 lg:ml-2"
            />
            {focus ? (
              <div className="absolute bg-white right-0 left-0 p-4 h-[300px] text-black z-[1000] header-search overflow-y-scroll">
                <ul className="overflow-x-auto">
                  {data.map((item: any) => (
                    <li className="border-b">
                      <Link to={`/detail/${item.id}`}>
                        <div className="flex items-center justify-between py-2 px-6">
                          <div>
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="w-[80px] min-h-[40px]"
                            />
                          </div>
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-between mt-4 w-full px-4 md:w-[32%] xl:w-[32%]">
            <div>
              <select className="outline-none">
                <option value="1">U.S Dollar</option>
                <option value="2">VND</option>
                <option value="3">JS Dollar</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <AiOutlineHeart className="text-[22px]" />
              <Link to={"/"} className="ml-1">
                Wishlish
              </Link>
            </div>
            <Link to={"/cart"} className="flex justify-center items-center">
              <div className="relative">
                <FiShoppingCart className="text-[22px]" />
                <span
                  className="absolute top-[-14px] 
                            right-[-10px] text-[12px] 
                            bg-[#f51167] min-w-[16px] 
                            text-center rounded-full 
                            text-white"
                >
                  {getTotalQuantity() || 0}
                </span>
              </div>
              <div className="ml-1">
                <span>Shopping cart</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#282828] hidden ssm:hidden sm:hidden lg:block xl:block">
        <div className="container mx-auto">
          <ul className="flex">
            {listMenu.map(
              (item) =>
                !item.hidden && (
                  <li
                    key={item.id}
                    className="text-[16px] mr-[50px] py-[16px] text-[#ffffff] hover:text-[#f51167] font-[600] relative main-menu"
                  >
                    <Link to={item.path}>{item.name}</Link>
                    {item.sale ? (
                      <span className="absolute text-white top-[-10px] left-[15%] text-[10px] bg-[#f51167] pb-[1px] px-[9px] font-bold rounded-[42px]">
                        {item?.sale}
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.submenu ? (
                      <ul className="flex flex-col absolute bg-white z-50 text-black py-5 px-5 top-[56px] w-[210px] mt-5 transistion ease-in duration-200 invisible shadow-lg sub-menu">
                        {Object.values(item.submenu).map((el: any) => (
                          <li
                            className="py-1.5 pr-4 hover:text-[#f51167]"
                            key={el.id_category}
                          >
                            <Link
                              to={`/category-product/${el.id_category}`}
                              key={el.id_category}
                              className="py-1.5 pr-4"
                            >
                              {el.name_category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </li>
                )
            )}
            {user && (
              <li className="text-[16px] mr-[50px] py-[16px] text-[#ffffff] hover:text-[#f51167] font-[600]">
                <button
                  onClick={() => {
                    logoutUser(dispatch, navigate);
                  }}
                >
                  Sign up
                </button>
              </li>
            )}
            {user?.admin && (
              <>
                <li className="text-[16px] mr-[50px] py-[16px] text-[#ffffff] hover:text-[#f51167] font-[600] relative main-menu">
                  <Link to={"#"}>Admin</Link>
                  <ul className="flex flex-col absolute bg-white z-50 text-black py-5 pl-5 top-[56px] w-[210px] mt-5 transistion ease-in duration-200 invisible shadow-lg sub-menu">
                    <li className="py-1.5 pr-4 hover:text-[#f51167]">
                      <Link to={"/admin/category"} className="py-1.5 pr-4">
                        Manager Category
                      </Link>
                    </li>
                    <li className="py-1.5 pr-4 hover:text-[#f51167]">
                      <Link to={"/admin/product"} className="py-1.5 pr-4">
                        Manager Product
                      </Link>
                    </li>
                    <li className="py-1.5 pr-4 hover:text-[#f51167]">
                      <Link to={"/admin/cart"} className="py-1.5 pr-4">
                        Manager Cart
                      </Link>
                    </li>
                    <li className="py-1.5 pr-4 hover:text-[#f51167]">
                      <Link to={"/admin/user"} className="py-1.5 pr-4">
                        Manager User
                      </Link>
                    </li>
                    <li className="py-1.5 pr-4 hover:text-[#f51167]">
                      <Link to={"/admin/contact"} className="py-1.5 pr-4">
                        Manager Contact
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
