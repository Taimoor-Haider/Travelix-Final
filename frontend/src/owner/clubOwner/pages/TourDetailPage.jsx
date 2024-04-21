import React, { useEffect, useState } from "react";
import CardCarousel from "../../../components/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../../components/Rating";
import EmenitiesModal from "../../../components/EmenitiesModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTour } from "../../../features/tourOwner/tourListSlice";
import { tourListSelector } from "../../../features/tourOwner/tourListSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedBackSection from "../../../ui/FeedBackSection";
import { Button, Carousel } from "flowbite-react";
// import { Carousel } from "flowbite-react";

import "./Details.css";

function TourDetailPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, tour, error } = useSelector(tourListSelector);

  console.log("Tour Data", tour);

  useEffect(() => {
    dispatch(fetchTour(id));
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
        tour && (
          <>
            <Button className="w-32 mb-4" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp;&nbsp; Back
            </Button>

            <div className="h-70 sm:h-70 xl:h-80 2xl:h-96">
              <Carousel className="j-crousal-img">
                {tour.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </Carousel>
            </div>

            <div>
              <div>
                {/*  */}
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Tour Title</h1>
                  <p className="j-detail-p">{tour.title}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Location</h1>
                  <p className="j-detail-p">{tour.place}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Ratings</h1>
                  <div style={{ flex: "1" }}>
                    <Rating value={tour.rating} />
                    {`No of Reviews : ${tour.noOfReviews}`}
                  </div>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Duration</h1>
                  <p className="j-detail-p">{tour.duration} Days</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Description</h1>
                  <p className="j-detail-p">{tour.description}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Amenities</h1>

                  <div style={{ flex: 1 }}>
                    {tour.amenities.map(
                      (amenity, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {amenity}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {tour.amenities.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={tour.amenities}
                      />
                    )}
                  </div>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Price</h1>
                  <p className="j-detail-p">{tour.price} Rs/-s</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Remaining Seats</h1>
                  <p className="j-detail-p">{tour.personsAllowed}</p>
                </div>
              </div>
            </div>
            <section className="section-feedback">
              {tour.feedbacks?.map(
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

export default TourDetailPage;
