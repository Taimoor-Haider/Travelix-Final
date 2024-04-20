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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBookings ? (
            userBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4">Booked Item</h2>
                <div>
                  {booking.bookedItem.tourDate?.startDate && (
                    <p className="text-gray-600 mb-2">
                      Tour Start Date:{" "}
                      {new Date(
                        booking.bookedItem.tourDate?.startDate
                      ).toLocaleDateString()}
                    </p>
                  )}
                  {booking.bookedItem.tourDate?.finishDate && (
                    <p className="text-gray-600 mb-2">
                      Tour End Date:{" "}
                      {new Date(
                        booking.bookedItem.tourDate?.finishDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {booking.bookedItem.bookingDate?.startDate && (
                    <p className="text-gray-600 mb-2">
                      Booking Start Date:{" "}
                      {new Date(
                        booking.bookedItem.bookingDate?.startDate
                      ).toLocaleDateString()}
                    </p>
                  )}
                  {booking.bookedItem.bookingDate?.finishDate && (
                    <p className="text-gray-600 mb-2">
                      Booking End Date:{" "}
                      {new Date(
                        booking.bookedItem.bookingDate?.finishDate
                      ).toLocaleDateString()}
                    </p>
                  )}
                  {booking.bookedItem?.numberOfPersons && (
                    <p className="text-gray-600 mb-2">
                      Number of Persons: {booking.bookedItem?.numberOfPersons}
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">
                    Price: {booking.bookedItem.price} PKR
                  </p>
                </div>
                <hr className="my-4" />
                <h2 className="text-xl font-bold mb-4">Booked User Info</h2>
                <div>
                  <p className="text-gray-600 mb-2">
                    Full Name: {booking.bookedUserInfo.fullName}
                  </p>
                  <p className="text-gray-600 mb-2">
                    CNIC: {booking.bookedUserInfo.cnic}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Gender: {booking.bookedUserInfo.gender}
                  </p>
                </div>
                <hr className="my-4" />
                <h2 className="text-xl font-bold mb-4">User Info</h2>
                <div>
                  <p className="text-gray-600 mb-2">
                    Name: {booking.user.name}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Email: {booking.user.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Phone: {booking.user.phone}
                  </p>
                </div>
                {console.log(
                  "Tour Date" + booking.bookedItem.tourDate?.finishDate
                )}
                {console.log(
                  "Booking Date" + booking.bookedItem.bookingDate?.finishDate
                )}
                {(currentDate >
                  new Date(booking.bookedItem.tourDate?.finishDate) ||
                  currentDate >
                    new Date(booking.bookedItem.bookingDate?.finishDate)) && (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() =>
                      handleEndDateButtonClick(booking.bookedItem.item)
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
