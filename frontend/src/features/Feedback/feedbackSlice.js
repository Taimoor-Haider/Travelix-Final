// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Initial state
const initialState = {
  loading: false,
  feedback: null,
  error: null,
  feebackUpdateSuccess: false,
};

// Create slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.feedback = null;
      state.error = null;
    },
    setFeedback: (state, { payload }) => {
      state.loading = false;
      state.feedback = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.feedback = null;
      state.error = payload;
    },
    setFeebackUpdateSuccess: (state) => {
      state.feebackUpdateSuccess = true;
    },
  },
});

// Export actions and reducer
export const { setLoading, setFeedback, setError, setFeebackUpdateSuccess } =
  feedbackSlice.actions;
export const feedbackSelector = (state) => state.feedback;
export default feedbackSlice.reducer;

// Async action to fetch tour data
export const sendFeedback =
  (targetId, rating, message) => async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { _id, token } = getState().login.userInfo;
      console.log("https://travelix-backend-v2.vercel.app/api/reviews");
      console.log(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-Token": `${token}`,
        },
      };
      const { data } = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/reviews",
        {
          user: _id,
          targetId: targetId,
          rating: rating,
          comment: message,
        },
        config
      );

      dispatch(setFeedback(data));
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch(setError(errorMessage));
    }
  };

export const updateBookingFeedback = (productId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    console.log();
    const { data } = await axios.put(
      `https://travelix-backend-v2.vercel.app/api/bookings/updateFeedback/${productId}`
    );
    dispatch(setFeebackUpdateSuccess());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch(setError(errorMessage));
  }
};
