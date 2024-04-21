import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  vehicles: [],
  error: null,
  vehicle: null,
  ownerBookings: [],
};

const vehcileListSlice = createSlice({
  name: "vehicleList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.vehicles = [];
      state.error = null;
      state.vehicle = null;
    },
    setVehicles: (state, { payload }) => {
      state.loading = false;
      state.vehicles = payload;
      state.error = null;
      state.vehicle = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.vehicles = [];
      state.error = payload;
      state.vehicle = null;
    },
    setVehicle: (state, { payload }) => {
      state.loading = false;
      state.vehicle = payload;
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
const { setLoading, setVehicles, setError, setVehicle, setOwnerBookings } =
  vehcileListSlice.actions;

//To Read
export const vehcileListSelector = (state) => state.vehicleList;

//To maintain data in store
export default vehcileListSlice.reducer;

export const fetchVehicleList = (ownerId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/vehicle/user/${ownerId}`
    );
    console.log(data);
    dispatch(setVehicles(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const fetchVehicle = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `https://travelix-backend-v2.vercel.app/api/vehicle/${id}`
    );
    dispatch(setVehicle(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
export const deleteVehicleById = (id) => async (dispatch, getState) => {
  try {
    const { _id } = getState().login.userInfo;
    await axios.delete(
      `https://travelix-backend-v2.vercel.app/api/vehicle/${id}`
    );
    dispatch(fetchVehicleList(_id));
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
      `https://travelix-backend-v2.vercel.app/api/vehicle/booking/owner/${ownerId}`
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
