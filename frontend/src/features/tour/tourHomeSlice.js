import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  tours: [],
  error: null,
};

const tourHomeListSlice = createSlice({
  name: "tourHomeList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.tours = [];
      state.error = null;
    },
    setTours: (state, { payload }) => {
      state.loading = false;
      state.tours = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.tours = [];
      state.error = payload;
    },
  },
});

//To Update
const { setLoading, setTours, setError } = tourHomeListSlice.actions;

//To Read
export const tourHomeListSelector = (state) => state.tourHomeList;

//To maintain data in store
export default tourHomeListSlice.reducer;

export const fetchTours = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      "https://travelix-backend-v2.vercel.app/api/tours"
    );
    console.log(data);
    dispatch(setTours(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
