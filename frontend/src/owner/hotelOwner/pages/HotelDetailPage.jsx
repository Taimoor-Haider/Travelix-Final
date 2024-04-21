import React, { useEffect } from "react";
import CardCarousel from "../../../components/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../../components/Rating";
import EmenitiesModal from "../../../components/EmenitiesModal";
import { useSelector, useDispatch } from "react-redux";
import { Button, Carousel } from "flowbite-react";
import { fetchHotel } from "../../../features/hotelOwner/hotelListSlice";
import { hotelListSelector } from "../../../features/hotelOwner/hotelListSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedBackSection from "../../../ui/FeedBackSection";
import "../../clubOwner/pages/Details.css";

function HotelDetailPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, hotel, error } = useSelector(hotelListSelector);

  useEffect(() => {
    dispatch(fetchHotel(id));
  }, [id]);
  console.log("Hotel Data", hotel);

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

            <div className="h-70 sm:h-70 xl:h-80 2xl:h-96">
              <Carousel className="j-crousal-img">
                {hotel.images.map((image, index) => (
                  <img key={hotel._id} src={image} alt={`Image ${index}`} />
                ))}
              </Carousel>
            </div>

            <div>
              <div>
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Hotel Name</h1>
                  <p className="j-detail-p">{hotel.hotelName}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Hotel Chain</h1>
                  <p className="j-detail-p">{hotel.hotelChain}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Ratings</h1>
                  <div style={{ flex: "1" }}>
                    <Rating value={hotel.rating} />
                    {`No of Reviews : ${hotel.noOfReviews}`}
                  </div>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Description</h1>
                  <p className="j-detail-p">{hotel.description}</p>
                </div>

                {/* Amenities */}
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Amenities</h1>

                  <div style={{ flex: 1 }}>
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
                  </div>
                </div>


                  {/* Policies */}
                  <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Policies</h1>

                  <div style={{ flex: 1 }}>
                    {hotel.policies.map(
                      (amenity, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {amenity}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {hotel.policies.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={hotel.policies}
                      />
                    )}
                  </div>
                </div>

                  {/* Additional Features */}
                  <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Additional Services</h1>

                  <div style={{ flex: 1 }}>
                    {hotel.additionalServices.map(
                      (amenity, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {amenity}
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
                  </div>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Price</h1>
                  <p className="j-detail-p">PKR {hotel.price} - Per Night</p>
                </div>

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
