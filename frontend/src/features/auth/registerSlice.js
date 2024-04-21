import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addUserInfo } from "./loginSlice";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.error = payload;
    },
    // Consider renaming this action to something more descriptive
    reset: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

const { setLoading, setUserInfo, setError, reset } = registerSlice.actions;

export const registerSelector = (state) => state.register;

export default registerSlice.reducer;

export const registerUser =
  (
    name,
    email,
    phone,
    password,
    image,
    role,
    address,
    accountNumber,
    accountName,
    bankName,
    idCardImage
  ) =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("accountName", accountName);
      formData.append("address", address);
      formData.append("accountNumber", accountNumber);
      formData.append("bankName", bankName);
      formData.append("image", image);
      formData.append("idCardImage", idCardImage);
      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let userObj = {
        ...response.data,
        token: response.headers["x-auth-token"],
      };
      dispatch(setUserInfo(userObj));
      dispatch(addUserInfo(userObj));
    } catch (error) {
      // Handle errors more gracefully
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch(setError(errorMessage));
    }
  };

export const setRegisterUserInfo = (userInfo) => async (dispatch) => {
  dispatch(setUserInfo(userInfo));
  dispatch(addUserInfo(userInfo));
};

export const resetRegister = () => async (dispatch) => {
  dispatch(reset());
};
