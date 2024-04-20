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

function HotelEditPage() {
  const { id } = useParams(); // Assuming the Hotel ID is passed as a URL parameter
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState(null); // State variable to store Hotel details
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEditHotel = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/hotels/${id}`
        );
        setHotel(data);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchEditHotel();
  }, [dispatch, id]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming selectedFiles is defined somewhere in your code
      const uploadedFileNames = await uploadPhoto(selectedFiles);
      console.log("Uplaoded file names: " + uploadedFileNames);
      console.log("Selected Files: " + selectedFiles);

      const requestData = {
        hotelName: hotel.hotelName,
        location: hotel.location,
        hotelChain: hotel.hotelChain,
        rentalCompanyName: hotel.rentalCompanyName,
        images: uploadedFileNames.length > 0 ? uploadedFileNames : hotel.images,
        price: hotel.price,
        roomType: hotel.roomType,
        maxGuestsAllowed: hotel.maxGuestsAllowed,
        amenities: hotel.amenities.filter((amenity) => amenity !== ""), // Remove empty features
        description: hotel.description,
        hotelOwner: userInfo?._id,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        additionalServices: hotel.additionalServices.filter(
          (service) => service !== ""
        ),
        policies: hotel.policies.filter((policy) => policy !== ""),
      };
      const response = await axios.put(
        `http://localhost:3000/api/hotels/${id}`,
        requestData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log(error.message);
    }

    navigate("/product");
  };

  const uploadPhoto = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <div>
      <h1>Edit Hotel</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="name" value="Hotel Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Name (e.g., Grand Plaza Hotel)"
            required
            value={hotel?.hotelName || ""}
            onChange={(e) => setHotel({ ...hotel, hotelName: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="hotelChain" value="Hotel Chain" />
          </div>
          <TextInput
            id="hotelChain"
            type="text"
            placeholder="Type (e.g., Luxury Collection)"
            required
            value={hotel?.hotelChain || ""}
            onChange={(e) => setHotel({ ...hotel, hotelChain: e.target.value })}
          />
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
            value={hotel?.location || ""}
            onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="roomType" value="Romme type" />
          </div>
          <TextInput
            id="roomType"
            type="text"
            placeholder="Type (e.g., Deluxe Suite)"
            required
            value={hotel?.roomType || ""}
            onChange={(e) => setHotel({ ...hotel, roomType: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
          {hotel?.images.length > 0 &&
            hotel?.images.map((link) => (
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
          <div className="mb-1 block">
            <Label htmlFor="desc" value="Description" />
          </div>
          <p className="text-gray-500 text-sm">description of the hotel</p>
          <Textarea
            id="desc"
            placeholder="description..."
            required
            rows={4}
            value={hotel?.description || ""}
            onChange={(e) =>
              setHotel({ ...hotel, description: e.target.value })
            }
          />
          <div>
            <div className="mb-1 block">
              <Label htmlFor="Amenities" value="Emenities" />
            </div>
            <p className="text-gray-500 text-sm">
              Amenities of the hotel [🏊‍♂️ Access to swimming pool, 🍳
              Complimentary breakfast, 🌐 Free Wi-Fi, 📺 Flat-screen TV]
            </p>
            <Features
              selected={hotel?.amenities || []}
              onChange={(seletectedAmenities) =>
                setHotel({ ...hotel, amenities: seletectedAmenities })
              }
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="Policies" value="Policies" />
            </div>
            <p className="text-gray-500 text-sm">
              Policies of the hotel [Cancellation policy: Free cancellation up
              to 48 hours before check-in.]
            </p>
            <Features
              selected={hotel?.policies || []}
              onChange={(seletectedPolicies) =>
                setHotel({ ...hotel, policies: seletectedPolicies })
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
                value={hotel?.price || ""}
                onChange={(e) => setHotel({ ...hotel, price: e.target.value })}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="maxGuestsAllowed" value="Max guest Allowed" />
              </div>

              <TextInput
                id="maxGuestsAllowed"
                type="number"
                placeholder="1"
                required
                value={hotel?.maxGuestsAllowed || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, maxGuestsAllowed: e.target.value })
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
                value={hotel?.longitude || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, longitude: e.target.value })
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
                value={hotel?.latitude || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, latitude: e.target.value })
                }
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
              selected={hotel?.additionalServices || []}
              onChange={(selectedServices) =>
                setHotel({ ...hotel, additionalServices: selectedServices })
              }
            />
          </div>
          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HotelEditPage;
