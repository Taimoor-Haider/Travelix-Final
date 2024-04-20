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

function TourEditPage() {
  const { id } = useParams(); // Assuming the Tour ID is passed as a URL parameter
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState(null); // State variable to store Tour details
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEditTour = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/tours/${id}`
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedFileNames = [];
      if (selectedFiles.length > 0) {
        uploadedFileNames = await uploadPhoto(selectedFiles);
        console.log("Uplaoded file names: " + uploadedFileNames);
        console.log("Selected Files: " + selectedFiles);
      }
      // Assuming selectedFiles is defined somewhere in your code


      const requestData = {
        place: tour.place,
        title: tour.title,
        description: tour.description,
        city: tour.city,
        images: uploadedFileNames.length > 0 ? uploadedFileNames : tour.images,
        duration: tour.duration,
        personsAllowed: tour.personsAllowed,
        amenities: tour.amenities.filter((amenity) => amenity !== ""), // Remove empty features
        availableDates: tour.availableDates,
        price: tour.price,
        latitude: tour.latitude,
        longitude: tour.longitude,
      };
      const response = await axios.put(
        `http://localhost:3000/api/tours/${id}`,
        requestData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log(error.message);
    }
    navigate("/product/tours");
    window.location.reload();
  };

  // const uploadPhoto = async (files) => {
  //   const formData = new FormData();
  //   for (let i = 0; i < files?.length; i++) {
  //     formData.append("photos", files[i]);
  //   }
  //   const { data: fileNames } = await axios.post(
  //     "http://localhost:3000/upload",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   return fileNames;
  // };


  const uploadPhoto = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
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
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error; // Re-throw the error so that the calling function can handle it
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
            <Label htmlFor="place" value="Place" />
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
            <Label htmlFor="title" value="Title" />
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
            <Label htmlFor="description" value="Description" />
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
            <Label htmlFor="city" value="City" />
          </div>
          <TextInput
            id="city"
            type="text"
            placeholder="City (e.g., Paris)"
            required
            value={tour?.city || ""}
            onChange={(e) => setTour({ ...tour, city: e.target.value })}
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
            value={tour?.duration || ""}
            onChange={(e) => setTour({ ...tour, duration: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
          {tour?.images.length > 0 &&
            tour?.images.map((link) => (
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
              onChange={(seletectedDates) =>
                setTour({ ...tour, availableDates: seletectedDates })
              }
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
                value={tour?.price || ""}
                onChange={(e) => setTour({ ...tour, price: e.target.value })}
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
                value={tour?.personsAllowed || ""}
                onChange={(e) =>
                  setTour({ ...tour, personsAllowed: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <div className="mb-1 block">
                <Label htmlFor="longitude" value="Longitude" />
              </div>

              <TextInput
                id="longitude"
                type="text"
                placeholder="Type (e.g. 31.5204° N)"
                required
                value={tour?.longitude || ""}
                onChange={(e) =>
                  setTour({ ...tour, longitude: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="latitude" value="Latitude" />
              </div>

              <TextInput
                id="latitude"
                type="text"
                placeholder="Type (e.g. 74.3587° E)"
                required
                value={tour?.latitude || ""}
                onChange={(e) => setTour({ ...tour, latitude: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TourEditPage;
