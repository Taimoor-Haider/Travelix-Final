import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  fetchBookingsOfOwner,
  vehcileListSelector,
} from "../../features/vehicleOwner/vehicleListSlice";
import { loginSelector } from "../../features/auth/loginSlice";

function OwnerBookings() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(loginSelector);
  const { loading, ownerBookings, error } = useSelector(vehcileListSelector);

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
                {booking.bookedItem.item.vehicleModel}
              </h2>
              <p>
                <strong>Car Type:</strong> {booking.bookedItem.item.vehicleType}
              </p>
              <p>
                <strong>Location:</strong> {booking.bookedItem.item.location}
              </p>
              <p>
                <strong>Rental Company:</strong>{" "}
                {booking.bookedItem.item.rentalCompanyName}
              </p>
              <p>
                <strong>Price:</strong> {booking.bookedItem.price} Rs/-
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {booking.bookedItem.bookingDate.startDate &&
                booking.bookedItem.bookingDate.finishDate
                  ? new Date(
                      booking.bookedItem.bookingDate.startDate
                    ).toLocaleDateString() +
                    " - " +
                    new Date(
                      booking.bookedItem.bookingDate.finishDate
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

export default OwnerBookings;
