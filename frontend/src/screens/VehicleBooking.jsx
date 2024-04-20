import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import CardCarousel from "../components/CardCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchVehicle,
  vehicleDetailSlector,
} from "../features/vehicle/vehicleDetailSlice";
import { Button } from "flowbite-react";
import { checkAvailibilitySlector } from "../features/vehicle/checkAvailibitySlice";
import calculateNumberOfDays from "../utils/numberOfDaysCalculator";

function VehicleBooking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchVehicle(id));
  }, [dispatch, id]);

  const { loading, vehicle, error } = useSelector(vehicleDetailSlector);
  const { selectedDates } = useSelector(checkAvailibilitySlector);
  const handleCheckout = () => {
    navigate("/login?redirect=/vehicle/BookingInfo");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        vehicle && (
          <>
            <div className="flex justify-start items-center gap-5">
              <button
                className="btn btn-square cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <h1 className="text-3xl font-bold text-[#495057]">
                Booking Details
              </h1>
            </div>
            <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] my-[3rem] grid-rows-[20rem]">
              <div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <CardCarousel images={vehicle.images} flag={true} />
                  </div>
                  <div className="flex-initial justify-center items-center md:items-start md:justify-start md:w-[50%] flex flex-col gap-1">
                    <Link to={`/vehicle/${vehicle._id}`}>
                      <p className="text-[#343a40] text-2xl font-semibold">
                        {vehicle.vehicleModel}
                      </p>
                    </Link>
                    <p className="text-[#343a40] text-[sm] font-normal">
                      {vehicle.vehicleType}
                    </p>
                    <p className="text-[#343a40] text-[xs] font-normal">
                      <FontAwesomeIcon icon={faStar} />
                      <strong>{`${vehicle.rating?.toFixed(2)}`}</strong> (
                      {vehicle.noOfReviews} reviews)
                    </p>
                    <p>{`${vehicle.price} Rs/-`}</p>
                  </div>
                </div>
              </div>
              <div className="box-shadow-1 p-6 mt-[1rem] md:mt-0  md:w-[60%] md:mx-auto">
                <h1
                  className="text-3xl underline
                 font-normal text-[#343a40] mb-7"
                >
                  Price details
                </h1>
                <ul className="flex flex-col gap-5">
                  <li className="flex justify-between items-center">
                    <p className="text-lg font-bold">No. of Days</p>
                    <p className="text-lg font-semibold">
                      {`${calculateNumberOfDays(
                        selectedDates.startDate,
                        selectedDates.finishDate
                      )} Days`}
                    </p>
                  </li>
                  <div className="divider divider-start"></div>
                  <li className="mt-auto flex justify-between items-center">
                    <p className="text-lg font-bold">Total Bill</p>
                    <p className="text-lg font-semibold">
                      {`Rs ${vehicle.price}/-`}
                    </p>
                  </li>
                  <li className="mt-auto flex justify-between items-center">
                    <Button onClick={handleCheckout} className="w-full">
                      Proceed to checkout
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default VehicleBooking;
