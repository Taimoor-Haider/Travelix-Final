import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hotels: [],
  error: null,
  hotel: null,
  ownerBookings: [],
};

const hotelListSlice = createSlice({
  name: "hotelList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.hotels = [];
      state.error = null;
      state.hotel = null;
    },
    setHotels: (state, { payload }) => {
      state.loading = false;
      state.hotels = payload;
      state.error = null;
      state.hotel = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.hotels = [];
      state.error = payload;
      state.hotel = null;
    },
    setHotel: (state, { payload }) => {
      state.loading = false;
      state.hotel = payload;
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
const { setLoading, setHotels, setError, setHotel, setOwnerBookings } =
  hotelListSlice.actions;

//To Read
export const hotelListSelector = (state) => state.hotelList;

//To maintain data in store
export default hotelListSlice.reducer;

export const fetchHotelList = (ownerId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/hotels/user/${ownerId}`
    );
    console.log(data);
    dispatch(setHotels(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const fetchHotel = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/hotels/${id}`
    );
    dispatch(setHotel(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const deleteHotelById = (id) => async (dispatch, getState) => {
  try {
    const { _id } = getState().login.userInfo;
    await axios.delete(
      `https://travelix-backend-v2.vercel.app/api/hotels/${id}`
    );
    dispatch(fetchHotelList(_id));
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
      `https://travelix-backend-v2.vercel.app/api/hotel/booking/owner/${ownerId}`
    );
    dispatch(setOwnerBookings(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
