// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  hotel: JSON.parse(localStorage.getItem("hotel")) || null,
  error: null,
  hotelBookingUserInfo:
    JSON.parse(localStorage.getItem("hotelBookingUserInfo")) || null,
  userBooking: null,
  success: false,
};

// Create slice
const hotelDetailSlice = createSlice({
  name: "hotelDetail",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.hotel = null;
      state.error = null;
    },
    setHotel: (state, { payload }) => {
      state.loading = false;
      state.hotel = payload;
      state.error = null;
    },
    setHotelBookingUserInfo: (state, { payload }) => {
      state.loading = false;
      state.hotelBookingUserInfo = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.vehicle = null;
      state.error = payload;
    },
    setBooking: (state, { payload }) => {
      state.userBooking = payload;
    },
    setSuccess: (state) => {
      state.success = true;
    },
  },
});

// Export actions and reducer
export const {
  setLoading,
  setHotel,
  setHotelBookingUserInfo,
  setError,
  setBooking,
  setSuccess,
} = hotelDetailSlice.actions;
export const hotelDetailSelector = (state) => state.hotelDetail;
export default hotelDetailSlice.reducer;

// Async action to fetch vehicle data
export const fetchHotel = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/hotels/${id}`
    );
    dispatch(setHotel(data));
    localStorage.setItem("hotel", JSON.stringify(getState().hotelDetail.hotel));
  } catch (error) {
    // Handle error
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

// // Action to update vehicle booking user info and save to local storage
export const addHotelBookingUserInfo =
  (userInfo) => async (dispatch, getState) => {
    dispatch(setHotelBookingUserInfo(userInfo));
    localStorage.setItem("hotelBookingUserInfo", JSON.stringify(userInfo));
  };

// // Async action to create vehicle booking
export const createHotelBooking =
  (bookedItem, bookedUserInfo, paymentType, paymentMethod) =>
  async (dispatch, getState) => {
    try {
      console.log("Creating Booking");
      dispatch(setLoading());
      const { _id, token } = getState().login.userInfo;

      const booking = {
        user: _id,
        bookedItem,
        bookedUserInfo,
        paymentType,
        paymentMethod,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-Token": `${token}`,
        },
      };

      const response = await axios.post(
        `https://travelix-backend-v2.vercel.app/api/hotel/booking`,
        booking,
        config
      );
      console.log(response);
      console.log(response.status);

      if (response.status == 200) {
        dispatch(setSuccess());
      }

      // Dispatch the setBooking action with the response data
      dispatch(setBooking(response.data));
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch(setError(errorMessage));
    }
  };
