import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetRegister } from "./registerSlice";

const initialState = {
  loading: false,
  error: null,
  email: "",
  success: false,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    setEmail: (state, { payload }) => {
      state.loading = false;
      state.email = payload;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.email = "";
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.email = "";
      state.error = payload;
    },
    setSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    resetEverything: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

const { setEmail, setLoading, setError, setSuccess, resetEverything } =
  forgetPasswordSlice.actions;

export const forgetpasswordSelector = (state) => state.forgetPassword;

export default forgetPasswordSlice.reducer;

export const forgetPassword = (email) => async (dispatch, getState) => {
  try {
    console.log("Forget password Function called");
    dispatch(setLoading(true));
    dispatch(setEmail(email));

    const response = await axios.post(
      "https://travelix-backend-v2.vercel.app/api/auth/forget-password",
      {
        email: email,
      }
    );
    if (response.status === 200) {
      dispatch(setSuccess());
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const reset = () => async (dispatch) => {
  dispatch(resetEverything());
};
