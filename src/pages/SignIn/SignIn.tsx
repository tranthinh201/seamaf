import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginGoogle } from "../../redux/apiRequest";
import { auth, provider } from "../../helper/firebase";
import { signInWithPopup } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handelLogin = (e: any) => {
    e.preventDefault(); //Submit ko tai lai trang
    const inforLogin = {
      email: email,
      password: password,
    };
    loginUser(inforLogin, dispatch, navigate);
  };

  // const userInfor = localStorage.getItem('user');
  const userInfor = useSelector(
    (state: any) => state.auth.login.currentUser?.data
  );

  const handleClick = async () => {
    const infoEmail = await signInWithPopup(auth, provider);
    const data = {
      username: infoEmail.user.email,
      email: infoEmail.user.email,
    };
    loginGoogle(data, dispatch, navigate);
  };

  return !userInfor ? (
    <div className="flex xl:w-[1400px] m-auto rounded-[20px] overflow-hidden my-6 border border-[rgba(0,0,0,.125)]">
      <div className='bg-[url("https://stc.subi.vn/image/w/1/200622/tranh-treo-tuong-like-is-better-u-the-lake-2_350x350.jpg.webp")] hidden lg:block bg-no-repeat bg-cover w-[45%]'></div>
      <div className="p-12 w-[65%]">
        <h1 className="text-center py-4 text-[24px] font-bold">
          Login To Your Account
        </h1>
        <form method="post" onSubmit={() => handelLogin(event)}>
          <div>
            <div className="relative mb-5">
              <div className="absolute text-[20px] text-[#f51167] left-3 top-[50%] translate-y-[-50%]">
                <MdEmail />
              </div>
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 pl-10 outline-none focus:border-[#007bff] focus:outline-0 focus:shadow-[0_0_0_0.2rem_rgb(0 123 255 / 25%)]"
              />
            </div>
            <div className="relative mb-5">
              <div className="absolute text-[20px] text-[#f51167] left-3 top-[50%] translate-y-[-50%] ">
                <GoKey />
              </div>
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 pl-10 outline-none focus:border-[#007bff]"
              />
            </div>
          </div>
          <button className="border border-transparent  bg-gray-900  text-white flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
            <div>
              <p className="text-base leading-4">LOGIN</p>
            </div>
          </button>
          <div className="text-[#007bff] font-bold text-right">
            <Link to={"/"}>Forgot password ?</Link>
          </div>
          <p className="text-center py-3">or login with</p>
          <div className="flex justify-between p-10 border-b">
            <div className="w-[48%] text-center bg-[#4866a8] py-2 text-l font-bold text-white rounded-md">
              <Link to={"/"}>Facebook</Link>
            </div>
            <div
              className="w-[48%] text-center bg-[#da3f34] py-2 text-l font-bold text-white rounded-md cursor-pointer"
              onClick={handleClick}
            >
              Google
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
              <Link to={"/register"} className="text-[#007bff] font-bold">
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

export default SignIn;
