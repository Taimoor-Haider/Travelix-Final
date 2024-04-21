import React, { useEffect, useState } from "react";
import "./travelPage.css";

import CardComponentTour from "../components/CardComponentTour";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTours,
  tourHomeListSelector,
} from "../features/tour/tourHomeSlice";

import BlueUnderline from "../assets/icons/underlineBlue.svg";

function TravelPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  const { loading, tours, error } = useSelector(tourHomeListSelector);

  const [searchTerm, setSearchTerm] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [ratingSelect, setRatingSelect] = useState("Select Rating");
  const [priceWarning, setPriceWarning] = useState("");

  const [filteredTours, setFilteredTours] = useState(tours);

  // , , price, rating
  //title, city
  useEffect(() => {
    // Filter cars based on selected city, car type, and price range
    const filtered = tours.filter((tour) => {
      const meetsRatingCondition =
        ratingSelect === "Select Rating" || tour.rating >= Number(ratingSelect);
      const meetsPriceRange =
        (minPriceInput === "" || tour.price >= Number(minPriceInput)) &&
        (maxPriceInput === "" || tour.price <= Number(maxPriceInput));

      return (
        (searchTerm === "" ||
          tour.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        tour.place.toLowerCase().includes(cityInput.toLowerCase()) &&
        meetsRatingCondition &&
        meetsPriceRange
      );
    });
    setFilteredTours(filtered);

    // Check if max price is less than min price
    if (
      maxPriceInput !== "" &&
      minPriceInput !== "" &&
      Number(maxPriceInput) < Number(minPriceInput)
    ) {
      setPriceWarning("Max price cannot be less than min price");
    } else {
      setPriceWarning("");
    }
  }, [
    cityInput,
    searchTerm,
    minPriceInput,
    maxPriceInput,
    ratingSelect,
    tours,
  ]); // Update whenever city, carType, priceRange, searchTerm, or cars change

  // Function to handle reset button click
  const handleReset = () => {
    setSearchTerm("");
    setCityInput("");
    setMaxPriceInput(""); // default
    setMinPriceInput(""); // default
    setRatingSelect("Select Rating");
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCityInputChange = (e) => {
    setCityInput(e.target.value);
  };
  const handleMinPriceInputChange = (e) => {
    if (!isNaN(Number(e.target.value))) setMinPriceInput(e.target.value);
  };
  const handleMaxPriceInputChange = (e) => {
    if (!isNaN(Number(e.target.value))) setMaxPriceInput(e.target.value); //if it is a number
  };

  const handlePriceKeyPress = (e) => {
    if (e.key === "-" || e.key === "-" || isNaN(Number(e.target.value))) {
      e.preventDefault();
    }
  };

  return (
    <>
      {console.log(tours)}
      <div className="travel-search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Tour Package Name..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#111"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
            ></path>
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="City Name..."
            onChange={handleCityInputChange}
            value={cityInput}
          />
        </div>
        <div className="filter-price-wrapper">
          <input
            type="text"
            placeholder="Min Price"
            onChange={handleMinPriceInputChange}
            onKeyPress={handlePriceKeyPress} // Prevent entry of minus sign
            value={minPriceInput}
          />
        </div>
        -&nbsp;&nbsp;
        <div className="filter-price-wrapper">
          <input
            type="text"
            placeholder="Max Price"
            onChange={handleMaxPriceInputChange}
            onKeyPress={handlePriceKeyPress} // Prevent entry of minus sign
            value={maxPriceInput}
          />
          {priceWarning && <div className="price-warning">{priceWarning}</div>}
        </div>
        <select
          value={ratingSelect}
          onChange={(e) => setRatingSelect(e.target.value)}
          className="car-search-select"
        >
          <option value="Select Rating">Select Rating</option>
          <option value="1">&gt;=1</option>
          <option value="2">&gt;=2</option>
          <option value="3">&gt;=3</option>
          <option value="4">&gt;=4</option>
          <option value="5">5</option>
        </select>
        <button className="car-reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <section>
        <div className="heading-Ucontainer" id="trending-travel-heading">
          <h1 className="section-heading">Tours</h1>
          <img src={BlueUnderline} />
        </div>

        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : tours.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-[2rem] mb-[20rem]">
              {filteredTours.map((tour) => (
                <CardComponentTour tour={tour} key={tour._id} />
              ))}
            </div>
          ) : (
            <>{!loading && <Message color="info">No Package Found!</Message>}</>
          )}
        </div>
      </section>
    </>
  );
}

export default TravelPage;
