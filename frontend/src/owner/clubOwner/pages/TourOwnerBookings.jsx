import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  tourListSelector,
  fetchBookingsOfOwner,
} from "../../../features/tourOwner/tourListSlice";
import { loginSelector } from "../../../features/auth/loginSlice";
function TourOwnerBookings() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(loginSelector);
  const { loading, ownerBookings, error } = useSelector(tourListSelector);

  useEffect(() => {
    dispatch(fetchBookingsOfOwner(userInfo?._id));
  }, []);

  console.log(ownerBookings);

  return (
    <div className="py-8">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : ownerBookings.length > 0 ? (
        ownerBookings.map((booking) => (
          <div className="booking-card">
            <div className="booking-img">
              <img
                src={`${booking.bookedItem.item.images[0]}`}
                alt="Booking Package"
              />
            </div>
            <div className="booking-details">
              <h2 className="font-normal capitalize">
                {booking.bookedItem.item.title}
              </h2>
              <p>
                <strong>Duration:</strong> {booking.bookedItem.item.duration}
              </p>
              <p>
                <strong>City:</strong> {booking.bookedItem.item.city}
              </p>
              <p>
                <strong>No. of Travelers</strong>
                {booking.travellersInfo?.length + 1}
              </p>
              <p>
                <strong>Price:</strong> {booking.bookedItem.price} Rs/-
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {booking.bookedItem.tourDate.startDate &&
                booking.bookedItem.tourDate.finishDate
                  ? new Date(
                      booking.bookedItem.tourDate.startDate
                    ).toLocaleDateString() +
                    " - " +
                    new Date(
                      booking.bookedItem.tourDate.finishDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <div className="user-info">
                <p>
                  <strong>User:</strong> {booking.bookedUserInfo.fullName}
                </p>
                <div className="user-details">
                  <p>
                    <strong>CNIC:</strong> {booking.bookedUserInfo.cnic}
                  </p>
                  <p>
                    <strong>Gender:</strong> {booking.bookedUserInfo.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Message variant="info">No bookings found.</Message>
      )}
    </div>
  );
}

export default TourOwnerBookings;
