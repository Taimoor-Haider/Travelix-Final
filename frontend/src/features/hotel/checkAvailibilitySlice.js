// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const selectedDatesFromLocalStorage = localStorage.getItem("hotelSelectedDates")
  ? JSON.parse(localStorage.getItem("hotelSelectedDates"))
  : null;

const paymentTypeFromLocalStorage = localStorage.getItem("hotelPaymentType")
  ? JSON.parse(localStorage.getItem("hotelPaymentType"))
  : "";

const numberOfDaysFromLocalStorage = localStorage.getItem("numberOfDays")
  ? Number(JSON.parse(localStorage.getItem("numberOfDays")))
  : 0;
// Initial state
const initialState = {
  selectedDates: selectedDatesFromLocalStorage,
  availibleLoading: false,
  isAvailible: false,
  availibilityError: null,
  paymentType: paymentTypeFromLocalStorage,
  numberOfDays: numberOfDaysFromLocalStorage,
};

// Create slice
const checkAvailibilitySlice = createSlice({
  name: "checkHotelAvailibility",
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
    setNumberOfDays: (state, { payload }) => {
      state.numberOfDays = payload;
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
  setNumberOfDays,
} = checkAvailibilitySlice.actions;
export const checkAvailibilitySlector = (state) => state.checkHotelAvailibility;
export default checkAvailibilitySlice.reducer;

export const checkHotelAvailability =
  (startDate, finishDate, hotelId) => async (dispatch) => {
    try {
      dispatch(setLoading());
      console.log("Start" + startDate);
      console.log("Finish" + finishDate);
      console.log("ID" + hotelId);

      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/hotel/booking/check-availability",
        {
          startDate: startDate,
          finishDate: finishDate,
          hotelId: hotelId,
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
    localStorage.setItem("hotelSelectedDates", JSON.stringify(dates));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};

export const addNumbeOfDays = (days) => async (dispatch) => {
  dispatch(setNumberOfDays(days));
  // Save the dates to local storage
  try {
    localStorage.setItem("numberOfDays", JSON.stringify(days));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
export const addPaymentTypes = (payments) => async (dispatch) => {
  dispatch(setPaymentType(payments));
  // Save the dates to local storage
  try {
    localStorage.setItem("hotelPaymentType", JSON.stringify(payments));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
