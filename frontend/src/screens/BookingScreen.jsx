import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  tourBookingSelector,
  fetchTour as bookingTour,
} from "../features/tour/tourbookingSlice";
import {
  tourDetailSelector,
  fetchTour,
} from "../features/tour/tourDetailSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import CardCarousel from "../components/CardCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import calculateNumberOfDays from "../utils/numberOfDaysCalculator";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function BookingScreen() {
  const { id } = useParams();
  const { search } = useLocation();

  const { loading, bookingPackage, error } = useSelector(tourBookingSelector);
  const { tourPackage } = useSelector(tourDetailSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  const dateIndex = params.get("dateIndex")
    ? parseInt(params.get("dateIndex"))
    : 0;
  const persons = params.get("persons") ? parseInt(params.get("persons")) : 1;
  // useEffect(() => {
  //   if (
  //     !bookingPackage ||
  //     JSON.stringify(bookingPackage) !== localStorage.getItem("tourPackageInfo")
  //   ) {
  //     localStorage.setItem("tourPackageInfo", JSON.stringify(bookingPackage));
  //   }
  // }, [bookingPackage]);
  useEffect(() => {
    dispatch(fetchTour(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (tourPackage && tourPackage.availableDates) {
      if (dateIndex <= tourPackage.availableDates.length - 1) {
        dispatch(bookingTour(id, dateIndex, persons));
      }
    }
  }, [tourPackage, dateIndex, persons, dispatch]);

  const handleCheckout = () => {
    navigate("/login?redirect=/BookingInfo");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        bookingPackage && (
          <>
            <div className="flex justify-start items-center gap-5">
              <button
                className="btn btn-square cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <h1 className="text-3xl font-bold text-[#495057]">
                Booking Details
              </h1>
            </div>
            <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] my-[3rem] ">
              <div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div style={{ width: "100%", height: "100%" }}>
                    <CardCarousel images={bookingPackage.images} flag={true} />
                  </div>
                  <div className="flex-initial justify-center items-center md:items-start md:justify-start md:w-[50%] flex flex-col gap-1">
                    <Link to={`/tour/${bookingPackage.package}`}>
                      <p className="text-[#343a40] text-2xl font-semibold">
                        {bookingPackage.name}
                      </p>
                    </Link>
                    <p className="text-[#343a40] text-[sm] font-normal">
                      {bookingPackage.duration}
                    </p>
                    <p className="text-[#343a40] text-[xs] font-normal">
                      <FontAwesomeIcon icon={faStar} />
                      <strong>{`${bookingPackage.rating.toFixed(2)}`}</strong>(
                      {bookingPackage.numOfReviews} reviews)
                    </p>
                    <p>{`${bookingPackage.price} Rs/-`}</p>
                  </div>
                </div>
              </div>
              <div className="box-shadow-1 p-6 mt-[1rem] md:mt-0  md:w-[60%] md:mx-auto">
                <h1
                  className="text-3xl underline
                 font-normal text-[#343a40] mb-7"
                >
                  Price details
                </h1>
                <ul className="flex flex-col gap-5">
                  <li className="flex justify-between items-center">
                    <p className="text-lg font-bold">No. of Persons</p>
                    <p className="text-lg font-semibold">
                      {bookingPackage.numberOfPersons}
                    </p>
                  </li>

                  <li className="flex justify-between items-center">
                    <p className="text-lg font-bold">No. of Days</p>
                    <p className="text-lg font-semibold">
                      {`${calculateNumberOfDays(
                        bookingPackage.date.startDate,
                        bookingPackage.date.finishDate
                      )} Days`}
                    </p>
                  </li>
                  <div className="divider divider-start"></div>
                  <li className="mt-auto flex justify-between items-center">
                    <p className="text-lg font-bold">Total Bill</p>
                    <p className="text-lg font-semibold">
                      {`Rs ${
                        bookingPackage.price * bookingPackage.numberOfPersons
                      }/-`}
                    </p>
                  </li>
                  <li className="mt-auto flex justify-between items-center">
                    <Button onClick={handleCheckout} className="w-full">
                      Proceed to checkout
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default BookingScreen;
