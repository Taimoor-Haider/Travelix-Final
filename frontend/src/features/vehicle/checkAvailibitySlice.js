// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const selectedDatesFromLocalStorage = localStorage.getItem(
  "vehicleSelectedDates"
)
  ? JSON.parse(localStorage.getItem("vehicleSelectedDates"))
  : null;

const paymentTypeFromLocalStorage = localStorage.getItem("vehiclePaymentType")
  ? JSON.parse(localStorage.getItem("vehiclePaymentType"))
  : "";

const numberOfDaysFromLocalStorage = localStorage.getItem("HotelNumberOfDays")
  ? Number(JSON.parse(localStorage.getItem("HotelNumberOfDays")))
  : 0;
// Initial state
const initialState = {
  selectedDates: selectedDatesFromLocalStorage,
  availibleLoading: false,
  isAvailible: false,
  availibilityError: null,
  paymentType: paymentTypeFromLocalStorage,
  hotelNumberOfDays: numberOfDaysFromLocalStorage,
};

// Create slice
const checkAvailibilitySlice = createSlice({
  name: "checkAvailibility",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.availibleLoading = true;
      state.isAvailible = false;
      state.availibilityError = null;
    },
    setIsAvailible: (state) => {
      state.availibleLoading = false;
      state.isAvailible = true;
      state.availibilityError = null;
    },
    setAvailibilityError: (state, { payload }) => {
      state.availibleLoading = false;
      state.isAvailible = false;
      state.availibilityError = payload;
    },
    setSelectedDates: (state, { payload }) => {
      state.selectedDates = payload;
    },
    setPaymentType: (state, { payload }) => {
      state.paymentType = payload;
    },
    setHotelNumberOfDays: (state, { payload }) => {
      state.hotelNumberOfDays = payload;
    },
  },
});

// Export actions and reducer
export const {
  setLoading,
  setIsAvailible,
  setAvailibilityError,
  setSelectedDates,
  setPaymentType,
  setHotelNumberOfDays,
} = checkAvailibilitySlice.actions;
export const checkAvailibilitySlector = (state) => state.checkAvailibility;
export default checkAvailibilitySlice.reducer;

export const checkAvailability =
  (startDate, finishDate, vehicleId) => async (dispatch) => {
    try {
      dispatch(setLoading());
      console.log("Start" + startDate);
      console.log("Finish" + finishDate);
      console.log("ID" + vehicleId);

      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/vehicle/booking/check-availability",
        {
          startDate: startDate,
          finishDate: finishDate,
          vehicleId: vehicleId,
        }
      );

      console.log(response);

      if (response.status === 400) {
        dispatch(setIsAvailible(false));
        console.log("False");
      }

      if (response.status === 200) {
        dispatch(setIsAvailible(true));
        console.log("True");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch(setAvailibilityError(errorMessage));
    }
  };

export const addSelectedDates = (dates) => async (dispatch) => {
  dispatch(setSelectedDates(dates));
  // Save the dates to local storage
  try {
    localStorage.setItem("vehicleSelectedDates", JSON.stringify(dates));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
export const addNumbeOfDays = (days) => async (dispatch) => {
  dispatch(setHotelNumberOfDays(days));
  // Save the dates to local storage
  try {
    localStorage.setItem("HotelNumberOfDays", JSON.stringify(days));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
export const addPaymentTypes = (payments) => async (dispatch) => {
  dispatch(setPaymentType(payments));
  // Save the dates to local storage
  try {
    localStorage.setItem("vehiclePaymentType", JSON.stringify(payments));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
