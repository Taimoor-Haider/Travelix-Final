import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  fetchUserBookings,
  userBookingsSelector,
} from "../features/tour/userBookingsSlice";
import "./BookingsScreen.css";

function BookingsScreen() {
  const { userInfo } = useSelector(loginSelector);
  const { userBookings, loading, error } = useSelector(userBookingsSelector);

  console.log(userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      console.log("Fetching user bookings...");
      console.log(userInfo._id);
      dispatch(fetchUserBookings(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const currentDate = new Date();

  console.log(currentDate);

  const handleEndDateButtonClick = (targetId) => {
    navigate(`/feedback/${targetId}`);
  };
  if (userBookings) {
    console.log(userBookings);
  }
  return (
    <div className="container mx-auto mt-10">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="jb-bookings-main-container">
          {userBookings ? (
            userBookings.map((booking) => (
              <div key={booking._id} className="jb-booking-card">
                <h2 className="text-xl font-bold mb-4">
                  Booked a
                  {booking?.bookedItem?.item?.hotelOwner
                    ? " Hotel"
                    : booking?.bookedItem?.item?.vehicleOwner
                    ? " Vehicle"
                    : " Tour"}
                </h2>

                <div className="jb-booking-card-main">
                  <div className="jb-image-container">
                    {booking?.bookedItem?.item?.images &&
                      booking?.bookedItem?.item?.images[0] && (
                        <img
                          src={booking.bookedItem.item.images[0]}
                          className="image"
                        />
                      )}
                  </div>
                  <div className="jb-booking-details">
                    <p>
                      <strong className="jb-strong"> Title : </strong>
                      {booking?.bookedItem?.item?.title ||
                        booking?.bookedItem?.item?.hotelName ||
                        booking?.bookedItem?.item?.vehicleModel}
                    </p>
                    <p>
                      <strong className="jb-strong">Price: </strong>
                      {booking.bookedItem.price} PKR
                    </p>
         

                    <p>
                      <strong className="jb-strong">Location : </strong>
                      {booking?.bookedItem?.item?.location ||
                        booking?.bookedItem?.item?.place}
                    </p>
                               
                    <strong className="jb-strong">Booked At: </strong>
                    {booking?.bookingAt && (
                      <span style={{ color: "#000" }}>
                        {new Date(booking.bookingAt).toLocaleDateString()}
                      </span>
                    )}
                    <p>
                      <strong className="jb-strong">Description : </strong>{" "}
                      {booking?.bookedItem?.item?.description}
                    </p>

                   
                  </div>
                </div>

                {console.log(
                  "Tour Date" + booking.bookedItem.tourDate?.finishDate
                )}
                {console.log(
                  "Booking Date" + booking.bookedItem.bookingDate?.finishDate
                )}
                {((!booking.feedbackGiven &&
                  currentDate >
                    new Date(booking.bookedItem.tourDate?.finishDate)) ||
                  currentDate >
                    new Date(booking.bookedItem.bookingDate?.finishDate)) && (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() =>
                      handleEndDateButtonClick(booking.bookedItem.item?._id)
                    }
                  >
                    Give Feedback
                  </button>
                )}
              </div>
            ))
          ) : (
            <div>This user have no Bookings right now!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingsScreen;
