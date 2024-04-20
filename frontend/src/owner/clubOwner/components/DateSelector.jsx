import React, { useState } from "react";
import { Button } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ selected = [], onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);

  const handleStartDateChange = (date) => setStartDate(date);
  const handleFinsihDateChange = (date) => setFinishDate(date);

  const addDates = () => {
    if (startDate && finishDate && startDate < finishDate) {
      onChange([...selected, { startDate, finishDate }]);
      setStartDate(null);
      setFinishDate(null);
    } else {
      console.error("Start date must be before end date");
    }
  };

  const removeDate = (index) => {
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
          finishDate={finishDate}
          minDate={new Date()}
          placeholderText="Start Date"
          className="p-2 border border-gray-300 rounded-md"
        />
        <DatePicker
          selected={finishDate}
          onChange={handleFinsihDateChange}
          selectsEnd
          startDate={startDate}
          finishDate={finishDate}
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
