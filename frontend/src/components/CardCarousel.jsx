import React from "react";
import { getImageURL } from "../utils/image-utils";

function CardCarousel({ images, flag }) {
  return (
    <div className="carousel rounded-box">
      {images.map((image, index) => (
        <div key={index} className="carousel-item w-full">
          <img
            src={
              flag === true
                ? `${image}`
                : getImageURL(image)
            }
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
