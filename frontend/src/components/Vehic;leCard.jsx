import React, { useState } from "react";
import "./CardComponent.css";
import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const { images, vehicleModel, rating, price, location } = vehicle;
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const starSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
      />
    </svg>
  );

  const handlePackageDetails = (vehicle) => {
    navigate(`/vehicle/${vehicle._id}`);
  };

  return (
    <div className="card-container">
      <div className="img-btns-container">
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
          />
        </div>
        <div className="arrow left" onClick={handlePrevClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="#555"
              d="m11.29 12l3.54-3.54a1 1 0 0 0 0-1.41a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42L13.41 17a1 1 0 0 0 .71.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41Z"
            />
          </svg>
        </div>
        <div className="arrow right" onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#555"
              d="m11.29 12l3.54-3.54a1 1 0 0 0 0-1.41a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42L13.41 17a1 1 0 0 0 .71.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41Z"
            />
          </svg>
        </div>
      </div>

      <div className="details-container">
        <div className="title">
          {vehicleModel}
          <span className="reviews">
            {rating}
            {starSvg}
          </span>
        </div>
        <div> {location}</div>
        <h4 className="price"> {price} PKR </h4>
        <div>
          <button
            className="btn bg-[#008395] w-[100%]"
            onClick={() => handlePackageDetails(vehicle)}
          >
            View Details
          </button>
        </div>
      </div>

      <div className="dot-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentImageIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default VehicleCard;
