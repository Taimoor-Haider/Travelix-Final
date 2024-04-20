import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import formateDateStr from "../utils/dateStrFromate";
import moment from "moment";
function DatepickerComponent({ handleCheckAvailibility }) {
  const [dates, setDates] = useState([]);

  const handleAvailabilityCheck = () => {
    const startDate = formateDateStr(dates[0].$d);
    const finishDate = formateDateStr(dates[1].$d);
    handleCheckAvailibility(startDate, finishDate);
    setDates([]);
  };

  useEffect(() => {}, [dates]); // Run the effec

  return (
    <>
      <RangePicker
        onChange={(selectedDates) => {
          setDates(selectedDates);
        }}
        minDate={dayjs()}
        className="w-full"
      />
      <button
        className="btn btn-sm bg-[#008395] text-[#fff]"
        onClick={handleAvailabilityCheck}
      >
        Check Availability
      </button>
    </>
  );
}

export default DatepickerComponent;
