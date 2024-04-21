import React from "react";
import { getImageURL } from "../utils/image-utils";
import "./CardCrousel.css"

function CardCarousel({ images, flag }) {
  return (
    <div className="carousel rounded-box jc-carousel-container">
      {images.map((image, index) => (
        <div key={index} className="carousel-item w-full jc-carousel-container">
          <img
            src={image}
            className="w-full"
            alt={index}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default CardCarousel;
