import React, { useState } from "react";
import { Button, Label } from "flowbite-react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { bookingPaySelector } from "../features/booking/tourBookSlice";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
function StripeForm({ handleBooking }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(loginSelector);
  const {
    loading: payLoading,
    error: payError,
    success,
  } = useSelector(bookingPaySelector);
  const handlePayment = async (event) => {
    event.preventDefault();
    if (elements === null) {
      return;
    }
    try {
      setLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

      console.log("Success!!");
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }

      console.log("Booking is Done!");
      const {
        id,
        card: { last4, brand },
      } = paymentMethod;
      handleBooking({
        id,
        last4,
        brand,
      });

      // dispatch(
      //   payBooking(booking._id, {
      //     id,
      //     last4,
      //     brand,
      //   })
      // );

      navigate("/paymentSuceess");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form className="flex max-full flex-col gap-4" onSubmit={handlePayment}>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {payError && <Message>{payError}</Message>}
      <div>
        <div className="mb-2 block">
          <Label value="Card Number" />
        </div>
        <CardNumberElement className="form-control border p-2 rounded-[0.2rem]" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Card Cvc" />
        </div>
        <CardCvcElement className="form-control border p-2 rounded-[0.2rem]" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Card Expiry" />
        </div>
        <CardExpiryElement className="form-control border p-2 rounded-[0.2rem]" />
      </div>
      <Button type="submit" disabled={loading}>
        Pay
      </Button>
    </form>
  );
}

export default StripeForm;
