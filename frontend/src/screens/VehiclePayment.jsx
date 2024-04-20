import React, { useState } from "react";
import { Checkbox, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { addPaymentTypes } from "../features/vehicle/checkAvailibitySlice";
import { useDispatch, useSelector } from "react-redux";
import VehicleCheckoutSteps from "../components/VehicleCheckoutSteps";
function VehiclePayment() {
  const [paymentType, setPaymentType] = useState("Stripe");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPaymentType(name);
    }
  };
  const handlePayment = () => {
    navigate("/vehicle/checkout");
    dispatch(addPaymentTypes(paymentType));
  };

  return (
    <>
      <VehicleCheckoutSteps step1 step2 />
      <form className="w-[40%] mx-auto payment-form" onSubmit={handlePayment}>
        <h1 className="primary-heading ">Payment Type</h1>
        <div className="flex flex-col gap-1 mb-6">
          <div>
            <Checkbox
              checked={paymentType === "Stripe"}
              onChange={handleCheckboxChange}
            />

            <label htmlFor="stripe">Stripe</label>
          </div>
          <div>
            <Checkbox
              checked={paymentType === "PayPal"}
              onChange={handleCheckboxChange}
              disabled
            />

            <label htmlFor="paypal" className="text-gray-400">
              PayPal
            </label>
          </div>
        </div>
        <Button className="w-[20%] ml-auto" type="submit">
          <span className="mr-1"> Continue</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </form>
    </>
  );
}

export default VehiclePayment;
