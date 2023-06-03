import { Link } from "react-router-dom";

import { FiInstagram } from "react-icons/fi";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { RxDot, RxDotFilled } from "react-icons/rx";

import "./Footer.css";

const listSocial = [
  {
    id: 1,
    name: "INSTARGRAM",
    icon: <FiInstagram />,
    color: "red",
  },
  {
    id: 2,
    name: "PINTERSET",
    icon: <FaPinterestP />,
    color: "blue",
  },
  {
    id: 3,
    name: "FACEBOOK",
    icon: <FaFacebookF />,
    color: "red",
  },
  {
    id: 4,
    name: "TWITTER",
    icon: <FaTwitter />,
    color: "red",
  },
  {
    id: 5,
    name: "YOUTUBE",
    icon: <FaYoutube />,
    color: "red",
  },
  {
    id: 6,
    name: "LINKEDIN",
    icon: <FaLinkedin />,
    color: "red",
  },
];

const Footer: React.FC = () => {
  const date = new Date().getFullYear();
  return (
    <div className="bg-[#282828] py-[12px] ssm:block sm:block">
      <div className="container m-auto lg:flex xl:flex">
        <div className="flex-[0_0_25%] p-4 text-white">
          <h2 className="text-[18px] font-bold mb-[25px]">ABOUT</h2>
          <p className="mb-[25px] text-[#8f8f8f]">
            Online & physical bead shop with the best beads and beading supplies
            in Zimbabwe ✓ Over 9000 beads for jewelry making ✓ Glass beads ✓
            Beading supplies and much more!
          </p>
          <img
            src="https://seamaf.com/frontend/img/cards.png"
            alt="image"
            className="w-full mb-6"
          />
          <form className="relative">
            <input
              type="email"
              placeholder="Enter e-mail"
              className="rounded-[5px] pl-[10px] pr-[70px] py-1 outline-none focus:border-[#80bdff] focus:border-1"
            />
            <button className="text-[#f51167] absolute right-7 font-bold py-1">
              SUBSCRICE
            </button>
          </form>
        </div>
        <div className="flex-[0_0_25%] p-4 text-white">
          <h2 className="text-[18px] font-bold mb-[25px]">USEFUL LINKS</h2>
          <div className="flex justify-between text-[#8f8f8f]">
            <ul>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/about"}>Abouts</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"}>Track Orders</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"}>Shipping</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/contect"}>Contact</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/cart"}>My Orders</Link>
              </li>
            </ul>
            <ul>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"} className="">
                  Support
                </Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"}>Term of Use</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"}>Privacy Policy</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/"}>Our Service</Link>
              </li>
              <li className="text-[16px] mb-[6px] hover:text-white flex items-center dot-hover">
                <div className="relative">
                  <RxDot className="dot1" />
                  <RxDotFilled className="absolute top-0 invisible text-[#ec105a] transition duration-75 ease-in-out opacity-0 dot2" />
                </div>
                <Link to={"/blog"}>Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-[0_0_25%] p-6 text-white">
          <h2 className="text-[18px] font-bold mb-[25px]">BLOG</h2>
          <div className="flex mb-[30px]">
            <div className='bg-[url("https://seamaf.com/storage/uploads/blog/zs5BpOd01zzl3q.jpg")] mr-[22px] bg-center bg-no-repeat object-cover w-[64px] h-[64px]'></div>
            <div>
              <h2 className="font-[600] text-[18px]">
                BOHE MIAN WEDDING THEME
              </h2>
              <p className="text-[#8f8f8f] text-[12px]">2 years ago</p>
              <Link to={"/"} className="text-[12px] text-[#f51167]">
                Read More
              </Link>
            </div>
          </div>
          <div className="flex mb-[30px]">
            <div className='bg-[url("https://seamaf.com/storage/uploads/blog/kQbaFz3Mul2782.jpg")] mr-[22px] bg-center object-cover w-[64px] h-[64px]'></div>
            <div>
              <h2 className="font-[600] text-[18px]">
                Vintage Wedding Theme `
              </h2>
              <p className="text-[#8f8f8f] text-[12px]">2 years ago</p>
              <Link to={"/"} className="text-[12px] text-[#f51167]">
                Read More
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-[0_0_25%] p-6 text-white">
          <h2 className="text-[18px] font-bold mb-[25px]">CONTACT</h2>
          <ul>
            <li className="flex mb-4">
              <span className="mr-[15px] text-[#f51167]">C.</span>
              <p className="text-[#8f8f8f]">ilubooks </p>
            </li>
            <li className="flex mb-4">
              <span className="mr-[15px] text-[#f51167]">B.</span>
              <p className="text-[#8f8f8f]">
                108 Chinhoyi Street, Central Business District, Harare Zimbabwe{" "}
              </p>
            </li>
            <li className="flex mb-4">
              <span className="mr-[15px] text-[#f51167]">T.</span>
              <p className="text-[#8f8f8f]">+263782149840 </p>
            </li>
            <li className="flex mb-4">
              <span className="mr-[15px] text-[#f51167]">E.</span>
              <p className="text-[#8f8f8f]">rvmseamaf@gmail.com </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#3b3535]">
        <ul className="container m-auto flex mt-2">
          {listSocial.map((item) => (
            <li key={item.id} className="flex mr-4 hover-social">
              <p className="text-[#d7d7d7] mr-3 text-[12px] ssm:text-[12px] sm:text-[16px] md:text-[16px] lg:text-xl">
                {item.icon}
              </p>
              <span className="text-[#9f9fa0] font-bold cursor-pointer text-[8px] ssm:text-[12px] sm:text-[16px] md:text-[16px] lg:text-l ">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <div className="container mx-auto flex justify-center">
          <p className="text-[#fff] mt-8 mb-4 text-[14px]">
            Copyright ©{date} All rights reserved | Trần Thịnh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
