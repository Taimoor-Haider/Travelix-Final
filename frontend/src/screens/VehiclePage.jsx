import React, { useEffect, useState } from "react";
import "./VehiclePage.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import VehicleCard from "../components/Vehic;leCard";
import BlueUnderline from "../assets/icons/underlineBlue.svg";

function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [carType, setCarType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [ratingSelect, setRatingSelect] = useState("Select Rating");

  const [filteredCars, setFilteredCars] = useState([]);
  const [priceWarning, setPriceWarning] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://travelix-backend-v2.vercel.app/api/vehicle");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
        setFilteredCars(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const filtered = vehicles.filter((vehicle) => {
      const meetsRatingCondition =
        ratingSelect === "Select Rating" ||
        vehicle.rating >= Number(ratingSelect);

      const meetsPriceRange =
        (minPriceInput === "" || vehicle.price >= Number(minPriceInput)) &&
        (maxPriceInput === "" || vehicle.price <= Number(maxPriceInput));

      return (
        (carType === "" || vehicle.vehicleType === carType) &&
        (searchTerm === "" ||
          vehicle.vehicleModel
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        vehicle.location.toLowerCase().includes(cityInput.toLowerCase()) &&
        meetsRatingCondition &&
        meetsPriceRange
      );
    });
    setFilteredCars(filtered);

    // Check if max price is less than min price
    if (maxPriceInput !== "" && minPriceInput !== "" && Number(maxPriceInput) < Number(minPriceInput)) {
      setPriceWarning("Max price cannot be less than min price");
    } else {
      setPriceWarning("");
    }
  }, [cityInput, carType, searchTerm, minPriceInput, ratingSelect, maxPriceInput, vehicles]);

  const handleReset = () => {
    setCarType("");
    setSearchTerm("");
    setCityInput("");
    setMaxPriceInput("");
    setMinPriceInput("");
    setRatingSelect("Select Rating");
  };

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
    if (!isNaN(Number(e.target.value))) setMaxPriceInput(e.target.value);
  };

  const handlePriceKeyPress = (e) => {
    if (e.key === "-" || e.key === "-" || isNaN(Number(e.target.value))) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Car Name..."
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
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          className="car-search-select"
        >
          <option value="">Car Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Bus">Bus</option>
        </select>
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
            onKeyPress={handlePriceKeyPress}
            value={minPriceInput}
          />
        </div>
        -&nbsp;&nbsp;
        <div className="filter-price-wrapper" id="max-price-filter-wrapper">
          <input
            type="text"
            placeholder="Max Price"
            onChange={handleMaxPriceInputChange}
            onKeyPress={handlePriceKeyPress}
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
        <div className="heading-Ucontainer" id="trending-car-heading">
          <h1 className="section-heading">Cars</h1>
          <img src={BlueUnderline} alt="underline" />
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : vehicles.length > 0 ? (
            <div className="flex flex-wrap justify-start items-center gap-[2rem] mb-[20rem]">
              {filteredCars.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <>
              {!loading && <Message color="info">No vehicles found!</Message>}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default VehiclePage;
