import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
const stripePromise = loadStripe(
  "pk_test_51P6FSHJ8YlrI7gTXHjCMmEPGbCtQlg4OlFcDPZxEWDYVGwnzGWnwMIisW5Hkpp54EQeSjDGFwFBUvH04VKqFVGBx00rbxTja8Z"
);
function StripeContainer({ handleBooking }) {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm handleBooking={handleBooking} />
    </Elements>
  );
}

export default StripeContainer;
