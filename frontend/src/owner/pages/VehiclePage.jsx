import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Textarea, Label, TextInput, Select } from "flowbite-react";
import Features from "../components/Features";
import axois from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  deleteVehicleById,
  fetchVehicleList,
  vehcileListSelector,
} from "../../features/vehicleOwner/vehicleListSlice";
import ConfirmationModal from "../../components/ConfirmationModal";

function VehiclePage() {
  const { action } = useParams();
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, vehicles, error } = useSelector(vehcileListSelector);

  console.log(userInfo);
  console.log(action);
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleType, setVehicleType] = useState("Sedan");
  const [location, setLocation] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  // const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [additionalServices, setAdditionalServices] = useState([""]);
  const [price, setPrice] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitloading, setSubmitloading] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFeaturesChange = (features) => {
    setFeatures(features);
  };
  const handleAditionalServicesChange = (services) => {
    setAdditionalServices(services);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty or contain only white spaces
    if (
      !vehicleModel.trim() ||
      !vehicleType.trim() ||
      !location.trim() ||
      !description.trim() ||
      features.some((amenity) => !amenity.trim()) ||
      additionalServices.some((service) => !service.trim())
    ) {
      alert(
        "Please fill out all fields and ensure they are not empty or contain only white spaces."
      );
      return; // Prevent form submission
    }

    // Check if amenities are empty
    if (features.length === 0) {
      alert("Features cannot be empty. Please select at least 1 Feature.");
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
          alert("Please select at least one image");
          showModal(false);
          return;
        } else {
          setShowModal(false);
          setSubmitloading(true);
          const uploadedFileNames = await uploadPhoto(selectedFiles);

          const requestData = {
            vehicleModel: vehicleModel,
            vehicleType: vehicleType,
            location: location,
            images: uploadedFileNames,
            price: price,
            // maxPersonsAllowed: personsAllowed,
            features: features.filter((feature) => feature !== ""), // Remove empty features
            description: description,
            vehicleOwner: userInfo?._id,
            additionalServices: additionalServices.filter(
              (service) => service !== ""
            ), // Remove empty additional services
          };

          const response = await axois.post(
            "https://travelix-backend-v2.vercel.app/api/vehicle",
            requestData
          );
          console.log("Response:", response.data);
          setVehicleModel("");
          setVehicleType("sedan");
          setLocation("");
          setAddedPhotos([]);
          // setPhotoLink("");
          setDescription("");
          setFeatures([""]);
          setAdditionalServices([""]);
          // setPersonsAllowed(1);
          setPrice(1);

          navigate("/product/vehicles");
        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : error.message;
        setSubmittingError(errorMessage);
      }
      navigate("/product/vehicles");
      window.location.reload();
    } else {
      setShowModal(false);
    }
  };

  const uploadPhoto = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const { data: fileNames } = await axois.post(
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

  const handleVehcileDetail = (id) => {
    navigate(`/vehicleDetail/${id}`);
  };

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
  };
  const handleDeleteVehicel = (id) => {
    dispatch(deleteVehicleById(id));
  };

  useEffect(() => {
    dispatch(fetchVehicleList(userInfo?._id));
  }, [dispatch, userInfo]);

  const handleDetails = () => {};
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/product/vehicles/new"}
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
            Add new Vehicle{" "}
            <div className="badge">
              {vehicles && vehicles.length && vehicles.length > 0
                ? vehicles.length
                : 0}
            </div>
          </Link>

          <div>
            <div>
              <h1 className="font-bold text-xl my-5">
                {userInfo?.name} Vehicles
              </h1>
            </div>
            {/* Conditional Rendering based on loading, error, and vehicles array */}
            {loading && <Loader />}{" "}
            {/* Show Loader component if loading is true */}
            {error && <Message variant="danger">{error}</Message>}{" "}
            {/* Show Message component if error is true */}
            {vehicles.length > 0 ? ( // Show vehicles if vehicles array has items
              vehicles.map((vehicle) => (
                <div
                  className="listing-card"
                  key={vehicle._id}
                  onClick={handleDetails}
                >
                  <div className="listing-img">
                    <img src={`${vehicle.images[0]}`} alt="Vehicle" />
                  </div>
                  <div className="listing-details">
                    <h2 className="font-bold capitalize text-2xl mb-[4rem]">
                      {vehicle.vehicleModel}
                    </h2>
                    <p className="text-start">
                      <strong>Vehicle Type:</strong> {vehicle.vehicleType}
                    </p>
                    <p className="text-start">
                      <strong>Location:</strong> {vehicle.location}
                    </p>

                    <p className="text-start  mb-[1rem]">
                      <strong>Price:</strong>
                      {vehicle.price} Rs/-
                    </p>
                    <div className="listing-buttons">
                      <button
                        id="details-button"
                        className="listing-button"
                        onClick={() => handleVehcileDetail(vehicle._id)}
                      >
                        Details
                      </button>
                      <button
                        id="edit-button"
                        className="listing-button"
                        onClick={() => {
                          navigate(`/vehicle/edit/${vehicle._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        id="delete-button"
                        className="listing-button"
                        onClick={() => {
                          handleDeleteVehicel(vehicle._id);
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
                No vehicles found.
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
                  <Label htmlFor="model" value="Vehicle Model" />
                </div>
                <TextInput
                  id="model"
                  type="text"
                  placeholder="Model (e.g., Toyota Corolla 2017)"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="type" value="Vehicle Type" />
                </div>
                <Select
                  id="vehicle"
                  name="vehicle"
                  value={vehicleType}
                  required
                  onChange={handleVehicleChange}
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Bus">Bus</option>
                </Select>
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="location" value="Location" />
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

              {/* <div>
              <div className="mb-1 block">
                <Label htmlFor="photo" value="Photos" />
                <p className="text-gray-500 text-sm">more better</p>
              </div>
              <div className="flex gap-2">
                <TextInput
                  id="photo"
                  type="text"
                  placeholder="Add using a link ...jpg)"
                  className="flex-1"
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                />
                <button
                  className="bg-primary hover:bg-teal-600 text-white w-auto px-4"
                  onClick={addPhotoByLink}
                  type="button"
                >
                  Add photo
                </button>
              </div>
            </div> */}
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
                  <Label htmlFor="desc" value="Description" />
                </div>
                <p className="text-gray-500 text-sm">
                  description of the vehicle
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
                    <Label htmlFor="features" value="Features" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    features of the vehicle [Air conditioning, Bluetooth
                    connectivity, Unlimited mileage]
                  </p>
                  <Features
                    selected={features}
                    onChange={handleFeaturesChange}
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
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="services" value="Additional services" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Additional services of the vehicle [GPS rental, Child seat
                    rental, Additional driver option,]
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
    </div>
  );
}

export default VehiclePage;
