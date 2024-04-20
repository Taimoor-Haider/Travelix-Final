import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ selected = [], onChange, duration,edit = false}) {
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);

  useEffect(() => {
    if (startDate && duration) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);
      setFinishDate(endDate);
    }
  }, [startDate, duration]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!finishDate) {
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + duration);
      setFinishDate(endDate);
    }
  };

  const addDates = () => {
    if (startDate && finishDate && startDate < finishDate) {
      const updatedDates = [...selected];
      if (updatedDates.length > 0) {
        // Update the existing date range with the new start and finish dates
        updatedDates[0] = { startDate, finishDate };
      } else {
        // Add a new date range if none exists
        updatedDates.push({ startDate, finishDate });
      }
      onChange(updatedDates);
      setStartDate(null);
      setFinishDate(null);
    } else {
      console.error("Start date must be before end date");
    }
  };
  

  const removeDate = (index) => {
    if(edit) return
    const updatedDates = selected.filter((_, i) => i !== index);
    onChange(updatedDates);
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          disabled = {edit}
          endDate={finishDate} // Set the endDate to finishDate
          minDate={new Date()}
          placeholderText="Start Date"
          className="p-2 border border-gray-300 rounded-md"
        />
        <DatePicker
          selected={finishDate}
          disabled // Disable the end date picker
          selectsEnd
          // disabled = {edit}
          startDate={startDate}
          endDate={finishDate}
          minDate={startDate}
          placeholderText="End Date"
          className="p-2 border border-gray-300 rounded-md "
        />
        <Button onClick={addDates} type="button" className="my-4">
          Add Dates
        </Button>
      </div>
      <div>
        {selected.map((dateRange, index) => (
          <div key={index}>
            <span>
              {new Date(dateRange.startDate).toLocaleDateString()} -{" "}
              {new Date(dateRange.finishDate).toLocaleDateString()}
            </span>
            <Button onClick={() => removeDate(index)} type="button">
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateSelector;
