import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfoForAdmin } from "../auth/loginSlice";

const initialState = {
  loading: false,
  tours: [],
  error: null,
  tour: null,
  ownerBookings: [],
};

const tourListSlice = createSlice({
  name: "tourList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.tours = [];
      state.error = null;
      state.tour = null;
    },
    setTours: (state, { payload }) => {
      state.loading = false;
      state.tours = payload;
      state.error = null;
      state.tour = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.tours = [];
      state.error = payload;
      state.tour = null;
    },
    setTour: (state, { payload }) => {
      state.loading = false;
      state.tour = payload;
      state.error = null;
    },
    setOwnerBookings: (state, { payload }) => {
      state.loading = false;
      state.ownerBookings = payload;
      state.error = null;
    },
  },
});

//To Update
const { setLoading, setTours, setError, setTour, setOwnerBookings } =
  tourListSlice.actions;

//To Read
export const tourListSelector = (state) => state.tourList;

//To maintain data in store
export default tourListSlice.reducer;

export const fetchTourList = (ownerId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/tours/user/${ownerId}`
    );
    dispatch(setTours(data));
    console.log(data);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const fetchTour = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/tours/${id}`
    );
    dispatch(setTour(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const deleteTourById = (id) => async (dispatch, getState) => {
  try {
    const { _id } = getState().login.userInfo;
    await axios.delete(
      `https://travelix-backend-v2.vercel.app/api/tours/${id}`
    );
    dispatch(fetchTourList(_id));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const fetchBookingsOfOwner = (ownerId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/bookings/owner/${ownerId}`
    );
    dispatch(setOwnerBookings(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const becomeUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.put(
      `https://travelix-backend-v2.vercel.app/api/auth/updateRole`,
      {
        ownerId: userId,
      }
    );

    dispatch(setUserInfoForAdmin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
