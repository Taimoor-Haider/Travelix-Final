// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookedPackage = localStorage.getItem("tourPackageInfo")
  ? JSON.parse(localStorage.getItem("tourPackageInfo"))
  : null;
const bookedUser = localStorage.getItem("bookedUserInfo")
  ? JSON.parse(localStorage.getItem("bookedUserInfo"))
  : null;

const payment = localStorage.getItem("paymentType")
  ? JSON.parse(localStorage.getItem("paymentType"))
  : null;

const travellors = localStorage.getItem("travellersInfo")
  ? JSON.parse(localStorage.getItem("travellersInfo"))
  : null;

// Initial state
const initialState = {
  loading: false,
  bookingPackage: bookedPackage,
  error: null,
  bookedUserInfo: bookedUser,
  travellersInfo: travellors,
  paymentType: payment,
  booking: null,
  success: false,
};

// Create slice
const tourBookingSlice = createSlice({
  name: "tourBooking",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.bookingPackage = null;
      state.error = null;
    },
    setBookingPackage: (state, { payload }) => {
      state.loading = false;
      state.bookingPackage = payload;
      state.error = null;
    },
    setBooking: (state, { payload }) => {
      state.loading = false;
      state.booking = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.bookingPackage = null;
      state.error = payload;
    },
    setBookedUserInfo: (state, { payload }) => {
      state.loading = false;
      state.bookedUserInfo = payload;
      state.error = null;
    },
    setTravellersInfo: (state, { payload }) => {
      state.loading = false;
      state.travellersInfo = payload;
      state.error = null;
    },
    setSuccess: (state) => {
      state.success = true;
    },
    addPayment: (state, { payload }) => {
      state.paymentType = payload;
    },
  },
});

// Export actions and reducer
export const {
  setLoading,
  setBookingPackage,
  setBooking,
  setError,
  setBookedUserInfo,
  setTravellersInfo,
  addPayment,
  setSuccess,
} = tourBookingSlice.actions;
export const tourBookingSelector = (state) => state.tourBooking;
export default tourBookingSlice.reducer;

// Async action to fetch tour data
export const fetchTour =
  (id, dateIndex, persons) => async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { data } = await axios.get(
        `https://travelix-backend-v2.vercel.app/api/tours/${id}`
      );
      if (data.personsAllowed < persons) {
        throw new Error("Seats not availible");
      }
      const bookingTour = {
        name: data.title,
        duration: data.duration,
        images: data.images,
        price: data.price,
        rating: data.rating,
        numOfReviews: data.numberOfReviews,
        date: data.availableDates[dateIndex],
        numberOfPersons: persons,
        package: data._id,
      };
      dispatch(setBookingPackage(bookingTour));
      localStorage.setItem(
        "tourPackageInfo",
        JSON.stringify(getState().tourBooking.bookingPackage)
      );
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      console.log(errorMessage);
      dispatch(setError(error));
    }
  };

export const addBookedUserInfo = (userInfo) => async (dispatch, getState) => {
  dispatch(setBookedUserInfo(userInfo));
  localStorage.setItem(
    "bookedUserInfo",
    JSON.stringify(getState().tourBooking.bookedUserInfo)
  );
};
export const addPaymentType = (type) => async (dispatch, getState) => {
  dispatch(addPayment(type));
  localStorage.setItem(
    "paymentType",
    JSON.stringify(getState().tourBooking.paymentType)
  );
};
export const addTravellersInfo =
  (travellersInfo) => async (dispatch, getState) => {
    dispatch(setTravellersInfo(travellersInfo));
    localStorage.setItem(
      "travellersInfo",
      JSON.stringify(getState().tourBooking.travellersInfo)
    );
  };

export const createBooking =
  (bookedItem, bookedUserInfo, travellersInfo, paymentType, paymentMethod) =>
  async (dispatch, getState) => {
    try {
      console.log("Creating Booking");
      dispatch(setLoading());
      const { _id, token } = getState().login.userInfo;

      const booking = {
        user: _id,
        bookedItem,
        bookedUserInfo,
        travellersInfo,
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
        `https://travelix-backend-v2.vercel.app/api/bookings/`,
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

export const getBookingDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/bookings/${id}`
    );
    dispatch(setBooking(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
