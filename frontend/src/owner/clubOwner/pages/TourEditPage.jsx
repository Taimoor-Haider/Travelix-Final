import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import Features from "../components/Features";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import axios from "axios";
import DateSelector from "../components/DateSelector";
import ConfirmationModal from "../../../components/ConfirmationModal";

function TourEditPage() {
  const { id } = useParams();
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState(null);
  const [error, setError] = useState(null);
  const [durationWarning, setDurationWarning] = useState("");
  const [duration, setDuration] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEditTour = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://travelix-backend-v2.vercel.app/api/tours/${id}`
        );
        setTour(data);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchEditTour();
  }, [dispatch, id]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleDuration = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setTour({ ...tour, duration: e.target.value });
      setDuration(e.target.value);
      setDurationWarning("");
    } else {
      setDurationWarning("Duration must be a positive number");
    }
  };

  const handleNegativeDuration = (e) => {
    if (e.key === "-" || e.key === "-" || isNaN(Number(e.target.value))) {
      e.preventDefault();
      setDurationWarning("Duration must be a positive number");
    }
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 1) {
      setTour({ ...tour, price: inputValue });
    }
  };
  const handleMaxChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || parseFloat(inputValue) >= 1) {
      setTour({ ...tour, personsAllowed: inputValue });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if amenities are empty
    if (tour.amenities.length === 0) {
      alert("Amenities cannot be empty. Please select at least one amenity.");
      return; // Prevent form submission
    } else if (
      !tour.place.trim() ||
      !tour.title.trim() ||
      !tour.description.trim() ||
      tour.amenities.some((amenity) => !amenity.trim())
    ) {
      alert(
        "Please fill out all fields and ensure they are not empty or contain only white spaces."
      );
      return;
    }
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmation = async (confirm) => {
    if (confirm) {
      try {
        let uploadedFileNames = [];
        if (selectedFiles.length > 0) {
          uploadedFileNames = await uploadPhoto(selectedFiles);
          console.log("Uplaoded file names: " + uploadedFileNames);
          console.log("Selected Files: " + selectedFiles);
        }
        setShowModal(false);
        setEditLoading(true);
        const requestData = {
          place: tour.place,
          title: tour.title,
          description: tour.description,
          images:
            uploadedFileNames.length > 0 ? uploadedFileNames : tour.images,
          duration: tour.duration,
          personsAllowed: tour.personsAllowed,
          amenities: tour.amenities.filter((amenity) => amenity !== ""),
          availableDates: tour.availableDates,
          price: tour.price,
          latitude: tour.latitude,
          longitude: tour.longitude,
        };

        const response = await axios.put(
          `https://travelix-backend-v2.vercel.app/api/tours/${id}`,
          requestData
        );
        setEditLoading(false);
        console.log("Response:", response.data);
      } catch (error) {
        setEditError(error.response.data);
      }
      navigate("/product/tours");
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

    try {
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
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <div>
      <h1>Edit Tour</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="place" value="Place*" />
          </div>
          <TextInput
            id="place"
            type="text"
            placeholder="Place (e.g., Paris)"
            required
            value={tour?.place || ""}
            onChange={(e) => setTour({ ...tour, place: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="title" value="Title*" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Title (e.g., Eiffel Tower Tour)"
            required
            value={tour?.title || ""}
            onChange={(e) => setTour({ ...tour, title: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="description" value="Description*" />
          </div>
          <Textarea
            id="description"
            placeholder="Description..."
            required
            rows={4}
            value={tour?.description || ""}
            onChange={(e) => setTour({ ...tour, description: e.target.value })}
          />
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="duration" value="Duration" />
          </div>
          <TextInput
            id="duration"
            type="text"
            placeholder="Type no of Days"
            // required
            disabled
            value={tour?.duration || ""}
            onChange={handleDuration}
            onKeyPress={handleNegativeDuration}
            // onChange={(e) => setTour({ ...tour, duration: e.target.value })}
          />
          {durationWarning && (
            <div className="text-red-500">{durationWarning}</div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
          {tour?.images.length > 0 &&
            tour?.images.map((link) => (
              <div className="h-32 flex">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={`${link}`}
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
              <Label htmlFor="Amenities" value="Emenities*" />
            </div>
            <p className="text-gray-500 text-sm">
              Amenities of the Tour [Mountain view 🏔️, Guided hiking tours 🥾,
              Local cuisine tasting 🍲,Cultural workshops and classes 🎨]
            </p>
            <Features
              selected={tour?.amenities}
              onChange={(seletectedAmenities) =>
                setTour({ ...tour, amenities: seletectedAmenities })
              }
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
              selected={tour?.availableDates || []}
              duration={Number(duration)}
              edit={true}
              // onChange={handleAvailibleDates}
              onChange={(seletectedDates) =>
                setTour({ ...tour, availableDates: seletectedDates })
              }
              // setTour({ ...tour, duration: e.target.value })
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
                value={tour?.price || ""}
                // onChange={(e) => setTour({ ...tour, price: e.target.value })}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="maxGuestsAllowed" value="Persons Allowed*" />
              </div>

              <TextInput
                id="maxGuestsAllowed"
                type="number"
                placeholder="1"
                required
                value={tour?.personsAllowed || ""}
                // onChange={(e) =>
                //   setTour({ ...tour, personsAllowed: e.target.value })
                // }
                onChangeCapture={handleMaxChange}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2"></div>

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </div>
      </form>
      {showModal && (
        <ConfirmationModal
          Modaltext="Are you sure you want to submit the form?"
          handleConfirmation={handleConfirmation}
        />
      )}
    </div>
  );
}

export default TourEditPage;
