import { configureStore } from "@reduxjs/toolkit";
import tourHomeSlice from "./tour/tourHomeSlice";
import tourDetailSlice from "./tour/tourDetailSlice";
import tourbookingSlice from "./tour/tourbookingSlice";
import PackageFromSlice from "./PackageFromSlice";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";
import bookingPaySlice from "./booking/tourBookSlice";
import userBookingsSlice from "./tour/userBookingsSlice";
import forgetPasswordSlice from "./auth/forgetPasswordSlice";
import vehicleDetailSlice from "./vehicle/vehicleDetailSlice";
import checkAvailibitySlice from "./vehicle/checkAvailibitySlice";
import hotelDetailSlice from "./hotel/hotelDetailSlice";
import checkAvailibilitySlice from "./hotel/checkAvailibilitySlice";
import feedbackSlice from "./Feedback/feedbackSlice";
import vehicleListSlice from "./vehicleOwner/vehicleListSlice";
import hotelListSlice from "./hotelOwner/hotelListSlice";
import tourListSlice from "./tourOwner/tourListSlice";
import resetSlice from "./auth/resetUserSlice";
export const store = configureStore({
  reducer: {
    tourHomeList: tourHomeSlice,
    tourDetail: tourDetailSlice,
    tourBooking: tourbookingSlice,
    packageForm: PackageFromSlice,
    register: registerSlice,
    login: loginSlice,
    bookingPay: bookingPaySlice,
    userBookings: userBookingsSlice,
    forgetPassword: forgetPasswordSlice,
    vehicleDetail: vehicleDetailSlice,
    checkAvailibility: checkAvailibitySlice,
    hotelDetail: hotelDetailSlice,
    checkHotelAvailibility: checkAvailibilitySlice,
    feedback: feedbackSlice,
    vehicleList: vehicleListSlice,
    hotelList: hotelListSlice,
    tourList: tourListSlice,
    reset: resetSlice,
  },
});
