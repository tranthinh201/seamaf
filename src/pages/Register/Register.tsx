import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import axios from "axios";
import { showToastMessageSuccess } from "../../utils/ToastMessage";
import { showToastMessageError } from "../../utils/ToastMessage";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      username: userName,
    };

    axios
      .post(
        "https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/register",
        {
          ...user,
        }
      )
      .then(function (response) {
        if (response.data.success) {
          setEmail("");
          setPassword("");
          setUserName("");
          showToastMessageSuccess(response.data.success);
        } else {
          showToastMessageError(response.data.error);
        }
      });
  };

  // const userInfor = localStorage.getItem('user');
  const userInfor = useSelector(
    (state: any) => state.auth.login.currentUser?.data
  );

  return !userInfor ? (
    <div className="flex xl:w-[1400px] m-auto rounded-[20px] overflow-hidden my-6 border border-[rgba(0,0,0,.125)]">
      <div className='bg-[url("https://seamaf.com/frontend/img/background.jpg")] hidden lg:block bg-no-repeat bg-cover w-[45%]'></div>
      <div className="p-12 w-[65%]">
        <h1 className="text-center py-4 text-[24px] font-bold">
          Register Account
        </h1>
        <form method="post" onSubmit={handleRegister}>
          <div>
            <div className="relative mb-5">
              <div className="absolute text-[20px] text-[#f51167] left-3 top-[50%] translate-y-[-50%]">
                <MdEmail />
              </div>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 pl-10 outline-none focus:border-[#007bff] focus:outline-0 focus:shadow-[0_0_0_0.2rem_rgb(0 123 255 / 25%)]"
              />
            </div>
            <div className="relative mb-5">
              <div className="absolute text-[20px] text-[#f51167] left-3 top-[50%] translate-y-[-50%]">
                <MdEmail />
              </div>
              <input
                type="text"
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border p-2 pl-10 outline-none focus:border-[#007bff] focus:outline-0 focus:shadow-[0_0_0_0.2rem_rgb(0 123 255 / 25%)]"
              />
            </div>
            <div className="relative mb-5">
              <div className="absolute text-[20px] text-[#f51167] left-3 top-[50%] translate-y-[-50%] ">
                <GoKey />
              </div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 pl-10 outline-none focus:border-[#007bff]"
              />
            </div>
          </div>
          <div className="flex text-[18px]">
            <input type="checkbox" className="mr-2" />
            <p>Remember me</p>
          </div>
          <div className="bg-[#f51167] text-center rounded-[6px] my-3">
            <button className="w-full text-[18px] py-2 font-bold text-white">
              Login
            </button>
          </div>
          <div className="text-[#007bff] font-bold text-right">
            <Link to={"/"}>Forgot password ?</Link>
          </div>
          <p className="text-center py-3">or login with</p>
          <div className="flex justify-between p-10 border-b">
            <div className="w-[48%] text-center bg-[#4866a8] py-2 text-l font-bold text-white rounded-md">
              <Link to={"/"}>Facebook</Link>
            </div>
            <div className="w-[48%] text-center bg-[#da3f34] py-2 text-l font-bold text-white rounded-md">
              <Link to={"/"}>Google</Link>
            </div>
          </div>
          <div className="flex items-center flex-col mt-6">
            <div className="mb-2">
              <span>Check out as guest?</span>
              <Link to={"/"} className="text-[#007bff] font-bold">
                {" "}
                Click here
              </Link>
            </div>
            <div className="mb-2">
              <span>Don't have an account?</span>
              <Link to={"/"} className="text-[#007bff] font-bold">
                {" "}
                Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-[50vh]">
      Bạn đã đăng nhập
    </div>
  );
}

export default Register;
