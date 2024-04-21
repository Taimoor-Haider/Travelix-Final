import React, { useState } from "react";
import { useEffect } from "react";
import CardCarousel from "../components/CardCarousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchVehicle,
  vehicleDetailSlector,
} from "../features/vehicle/vehicleDetailSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import DatepickerComponent from "../components/DatepickerComponent";
import EmenitiesModal from "../components/EmenitiesModal";
import FeedBackSection from "../ui/FeedBackSection";
import { Button } from "flowbite-react";
import {
  checkAvailability,
  checkAvailibilitySlector,
} from "../features/vehicle/checkAvailibitySlice";
import { addSelectedDates } from "../features/vehicle/checkAvailibitySlice";
function VehicleDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAvailibility, setShowAvailibility] = useState(false);
  // const [isAvailibility, setIsAvailibility] = useState(null);
  const { loading, vehicle, error } = useSelector(vehicleDetailSlector);
  const { availibleLoading, isAvailible, availibilityError } = useSelector(
    checkAvailibilitySlector
  );

  useEffect(() => {
    if (isAvailible) {
      setShowAvailibility(true);
    }
  }, [isAvailible]);
  useEffect(() => {
    dispatch(fetchVehicle(id));
  }, [id]);

  const handleBooking = () => {
    if (isAvailible) {
      navigate(`/vehicle/booking/${vehicle._id}`);
    }
  };

  const handleCheckAvailibility = (startDate, finishDate) => {
    if (vehicle) {
      dispatch(addSelectedDates({ startDate, finishDate }));
      dispatch(checkAvailability(startDate, finishDate, vehicle._id));
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        vehicle && (
          <>
            <div className="grid-3">
              <div className="grid-of-images">
                <div s style={{ width: "100%", height: "100%" }}>
                  <CardCarousel images={vehicle.images} flag={true} />
                </div>
              </div>
              <div>
                <ul class="w-96 text-surface dark:text-white">
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-2xl font-medium">
                      {vehicle.vehicleModel}
                    </p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{vehicle.vehicleType}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <Rating
                      value={vehicle.rating}
                      text={`by ${vehicle.noOfReviews} users.`}
                    />
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">
                      {vehicle.rentalCompanyName}
                    </p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-md font-medium">{vehicle.description}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    {vehicle.features.map(
                      (feature, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {feature}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {vehicle.features.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={vehicle.features}
                      />
                    )}
                  </li>
                </ul>
              </div>
              <div>
                <ul class="w-96 text-surface dark:text-white">
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10 flex justify-between items-center">
                    <span className="text-2xl font-semibold">Price</span>
                    <p className="text-2xl font-medium">{vehicle.price} Rs/-</p>
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
              {vehicle.feedbacks.map(
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

export default VehicleDetailScreen;
