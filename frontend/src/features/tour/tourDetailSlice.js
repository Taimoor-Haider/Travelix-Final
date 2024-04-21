// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  tourPackage: null,
  error: null,
};

// Create slice
const tourDetailSlice = createSlice({
  name: "tourDetail",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.tourPackage = null;
      state.error = null;
    },
    setTourPackage: (state, { payload }) => {
      state.loading = false;
      state.tourPackage = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.tourPackage = null;
      state.error = payload;
    },
  },
});

// Export actions and reducer
export const { setLoading, setTourPackage, setError } = tourDetailSlice.actions;
export const tourDetailSelector = (state) => state.tourDetail;
export default tourDetailSlice.reducer;

// Async action to fetch tour data
export const fetchTour = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/tours/${id}`
    );
    dispatch(setTourPackage(data));
  } catch (error) {
    // Handle error
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(error.response.data);

    dispatch(setError(error));
  }
};
