import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function Rating({ value, text }) {
  let rating = [1, 2, 3, 4, 5];

  return (
    <div>
      {rating.map((rate, index) =>
        value >= rate ? (
          <FontAwesomeIcon key={index} icon={faStar} />
        ) : rate - 0.5 === value ? (
          <FontAwesomeIcon key={index} icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon key={index} icon={farStar} />
        )
      )}
      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
