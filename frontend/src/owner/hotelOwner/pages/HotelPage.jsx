import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Textarea, Label, TextInput, Select } from "flowbite-react";
import Features from "../components/Features";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  deleteHotelById,
  fetchHotelList,
  hotelListSelector,
} from "../../../features/hotelOwner/hotelListSlice";
import ConfirmationModal from "../../../components/ConfirmationModal";

function HotelPage() {
  const { action } = useParams();
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, hotels, error } = useSelector(hotelListSelector);

  const [hotelName, setHotelName] = useState("");
  const [hotelChain, setHotelChain] = useState("Delux");
  const [location, setLocation] = useState("");
  // const [roomType, setRoomType] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [amenities, setEmenities] = useState([""]);
  const [policies, setPolicies] = useState([""]);
  const [additionalServices, setAdditionalServices] = useState([""]);
  // const [maxGuestsAllowed, setMaxGuestsAllowed] = useState(1);
  const [price, setPrice] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [submitloading, setSubmitloading] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleHotelChainChange = (event) => {
    setHotelChain(event.target.value);
  };

  const handleEmenitiesChange = (emenities) => {
    setEmenities(emenities);
  };
  const handleAditionalServicesChange = (services) => {
    setAdditionalServices(services);
  };

  const handlePoliciesChange = (policies) => {
    setPolicies(policies);
  };
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input value is not empty and is not a negative number
    if (inputValue === "" || parseFloat(inputValue) >= 1) {
      // Update the price state only if it's either empty or a non-negative number
      setPrice(inputValue);
    }
  };

  // const handlePersonsAllowedChange = (e) => {
  //   const inputValue = e.target.value;
  //   // Check if the input value is not empty and is not a negative number
  //   if (inputValue === "" || parseInt(inputValue) >= 1) {
  //     // Update the personsAllowed state only if it's either empty or a non-negative number
  //     setMaxGuestsAllowed(inputValue);
  //   }
  // };

  const handleSubmit = async (e) => {
    console.log("Submitting");

    e.preventDefault();

    // Check if any of the required fields are empty or contain only white spaces
    if (
      !hotelName.trim() ||
      !hotelChain.trim() ||
      !location.trim() ||
      !description.trim() ||
      amenities.some((amenity) => !amenity.trim()) ||
      policies.some((policy) => !policy.trim()) ||
      additionalServices.some((service) => !service.trim())
    ) {
      alert(
        "Please fill out all fields and ensure they are not empty or contain only white spaces."
      );
      return; // Prevent form submission
    }

    // Check if amenities are empty
    if (amenities.length === 0) {
      alert("Amenities cannot be empty. Please select at least one amenity.");
      return; // Prevent form submission
    } else if (policies.length === 0) {
      alert("Policies cannot be empty. Please select at least one Policy.");
      return; // Prevent form submission
    } else if (additionalServices.length === 0) {
      alert("Additional Services must contain at least one.");
      return; // Prevent form submission
    }

    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmation = async (confirm) => {
    if (confirm) {
      try {
        if (selectedFiles.length === 0) {
          alert("Please select atleast one photo");
          setShowModal(false); // Show the confirmation
          return;
        } else {
          setShowModal(false); // Hide the confirmation modal
          setSubmitloading(true);
          const uploadedFileNames = await uploadPhoto(selectedFiles);

          const requestData = {
            hotelName: hotelName,
            location: location,
            hotelChain: hotelChain,
            images: uploadedFileNames,
            price: price,
            // roomType: roomType,
            // maxGuestsAllowed: maxGuestsAllowed,
            amenities: amenities.filter((amenity) => amenity !== ""), // Remove empty features
            description: description,
            hotelOwner: userInfo?._id,
            latitude: latitude,
            longitude: longitude,
            additionalServices: additionalServices.filter(
              (service) => service !== ""
            ),
            policies: policies.filter((policy) => policy !== ""),
          };

          const response = await axios.post(
            "https://travelix-backend-v2.vercel.app/api/hotels",
            requestData
          );
          console.log("Response:", response.data);
          setHotelName("");
          setHotelChain("");
          setLocation("");
          // setRoomType("");
          setAddedPhotos([]);
          setDescription("");
          setEmenities([""]);
          setPolicies([""]);
          setAdditionalServices([""]);
          // setMaxGuestsAllowed(1);
          setPrice(1);
          setSelectedFiles([]);
          setLatitude();
          setLongitude();
          navigate("/product");
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : error.message;
        setSubmittingError(errorMessage);
        console.log(errorMessage);
      }

      navigate("/product/hotels");
      window.location.reload();
    } else {
      setShowModal(false); // Hide the confirmation modal
    }
  };

  const uploadPhoto = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const { data: fileNames } = await axios.post(
      "https://travelix-backend-v2.vercel.app/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return fileNames;
  };
  const handleHotelDetail = (id) => {
    navigate(`/hotelDetail/${id}`);
  };

  const handleDeleteHotel = (id) => {
    dispatch(deleteHotelById(id));
  };

  useEffect(() => {
    dispatch(fetchHotelList(userInfo?._id));
  }, [dispatch, userInfo]);

  const handleDetails = () => {};
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/product/hotels/new"}
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
            Add new Hotel{" "}
            <div className="badge">
              {hotels && hotels.length && hotels.length > 0 ? hotels.length : 0}
            </div>
          </Link>

          <div>
            <div>
              <h1 className="font-bold text-xl my-5">
                {userInfo?.name} hotels
              </h1>
            </div>
            {/* Conditional Rendering based on loading, error, and vehicles array */}
            {loading && <Loader />}{" "}
            {/* Show Loader component if loading is true */}
            {error && <Message variant="danger">{error}</Message>}{" "}
            {/* Show Message component if error is true */}
            {hotels.length > 0 ? ( // Show vehicles if vehicles array has items
              hotels.map((hotel) => (
                <div
                  className="listing-card"
                  key={hotels._id}
                  onClick={handleDetails}
                >
                  <div className="listing-img">
                    <img src={`${hotel.images[0]}`} alt="hotel" />
                  </div>
                  <div className="listing-details">
                    <h2 className="font-bold capitalize text-2xl mb-[4rem]">
                      {hotel.hotelName}
                    </h2>
                    <p className="text-start">
                      <strong>Hotel Chain:</strong> {hotel.hotelChain}
                    </p>
                    <p className="text-start">
                      <strong>Location:</strong> {hotel.location}
                    </p>

                    <p className="text-start  mb-[1rem]">
                      <strong>Price:</strong>
                      {hotel.price} Rs/-
                    </p>
                    <div className="listing-buttons">
                      <button
                        id="details-button"
                        className="listing-button"
                        onClick={() => handleHotelDetail(hotel._id)}
                      >
                        Details
                      </button>
                      <button
                        id="edit-button"
                        className="listing-button"
                        onClick={() => {
                          navigate(`/hotel/edit/${hotel._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        id="delete-button"
                        className="listing-button"
                        onClick={() => {
                          handleDeleteHotel(hotel._id);
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
                No Hotels found.
              </div> // Show a beautiful text if no vehicles exist
            )}
          </div>
        </div>
      )}
      {action === "new" && (
        <div>
          {submitloading ? (
            <Loader />
          ) : submittingError ? (
            <Message>{submittingError}</Message>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="name" value="Hotel Name*" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Name (e.g., Grand Plaza Hotel)"
                  required
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="hotelChain" value="Hotel Chain*" />
                </div>
                <Select
                  id="hotelChain"
                  name="hotelChain"
                  value={hotelChain}
                  required
                  onChange={handleHotelChainChange}
                >
                  <option value="Delux">Delux</option>
                  <option value="Exective">Exective</option>
                  <option value="Luxury">Luxury</option>
                </Select>
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="location" value="Location*" />
                </div>
                <TextInput
                  id="location"
                  type="text"
                  placeholder="Type (e.g., Faislabad)"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => (
                    <div className="h-32 flex">
                      <img
                        className="rounded-2xl w-full object-cover"
                        src={`https://travelix-backend-v2.vercel.app/${link}`}
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
                <div className="mb-1 block">
                  <Label htmlFor="desc" value="Description*" />
                </div>
                <p className="text-gray-500 text-sm">
                  description of the hotel
                </p>
                <Textarea
                  id="desc"
                  placeholder="description..."
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Amenities" value="Emenities*" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Amenities of the hotel [🏊‍♂️ Access to swimming pool, 🍳
                    Complimentary breakfast, 🌐 Free Wi-Fi, 📺 Flat-screen TV]
                  </p>
                  <Features
                    selected={amenities}
                    onChange={handleEmenitiesChange}
                  />
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Policies" value="Policies" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Policies of the hotel [Cancellation policy: Free
                    cancellation up to 48 hours before check-in.]
                  </p>
                  <Features
                    selected={policies}
                    onChange={handlePoliciesChange}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div>
                    <div className="mb-1 block">
                      <Label htmlFor="price" value="Price*" />
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
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="services" value="Additional services" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Additional services of the hotel [🚖 Airport shuttle, 🧖‍♀️ Spa
                    services, 🍽️ In-room dining,]
                  </p>
                  <Features
                    selected={additionalServices}
                    onChange={handleAditionalServicesChange}
                  />
                </div>
                <Button type="submit" className="mt-5">
                  Submit
                </Button>
              </div>
            </form>
          )}
          {showModal && (
            <ConfirmationModal
              Modaltext="You will not be able to edit dates and duration. 
              Are you sure you want to submit the form?"
              handleConfirmation={handleConfirmation}
            />
          )}
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          Modaltext="You will not be able to edit dates and duration. 
              Are you sure you want to submit the form?"
          handleConfirmation={handleConfirmation}
        />
      )}
    </div>
  );
}

export default HotelPage;
