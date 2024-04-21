// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "dotenv";

// Initial state
const initialState = {
  loading: false,
  userBookings: [],
  error: null,
};

// Create slice
const userBookingsSlice = createSlice({
  name: "userBookings",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.userBookings = null;
      state.error = null;
    },
    setUserBookings: (state, { payload }) => {
      state.loading = false;
      state.userBookings = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.userBookings = null;
      state.error = payload;
    },
  },
});

// Export actions and reducer
export const { setLoading, setUserBookings, setError } =
  userBookingsSlice.actions;
export const userBookingsSelector = (state) => state.userBookings;
export default userBookingsSlice.reducer;

// Async action to fetch tour data
export const fetchUserBookings = (userId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    console.log(
      `https://travelix-backend-v2.vercel.app/api/bookings/user/${userId}`
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(config);
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/bookings/user/${userId}`,
      config
    );

    dispatch(setUserBookings(data));
  } catch (error) {
    // Handle error
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
