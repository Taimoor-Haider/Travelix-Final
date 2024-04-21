import React, { useState, useEffect } from "react";
import SelectElement from "./SelectElement";
import IncreamentBox from "./IncreamentBox";
import { Badge } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { packageFormSelector } from "../features/PackageFromSlice";
import { setDate, setPersons } from "../features/PackageFromSlice";
function PackageForm({ tourPackage }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [numOfPersons, setNumOfPersons] = useState(0);
  const [adults, setAdults] = useState(0);

  const { date, noOfPersons } = useSelector(packageFormSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("date", selectedDate);
    localStorage.setItem("numOfPersons", numOfPersons);
  }, [selectedDate, numOfPersons]);

  useEffect(() => {
    const handleNumberOfPersons = () => {
      if (adults === 0) {
        return;
      }
      setNumOfPersons(adults);
    };
    handleNumberOfPersons();
  }, [adults]);

  const handleAdultIncreament = () => {
    setAdults((pre) => pre + 1);
  };
  const handleAdultDecreament = () => {
    if (adults == 0) {
      return;
    }
    setAdults((pre) => pre - 1);
  };

  // Handle selection change
  const handleSelectDateIndex = (dateIndex) => {
    setSelectedDate(dateIndex);
    //dispatch(setDate(tourPackage.availableDates[defaultDate]));
  };

  const handleNavigationChange = () => {
    navigate(
      `/tour/booking/${tourPackage._id}?dateIndex=${
        selectedDate ? selectedDate : "0"
      }&persons=${numOfPersons === 0 ? 1 : numOfPersons}`
    );
    dispatch(
      setDate(tourPackage.availableDates[selectedDate ? selectedDate : 0])
    );
    dispatch(setPersons(numOfPersons === 0 ? 1 : numOfPersons));
  };
  return (
    <>
      <SelectElement
        labelText={"Choose the Date!"}
        items={tourPackage.availableDates}
        onSelect={handleSelectDateIndex}
        selectedDate={selectedDate}
      />
      <details className="collapse bg-[#fff]">
        <summary className="collapse-title">
          {`${numOfPersons} persons`}
        </summary>
        <div className="collapse-content flex flex-col gap-5 ">
          <IncreamentBox
            persons={adults}
            totalPersons={numOfPersons}
            inc={handleAdultIncreament}
            dec={handleAdultDecreament}
            tourPackage={tourPackage}
            mainText="Persons"
          />
        </div>
      </details>

      <button
        className="btn bg-[#008395]"
        onClick={handleNavigationChange}
        disabled={tourPackage.personsAllowed === 0}
      >
        Book
      </button>
      <Badge
        color="gray"
        size="sm"
        className="p-5 flex justify-center items-center"
      >
        {tourPackage.price}/-Rs per person
      </Badge>
    </>
  );
}

export default PackageForm;
