import React from "react";
import CheckSteps from "../components/CheckSteps";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import {
  createBooking,
  tourBookingSelector,
} from "../features/tour/tourbookingSlice";
import { Button } from "flowbite-react";
import { packageFormSelector } from "../features/PackageFromSlice";
import { getImageURL } from "../utils/image-utils";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/paymentAnim.json";
import { useNavigate } from "react-router-dom";
import PaymentModel from "../components/PaymentModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
function PlaceholderScreen() {
  const { userInfo } = useSelector(loginSelector);
  const { date, noOfPersons } = useSelector(packageFormSelector);
  const {
    booking,
    bookingPackage,
    bookedUserInfo,
    travellersInfo,
    paymentType,
  } = useSelector(tourBookingSelector);
  const navigate = useNavigate();
  const options = {
    animationData: Logo,
    loop: true,
  };
  const dispatch = useDispatch();
  const { View } = useLottie(options);

  // Check if bookingPackage and price are null before accessing them
  // let numberOfPersons = noOfPersons === 1 ? noOfPersons : noOfPersons + 1;
  const totalPrice =
    bookingPackage && bookingPackage.price
      ? bookingPackage.price * noOfPersons
      : 0;

  const handleBooking = (paymentMethod) => {
    const bookedItem = {
      item: bookingPackage.package,
      price: totalPrice,
      numberOfPersons: noOfPersons,
      tourDate: {
        startDate: date.startDate,
        finishDate: date.finishDate,
      },
    };

    const transformedData = travellersInfo.map((obj) => {
      const newObj = {};

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const [prefix, index] = key.split("-");
          const value = obj[key];
          const newKey = prefix;

          if (!newObj[newKey]) {
            newObj[newKey] = value;
          }
        }
      }

      return newObj;
    });

    console.log(bookedItem);
    console.log("Payment Type:" + paymentType);
    console.log("BookedItem:" + bookedItem);
    console.log("Booked userInfo:" + bookedUserInfo);
    console.log("Travellers Info:" + transformedData);

    if (bookedUserInfo && paymentType) {
      dispatch(
        createBooking(
          bookedItem,
          bookedUserInfo,
          transformedData,
          paymentType,
          paymentMethod
        )
      );
    }
  };

  return (
    <>
      <CheckSteps step1 step2 step3 step4 />
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
                <img src={bookingPackage?.images[0]} />
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="ml-2 text-lg font-bold">{bookingPackage?.name}</p>
                <p className="ml-2 text-lg font-normal">
                  {bookingPackage?.duration}
                </p>
                <p className="text-[#343a40] text-[xs] font-normal">
                  <FontAwesomeIcon icon={faStar} />
                  <strong>{`${bookingPackage?.rating?.toFixed(2)}`}</strong>(
                  {bookingPackage?.numOfReviews} reviews)
                </p>
              </div>
              <div>
                <p className="font-bold text-[1.5rem] tracking-widest">
                  Rs: {totalPrice}/-
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] mx-auto">{View}</div>
      </div>
      <div className="flex justify-center items-center">
        <PaymentModel handleBooking={handleBooking} />
      </div>
    </>
  );
}

export default PlaceholderScreen;
