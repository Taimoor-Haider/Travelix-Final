import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { Button } from "flowbite-react";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/paymentAnim.json";
import { useNavigate } from "react-router-dom";
import PaymentModel from "../components/PaymentModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  createHotelBooking,
  hotelDetailSelector,
} from "../features/hotel/hotelDetailSlice";
import HotelCheckoutSteps from "../components/HotelCheckoutSteps";
import { checkAvailibilitySlector } from "../features/hotel/checkAvailibilitySlice";
function HotelCheckout() {
  const { userInfo } = useSelector(loginSelector);
  const { hotel, hotelBookingUserInfo } = useSelector(hotelDetailSelector);
  const { selectedDates, paymentType, numberOfDays } = useSelector(
    checkAvailibilitySlector
  );
  const navigate = useNavigate();
  const options = {
    animationData: Logo,
    loop: true,
  };
  const dispatch = useDispatch();
  const { View } = useLottie(options);

  const handleBooking = (paymentMethod) => {
    const bookedItem = {
      item: hotel._id,
      price: hotel.price * numberOfDays,
      bookingDate: selectedDates,
    };

    if (hotelBookingUserInfo && paymentType) {
      dispatch(
        createHotelBooking(
          bookedItem,
          hotelBookingUserInfo,
          paymentType,
          paymentMethod
        )
      );
    }
  };
  return (
    <>
      <HotelCheckoutSteps step1 step2 step3 step4 />
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
                <img src={hotel?.images[0]} />
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="ml-2 text-lg font-bold">{hotel?.hotelName}</p>
                <p className="ml-2 text-lg font-normal">{hotel?.hotelChain}</p>
                <p className="text-[#343a40] text-[xs] font-normal">
                  <FontAwesomeIcon icon={faStar} />
                  <strong>{`${hotel?.rating?.toFixed(2)}`}</strong>(
                  {hotel?.noOfReviews} reviews)
                </p>
              </div>
              <div>
                <p className="font-bold text-[1.5rem] tracking-widest">
                  Rs: {hotel?.price * numberOfDays} Rs/-
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] mx-auto">{View}</div>
      </div>
      <div className="flex justify-center items-center">
        <PaymentModel handleBooking={handleBooking} btnText="Book Hotel" />
        {/* <Button type="submit" onClick={handleBooking}>
          Book
        </Button> */}
      </div>
    </>
  );
}

export default HotelCheckout;
