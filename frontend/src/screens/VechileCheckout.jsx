import React from "react";
import VehicleCheckoutSteps from "../components/VehicleCheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/paymentAnim.json";
import { useNavigate } from "react-router-dom";
import PaymentModel from "../components/PaymentModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  createVehicleBooking,
  vehicleDetailSlector,
} from "../features/vehicle/vehicleDetailSlice";
import { checkAvailibilitySlector } from "../features/vehicle/checkAvailibitySlice";
function VechileCheckout() {
  const { userInfo } = useSelector(loginSelector);
  const { vehicle, vehicleBookingUserInfo } = useSelector(vehicleDetailSlector);
  const { selectedDates, paymentType, hotelNumberOfDays } = useSelector(
    checkAvailibilitySlector
  );

  const options = {
    animationData: Logo,
    loop: true,
  };
  const dispatch = useDispatch();
  const { View } = useLottie(options);

  const handleBooking = (paymentMethod) => {
    console.log("Booking Vehicle");
    const bookedItem = {
      item: vehicle._id,
      price: vehicle.price * hotelNumberOfDays,
      bookingDate: selectedDates,
    };

    if (vehicleBookingUserInfo && paymentType) {
      console.log("Inside If of Vehicle");
      dispatch(
        createVehicleBooking(
          bookedItem,
          vehicleBookingUserInfo,
          paymentType,
          paymentMethod
        )
      );
    }
  };

  return (
    <>
      <VehicleCheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3 grid-center">
          <div>
            <label className="text-xl font-semibold">Name:</label>
            <span className="ml-2 text-lg">{userInfo?.name}</span>
          </div>
          <div>
            <label className="text-xl font-semibold">Email:</label>
            <span className="ml-2 text-lg">{userInfo?.email}</span>
          </div>
          <div>
            <label className="text-xl font-semibold">Payment Type:</label>
            <span className="ml-2 text-lg">Stripe</span>
          </div>
          <div className="flex items-start gap-5 w-full mt-5">
            <div className="avatar">
              <div className="w-32 rounded">
                <img src={vehicle?.images[0]} />
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="ml-2 text-lg font-bold">
                  {vehicle?.vehicleModel}
                </p>
                <p className="ml-2 text-lg font-normal">
                  {vehicle?.rentalCompanyName}
                </p>
                <p className="text-[#343a40] text-[xs] font-normal">
                  <FontAwesomeIcon icon={faStar} />
                  <strong>{`${vehicle?.rating?.toFixed(2)}`}</strong>(
                  {vehicle?.noOfReviews} reviews)
                </p>
              </div>
              <div>
                <p className="font-bold text-[1.5rem] tracking-widest">
                  Rs: {vehicle?.price * hotelNumberOfDays}/-
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] mx-auto">{View}</div>
      </div>
      <div className="flex justify-center items-center">
        <PaymentModel handleBooking={handleBooking} btnText="Book Car" />
      </div>
    </>
  );
}

export default VechileCheckout;
