import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import HotelCard from "../components/HotelCard";
import "./HotelPage.css";
import BlueUnderline from "../assets/icons/underlineBlue.svg";

function HotelPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [ratingSelect, setRatingSelect] = useState("Select Rating");
  const [priceWarning, setPriceWarning] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        // Fetch hotels from the API
        const response = await fetch("https://travelix-backend-v2.vercel.app/api/hotels");
        if (!response.ok) {
          throw new Error("Failed to fetch Hotels");
        }
        const data = await response.json();
        setHotels(data); // Set the fetched hotels in the state
        setFilteredHotels(data); // Set the fetched hotels in the state
        console.log("Hotel:", data);
      } catch (error) {
        setError(error); // Set error if there's any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchHotels(); // Call the fetchVehicles function when the component mounts
  }, []);

  // dsadas

  useEffect(() => {
    const filtered = hotels.filter((hotel) => {
      const meetsRatingCondition =
        ratingSelect === "Select Rating" ||
        hotel.rating >= Number(ratingSelect);
      const meetsPriceRange =
        (minPriceInput === "" || hotel.price >= Number(minPriceInput)) &&
        (maxPriceInput === "" || hotel.price <= Number(maxPriceInput));

      return (
        hotel.hotelName.toLowerCase().includes(searchInput.toLowerCase()) &&
        hotel.location.toLowerCase().includes(cityInput.toLowerCase()) &&
        meetsRatingCondition &&
        meetsPriceRange
      );
    });
    setFilteredHotels(filtered);

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
    hotels,
    searchInput,
    maxPriceInput,
    minPriceInput,
    ratingSelect,
  ]);

  const handleReset = () => {
    setCityInput("");
    setSearchInput("");
    setMaxPriceInput(""); // default
    setMinPriceInput(""); // default
    setRatingSelect("Select Rating");
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
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
      <div className="hotel-search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Hotel Name..."
            onChange={handleSearchInputChange}
            value={searchInput}
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
        <button className="hotel-reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <section>
        <div className="heading-Ucontainer" id="trending-hotel-heading">
          <h1 className="section-heading">Hotel </h1>
          <img src={BlueUnderline} />
        </div>

        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : hotels.length > 0 ? (
            <div className="flex flex-wrap justify-start items-center gap-[2rem] mb-[20rem]">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <>{!loading && <Message color="info">No Hotels found!</Message>}</>
          )}
        </div>
      </section>
    </>
  );
}

export default HotelPage;
