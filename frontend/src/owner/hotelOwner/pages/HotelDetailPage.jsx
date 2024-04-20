import React, { useEffect } from "react";
import CardCarousel from "../../../components/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../../components/Rating";
import EmenitiesModal from "../../../components/EmenitiesModal";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { fetchHotel } from "../../../features/hotelOwner/hotelListSlice";
import { hotelListSelector } from "../../../features/hotelOwner/hotelListSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedBackSection from "../../../ui/FeedBackSection";

function HotelDetailPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, hotel, error } = useSelector(hotelListSelector);

  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [id]);

  const handleResponse = (feedbackId) => {
    navigate(`/feedback/response/${feedbackId}`);
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
            <Button className="w-32 mb-4" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp;&nbsp; Back
            </Button>
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
                    <p className="text-xl font-medium">{hotel.hotelChain}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <Rating
                      value={hotel.rating}
                      text={`by ${hotel.noOfReviews} users.`}
                    />
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-xl font-medium">{hotel.roomType}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    <p className="text-md font-medium">{hotel.description}</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    {hotel.amenities.map(
                      (amenity, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {amenity}
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
                    <p className="text-2xl font-medium">{hotel.price} Rs/-</p>
                  </li>
                  <li class="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
                    {hotel.additionalServices.map(
                      (service, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {service}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {hotel.additionalServices.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={hotel.additionalServices}
                      />
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <section className="section-feedback">
              {hotel.feedbacks?.map(
                (
                  { _id, user, rating, comment, createdAt, response },
                  index
                ) => (
                  <FeedBackSection
                    key={index}
                    user={user}
                    rating={rating}
                    comment={comment}
                    createdAt={createdAt}
                    response={response?.comment}
                    responseCreatedAt={response?.createdAt}
                    isAdmin={true}
                    handleResponse={handleResponse}
                    feedbackId={_id}
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

export default HotelDetailPage;
