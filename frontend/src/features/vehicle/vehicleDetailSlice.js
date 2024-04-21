// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  vehicle: JSON.parse(localStorage.getItem("vehicle")) || null,
  error: null,
  vehicleBookingUserInfo:
    JSON.parse(localStorage.getItem("vehicleBookingUserInfo")) || null,
  userBooking: null,
  success: false,
};

// Create slice
const vehicleDetailSlice = createSlice({
  name: "vehicleDetail",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.vehicle = null;
      state.error = null;
    },
    setVehicle: (state, { payload }) => {
      state.loading = false;
      state.vehicle = payload;
      state.error = null;
    },
    setVehicleBookingUserInfo: (state, { payload }) => {
      state.loading = false;
      state.vehicleBookingUserInfo = payload;
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
  setVehicle,
  setError,
  setVehicleBookingUserInfo,
  setBooking,
  setSuccess,
} = vehicleDetailSlice.actions;
export const vehicleDetailSlector = (state) => state.vehicleDetail;
export default vehicleDetailSlice.reducer;

// Async action to fetch vehicle data
export const fetchVehicle = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`https://travelix-backend-v2.vercel.app/api/vehicle/${id}`);
    dispatch(setVehicle(data));
    localStorage.setItem(
      "vehicle",
      JSON.stringify(getState().vehicleDetail.vehicle)
    );
  } catch (error) {
    // Handle error
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

// Action to update vehicle booking user info and save to local storage
export const addVehcileBookingUserInfo =
  (userInfo) => async (dispatch, getState) => {
    dispatch(setVehicleBookingUserInfo(userInfo));
    localStorage.setItem(
      "vehicleBookingUserInfo",
      JSON.stringify(getState().vehicleDetail.vehicleBookingUserInfo)
    );
  };

// Async action to create vehicle booking
export const createVehicleBooking =
  (bookedItem, bookedUserInfo, paymentType, paymentMethod) =>
  async (dispatch, getState) => {
    // Implement your logic here
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
      console.log("Booking is:" + booking);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-Token": `${token}`,
        },
      };

      const response = await axios.post(
        `https://travelix-backend-v2.vercel.app/api/vehicle/booking`,
        booking,
        config
      );

      console.log(response);
      console.log(response.status);

      if (response.status == 200) {
        dispatch(setSuccess());
      }
      console.log(data);
      // Dispatch the setBooking action with the response data
      dispatch(setBooking(response.data));
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      console.log(errorMessage);

      dispatch(setError(errorMessage));
    }
  };
