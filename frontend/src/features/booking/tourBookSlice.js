import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: false,
  error: null,
  success: false,
  flag: false,
};

const bookingPaySlice = createSlice({
  name: "bookingPay",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    setFlag: (state) => {
      state.flag = false;
    },
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

const { setLoading, setSuccess, setError, setFlag, reset } =
  bookingPaySlice.actions;

export const bookingPaySelector = (state) => state.bookingPay;

export default bookingPaySlice.reducer;

export const payBooking =
  (bookingId, paymentMethod) => async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { token } = getState().login.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-Token": token,
        },
      };
      const response = await axios.put(
        `https://travelix-backend-v2.vercel.app/api/bookings/${bookingId}`,
        paymentMethod,
        config
      );
      console.log(response.status);
      console.log(response);

      if (response.status === 200) {
        console.log("Response Status" + response.status);
        dispatch(setFlag());
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser());
      }
      dispatch(setError(errorMessage));
    }
  };

export const bookingReset = () => async (dispatch) => {
  dispatch(reset());
};
