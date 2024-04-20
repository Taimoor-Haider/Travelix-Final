import { createSlice } from "@reduxjs/toolkit";

const selectedDate = localStorage.getItem("date")
  ? JSON.parse(localStorage.getItem("date"))
  : null;

const numPersons = localStorage.getItem("noOfPersons")
  ? JSON.parse(localStorage.getItem("noOfPersons"))
  : 1;

const initialState = {
  date: selectedDate,
  noOfPersons: numPersons,
};

const packageFromSlice = createSlice({
  name: "packageForm",
  initialState,
  reducers: {
    setSeletectedDate: (state, action) => {
      state.date = action.payload;
    },
    setNumberOfPersons: (state, action) => {
      state.noOfPersons = action.payload;
    },
  },
});

const { setSeletectedDate, setNumberOfPersons } = packageFromSlice.actions;
export const packageFormSelector = (state) => state.packageForm;
export default packageFromSlice.reducer;

export const setDate = (date) => async (dispatch, getState) => {
  dispatch(setSeletectedDate(date));
  localStorage.setItem("date", JSON.stringify(getState().packageForm.date));
};
export const setPersons = (persons) => async (dispatch, getState) => {
  dispatch(setNumberOfPersons(persons));
  localStorage.setItem(
    "noOfPersons",
    JSON.stringify(getState().packageForm.noOfPersons)
  );
};
