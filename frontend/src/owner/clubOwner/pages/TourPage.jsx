import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import axios from "axios";
import Features from "../components/Features";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  deleteTourById,
  fetchTourList,
  fetchTour,
} from "../../../features/tourOwner/tourListSlice";
import { tourListSelector } from "../../../features/tourOwner/tourListSlice";
import DateSelector from "../components/DateSelector";
function TourPage() {
  const { action } = useParams();
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, tours, error } = useSelector(tourListSelector);
  console.log("The Tours array is:-" + tours);
  console.log(tours);
  const [place, setPlace] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [duration, setDuration] = useState("");
  const [personsAllowed, setPersonsAllowed] = useState(1);
  const [amenities, setAmenities] = useState([""]);
  const [availableDates, setAvailableDates] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleEmenitiesChange = (emenities) => {
    setAmenities(emenities);
  };

  const handleAvailibleDates = (dates) => {
    setAvailableDates(dates);
  };
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFiles.length === 0) {
        alert("Please select at least one image!");
      } else {
        const uploadedFileNames = await uploadPhoto(selectedFiles);
        const requestData = {
          place: place,
          title: title,
          tourOwner: userInfo?._id,
          description: description,
          images: uploadedFileNames,
          duration: duration,
          personsAllowed: personsAllowed,
          amenities: amenities.filter((amenity) => amenity !== ""),
          availableDates: availableDates,
          price: price,
        };
        const response = await axios.post(
          "http://localhost:3000/api/tours",
          requestData
        );
        console.log("Response:", response.data);
        setPlace("");
        setTitle("");
        setDescription("");
        setAddedPhotos([]);
        setDuration("");
        setPersonsAllowed(1);
        setAmenities([""]);
        setAvailableDates([]);
        setPrice(0);
        setSelectedFiles([]);
        navigate("/product/tours");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhoto = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const { data: fileNames } = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return fileNames;
  };
  const handleTourDetail = (id) => {
    navigate(`/tourDetail/${id}`);
  };

  const handleDeleteTour = (id) => {
    dispatch(deleteTourById(id));
  };
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input value is not empty and is not a negative number
    if (inputValue === "" || parseFloat(inputValue) >= 0) {
      // Update the price state only if it's either empty or a non-negative number
      setPrice(inputValue);
    }
  };
  const handlePersonsAllowedChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input value is not empty and is not a negative number
    if (inputValue === "" || parseInt(inputValue) >= 0) {
      // Update the personsAllowed state only if it's either empty or a non-negative number
      setPersonsAllowed(inputValue);
    }
  };
  useEffect(() => {
    dispatch(fetchTourList(userInfo?._id));
  }, [dispatch, userInfo]);

  const handleDetails = () => {};
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/product/tours/new"}
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Tours{" "}
            <div className="badge">
              {tours && tours.length && tours.length > 0 ? tours.length : 0}
            </div>
          </Link>

          <div>
            <div>
              <h1 className="font-bold text-xl my-5">{userInfo?.name} Tours</h1>
            </div>
            {/* Conditional Rendering based on loading, error, and vehicles array */}
            {loading && <Loader />}{" "}
            {/* Show Loader component if loading is true */}
            {error && <Message variant="danger">{error}</Message>}{" "}
            {/* Show Message component if error is true */}
            {tours.length > 0 ? ( // Show vehicles if vehicles array has items
              tours.map((tour) => (
                <div
                  className="listing-card"
                  key={tour._id}
                  onClick={handleDetails}
                >
                  <div className="listing-img">
                    <img
                      src={`http://localhost:3000/${tour.images[0]}`}
                      alt="hotel"
                    />
                  </div>
                  <div className="listing-details">
                    <h2 className="font-bold capitalize text-2xl mb-[4rem]">
                      {tour.title}
                    </h2>
                    <p className="text-start">
                      <strong>Tour Place:</strong> {tour.place}
                    </p>
                    <p className="text-start">
                      <strong>Duration:</strong> {tour.duration}
                    </p>
                    <p className="text-start  mb-[1rem]">
                      <strong>Price:</strong>
                      {tour.price} Rs/-
                    </p>

                    <div className="listing-buttons">
                      <button
                        id="details-button"
                        className="listing-button"
                        onClick={() => handleTourDetail(tour._id)}
                      >
                        Details
                      </button>
                      <button
                        id="edit-button"
                        className="listing-button"
                        onClick={() => {
                          navigate(`/tour/edit/${tour._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        id="delete-button"
                        className="listing-button"
                        onClick={() => {
                          handleDeleteTour(tour._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600 text-lg font-semibold">
                No Tours found.
              </div> // Show a beautiful text if no vehicles exist
            )}
          </div>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="place" value="Place" />
              </div>
              <TextInput
                id="place"
                type="text"
                placeholder="Place (e.g., Paris)"
                required
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                placeholder="Title (e.g., Eiffel Tower Tour)"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="Description..."
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-1 block">
                <Label htmlFor="duration" value="Duration" />
              </div>
              <TextInput
                id="duration"
                type="text"
                placeholder="Type (e.g., 3 Days 4 nights)"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={`http://localhost:3000/${link}`}
                      alt="link"
                      key={link}
                    />
                  </div>
                ))}
              <label className="border-2 cursor-pointer bg-gray-200 rounded-2xl p-8 text-2xl text-gray-600 hover:bg-gray-300 flex justify-center items-center">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>

            <div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="Amenities" value="Emenities" />
                </div>
                <p className="text-gray-500 text-sm">
                  Amenities of the Tour [Mountain view 🏔️, Guided hiking tours
                  🥾, Local cuisine tasting 🍲,Cultural workshops and classes
                  🎨]
                </p>
                <Features
                  selected={amenities}
                  onChange={handleEmenitiesChange}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="TourDates" value="Tour Dates" />
                </div>
                <p className="text-gray-500 text-sm">
                  Select the Start and End Dates for the Tour
                </p>
                <DateSelector
                  selected={availableDates}
                  onChange={handleAvailibleDates}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="price" value="Price" />
                  </div>

                  <TextInput
                    id="price"
                    type="number"
                    placeholder="PKR"
                    required
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="maxGuestsAllowed" value="Persons Allowed" />
                  </div>

                  <TextInput
                    id="maxGuestsAllowed"
                    type="number"
                    placeholder="1"
                    required
                    value={personsAllowed}
                    onChange={handlePersonsAllowedChange}
                  />
                </div>
              </div>

              <Button type="submit" className="mt-5">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TourPage;
