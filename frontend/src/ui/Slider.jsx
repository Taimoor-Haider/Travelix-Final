import React from "react";
import { getImageURL } from "../utils/image-utils";

function Slider({ images }) {
  return (
    <div
      className="carousel rounded-box space-x-4"
      style={{ width: "100%", height: "100%" }}
    >
      {images.map((image, index) => (
        <div className="carousel-item" key={index}>
          <img
            src={image}
            alt={`image-${index}`}
            className="aspect-square object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default Slider;
