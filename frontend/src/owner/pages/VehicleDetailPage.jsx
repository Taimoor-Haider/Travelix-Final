import React, { useEffect } from "react";
import CardCarousel from "../../components/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import EmenitiesModal from "../../components/EmenitiesModal";
import { useSelector, useDispatch } from "react-redux";
import { Button, Carousel } from "flowbite-react";
import { fetchVehicle } from "../../features/vehicleOwner/vehicleListSlice";
import { vehcileListSelector } from "../../features/vehicleOwner/vehicleListSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedBackSection from "../../ui/FeedBackSection";
import "../clubOwner/pages/Details.css";

function VehicleDetailPage() {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, vehicle, error } = useSelector(vehcileListSelector);

  useEffect(() => {
    dispatch(fetchVehicle(id));
  }, [id]);

  const handleResponse = (feedbackId) => {
    navigate(`/feedback/response/${feedbackId}`);
  };

  console.log("Vehicle Data", vehicle);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        vehicle && (
          <>
            <Button className="w-32 mb-4" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp;&nbsp; Back
            </Button>

            <div className="h-70 sm:h-70 xl:h-80 2xl:h-96">
              <Carousel className="j-crousal-img">
                {vehicle.images.map((image, index) => (
                  <img key={vehicle._id} src={image} alt={`Image ${index}`} />
                ))}
              </Carousel>
            </div>

            <div>
              <div>
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Model</h1>
                  <p className="j-detail-p">{vehicle.vehicleModel}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Type</h1>
                  <p className="j-detail-p">{vehicle.vehicleType}</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Ratings</h1>
                  <div style={{ flex: "1" }}>
                    <Rating value={vehicle.rating} />
                    {`No of Reviews : ${vehicle.noOfReviews}`}
                  </div>
                </div>
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Price</h1>
                  <p className="j-detail-p"><strong>Rs {vehicle.price}</strong> / Per Day</p>
                </div>

                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Description</h1>
                  <p className="j-detail-p">{vehicle.description}</p>
                </div>

                {/* Features */}
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Features</h1>

                  <div style={{ flex: 1 }}>
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
                  </div>
                </div>

                {/* Additional Services */}
                <div className="j-key-detail-container">
                  <h1 class="j-h1-detail">Additional Services</h1>

                  <div style={{ flex: 1 }}>
                    {vehicle.additionalServices.map(
                      (feature, index) =>
                        // Display only the first 5 features
                        index < 5 && (
                          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {feature}
                          </span>
                        )
                    )}
                    {/* Show "See More" button if there are more than 5 features */}
                    {vehicle.additionalServices.length > 5 && (
                      <EmenitiesModal
                        BtnText="See More"
                        items={vehicle.additionalServices}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <section className="section-feedback">
              {vehicle.feedbacks.map(
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

export default VehicleDetailPage;
