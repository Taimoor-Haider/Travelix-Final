import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faTruckFast,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const HotelCheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-15xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex justify-between gap-10"
          aria-label="Checkout steps"
        >
          {step1 ? (
            <NavLink
              to="/login"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={faUser} /> Login
            </NavLink>
          ) : (
            <span className="text-gray-500">
              <FontAwesomeIcon icon={faUser} /> Login
            </span>
          )}
          {step2 ? (
            <NavLink
              to="/hotel/BookingInfo"
              className="ml-4 text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={faPerson} /> Customer Info
            </NavLink>
          ) : (
            <span className="ml-4 text-gray-500">
              <FontAwesomeIcon icon={faPerson} /> Customer Info
            </span>
          )}
          {step3 ? (
            <NavLink
              to="/hotel/payment"
              className="ml-4 text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={faCreditCard} /> Payment
            </NavLink>
          ) : (
            <span className="ml-4 text-gray-500">
              <FontAwesomeIcon icon={faCreditCard} /> Payment
            </span>
          )}
          {step4 ? (
            <NavLink
              to="/hotel/checkout"
              className="ml-4 text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={faTruckFast} /> Checkout
            </NavLink>
          ) : (
            <span className="ml-4 text-gray-500">
              <FontAwesomeIcon icon={faTruckFast} /> Checkout
            </span>
          )}
        </nav>
      </div>
    </div>
  );
};

export default HotelCheckoutSteps;
