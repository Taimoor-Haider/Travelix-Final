import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { getImageURL } from "../utils/image-utils";

function Gallery({ tourPackage }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Show All</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{tourPackage.title}</Modal.Header>
        <Modal.Body>
          <div>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1rem">
                {tourPackage.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    style={{
                      width: "100%",
                      display: "block",
                      cursor: "pointer",
                    }}
                    alt={`image-${i}`}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Gallery;
