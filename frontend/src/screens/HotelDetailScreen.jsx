import React, { useState } from "react";
import { useEffect } from "react";
import CardCarousel from "../components/CardCarousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import DatepickerComponent from "../components/DatepickerComponent";
import EmenitiesModal from "../components/EmenitiesModal";
import FeedBackSection from "../ui/FeedBackSection";
import { Button } from "flowbite-react";
import calculateNumberOfDays from "../utils/numberOfDaysCalculator";

import {
  fetchHotel,
  hotelDetailSelector,
} from "../features/hotel/hotelDetailSlice";
import {
  addNumbeOfDays,
  checkAvailibilitySlector,
  checkHotelAvailability,
} from "../features/hotel/checkAvailibilitySlice";
import { addSelectedDates } from "../features/hotel/checkAvailibilitySlice";

function HotelDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isAvailibility, setIsAvailibility] = useState(null);
  const [showAvailibility, setShowAvailibility] = useState(false);
  const { loading, hotel, error } = useSelector(hotelDetailSelector);
  const { availibleLoading, isAvailible, availibilityError } = useSelector(
    checkAvailibilitySlector
  );

  useEffect(() => {
    if (isAvailible) {
      setShowAvailibility(true);
    }
  }, [isAvailible]);
  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [id]);

  const handleBooking = () => {
    if (isAvailible) {
      navigate(`/hotel/booking/${hotel._id}`);
    }
  };

  const handleCheckAvailibility = (startDate, finishDate) => {
    if (hotel) {
      dispatch(addSelectedDates({ startDate, finishDate }));
      dispatch(addNumbeOfDays(calculateNumberOfDays(startDate, finishDate)));
      dispatch(checkHotelAvailability(startDate, finishDate, hotel._id));
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        hotel && (
          <>
            <div className="grid-3">
              <div className="grid-of-images">
                <div s style={{ width: "100%", height: "100%" }}>
                  <CardCarousel images={hotel.images} flag={true} />
                </div>
              </div>
              <div>
                <ul class="w-96 text-surface dark:text-white">
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-2xl font-medium">{hotel.hotelName}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{hotel.location}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <Rating
                      value={hotel.rating}
                      text={`by ${hotel.noOfReviews} users.`}
                    />
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{hotel.hotelChain}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-md font-medium">{hotel.description}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    {hotel.amenities.map(
                      (feature, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {feature}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {hotel.amenities.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={hotel.amenities}
                      />
                    )}
                  </li>
                </ul>
              </div>
              <div>
                <ul class="w-96 text-surface dark:text-white">
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                    <span className="text-2xl font-semibold">Price</span>
                    <p className="text-2xl font-medium">
                      {hotel.price} Rs/- per day
                    </p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-start items-center">
                    <span className="text-2xl font-semibold">
                      Check Availibility
                    </span>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-center items-center gap-2">
                    <p className="text-2xl font-medium">
                      <DatepickerComponent
                        handleCheckAvailibility={handleCheckAvailibility}
                      />
                    </p>
                  </li>
                  <p>
                    {availibilityError ? (
                      <Message>{availibilityError}</Message>
                    ) : (
                      ""
                    )}
                  </p>
                  {showAvailibility && (
                    <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                      <span className="text-2xl font-semibold">Status</span>
                      <p className="text-2xl font-medium">
                        {isAvailible ? (
                          <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Availible
                          </span>
                        ) : (
                          <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            Unavailable
                          </span>
                        )}
                      </p>
                    </li>
                  )}
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                    <Button
                      className=" bg-[#008395] w-[100%]"
                      onClick={handleBooking}
                      disabled={!isAvailible}
                    >
                      Book
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <section className="section-feedback">
              {hotel.feedbacks.map(
                ({ user, rating, comment, createdAt, response }, index) => (
                  <FeedBackSection
                    key={index}
                    user={user}
                    rating={rating}
                    comment={comment}
                    createdAt={createdAt}
                    response={response?.comment}
                    responseCreatedAt={response?.createdAt}
                  />
                )
              )}
            </section>
          </>
        )
      )}
    </>
  );
}

export default HotelDetailScreen;
