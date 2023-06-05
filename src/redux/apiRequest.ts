import axios from "axios";
import {
  showToastMessageError,
  showToastMessageSuccess,
} from "../utils/ToastMessage";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./authSlice";

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://thinh-201-pain-epu-backend.onrender.com/api/v1/user/login",
      user
    );
    console.log(res.data);
    if (res.data) {
      showToastMessageSuccess("Đăng nhập thành công!");
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (error) {
    showToastMessageError("Đăng nhập thất bại!");
    dispatch(loginFailed());
  }
};

export const loginGoogle = async (user: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://thinh-201-pain-epu-backend.onrender.comv1/user/register-google",
      user
    );

    if (res.data) {
      showToastMessageSuccess("Đăng nhập thành công!");
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (error) {
    showToastMessageError("Đăng nhập thất bại!");
    dispatch(loginFailed());
  }
};

export const logoutUser = async (dispatch: any, navigate: any) => {
  dispatch(logoutStart());
  try {
    dispatch(loginSuccess(null));
    localStorage.clear();
    showToastMessageSuccess("Đăng xuất thành công!");
    navigate("/");
  } catch (error) {
    showToastMessageError("Đăng xuất thất bại!");
    dispatch(loginFailed());
  }
};
