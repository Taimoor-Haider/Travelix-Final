import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import BadgeList from "../ui/BadgeList";

function EmenitiesModal({ BtnText, items, bgColor }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>{BtnText}</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Emenities</Modal.Header>
        <Modal.Body>
          <BadgeList list={items} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmenitiesModal;
