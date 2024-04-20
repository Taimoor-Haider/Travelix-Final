import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import StripeContainer from "./StripeContainer";
function PaymentModel({ handleBooking, btnText }) {
  const [openModal, setOpenModal] = useState(false);

  const handleShow = () => {
    setOpenModal(true);
    console.log("Booking is Created");
  };
  return (
    <>
      <Button onClick={handleShow} className="w-[20%]">
        {btnText ? btnText : "Book Tour"}
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Payment</Modal.Header>
        <Modal.Body>
          <StripeContainer handleBooking={handleBooking} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentModel;
