import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import CardCarousel from "../components/CardCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button } from "flowbite-react";
import calculateNumberOfDays from "../utils/numberOfDaysCalculator";
import { checkAvailibilitySlector } from "../features/hotel/checkAvailibilitySlice";
import {
  fetchHotel,
  hotelDetailSelector,
} from "../features/hotel/hotelDetailSlice";

function HotelBooking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [dispatch, id]);

  const { loading, hotel, error } = useSelector(hotelDetailSelector);
  const { selectedDates } = useSelector(checkAvailibilitySlector);
  const handleCheckout = () => {
    navigate("/login?redirect=/hotel/BookingInfo");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        hotel && (
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
            <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] my-[3rem] grid-rows-[20rem]">
              <div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <CardCarousel images={hotel.images} flag={true} />
                  </div>
                  <div className="flex-initial justify-center items-center md:items-start md:justify-start md:w-[50%] flex flex-col gap-1">
                    <Link to={`/hotel/${hotel._id}`}>
                      <p className="text-[#343a40] text-2xl font-semibold">
                        {hotel.hotelName}
                      </p>
                    </Link>
                    <p className="text-[#343a40] text-[sm] font-normal">
                      {hotel.location}
                    </p>
                    <p className="text-[#343a40] text-[xs] font-normal">
                      <FontAwesomeIcon icon={faStar} />
                      <strong>{`${hotel.rating.toFixed(2)}`}</strong> (
                      {hotel.noOfReviews} reviews)
                    </p>
                    <p>{`${hotel.price} Rs/-`}</p>
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
                    <p className="text-lg font-bold">No. of Days</p>
                    <p className="text-lg font-semibold">
                      {selectedDates &&
                        `${calculateNumberOfDays(
                          selectedDates.startDate,
                          selectedDates.finishDate
                        )} Days`}
                    </p>
                  </li>
                  <div className="divider divider-start"></div>
                  <li className="mt-auto flex justify-between items-center">
                    <p className="text-lg font-bold">Total Bill</p>
                    <p className="text-lg font-semibold">
                      {`Rs ${hotel.price}/-`}
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

export default HotelBooking;
