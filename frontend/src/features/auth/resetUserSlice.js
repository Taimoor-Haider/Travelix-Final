import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetRegister } from "./registerSlice";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const resetSlice = createSlice({
  name: "reset",
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
    reset: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

const { setLoading, setUserInfo, setError, reset } = resetSlice.actions;

export const resetSelector = (state) => state.reset;

export default resetSlice.reducer;

export const resetUser =
  (name, password, image) => async (dispatch, getState) => {
    try {
      const { _id } = getState().login.userInfo;
      console.log("Enter method");

      dispatch(setLoading(true));
      const { data } = await axios.post(
        `https://travelix-backend-v2.vercel.app/api/auth/resetUserInfo`,
        {
          _id,
          name,
          password,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      // Retrieve existing userInfo from localStorage
      const existingUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      // Update the userInfo object with the new data
      const updatedUserInfo = {
        ...existingUserInfo,
        name: name ? name : existingUserInfo.name,
        password: password ? password : existingUserInfo.password,
        image: image ? image : existingUserInfo.image,
      };

      // Set the updated userInfo back to localStorage
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      dispatch(setUserInfo(data));
      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().reset.userInfo)
      );
      location.reload();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch(setError(errorMessage));
    }
  };
