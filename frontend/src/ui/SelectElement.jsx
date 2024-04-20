import React from "react";

function SelectElement({ labelText, items, selectedDate, onSelect }) {
  const handleChange = (e) => {
    const selectedIndex = e.target.value;
    // onSelect(items[selectedIndex]);
    onSelect(selectedIndex);
    console.log(selectedIndex);
  };

  return (
    <select
      className="select select-bordered w-full"
      value={selectedDate}
      onChange={handleChange}
    >
      <option value={-1} defaultValue>
        {labelText}
      </option>
      {items.map(({ startDate, finishDate }, index) => (
        <option key={index} value={index}>
          {`${new Date(startDate).toLocaleDateString()} - ${new Date(
            finishDate
          ).toLocaleDateString()}`}
        </option>
      ))}
    </select>
  );
}

export default SelectElement;
