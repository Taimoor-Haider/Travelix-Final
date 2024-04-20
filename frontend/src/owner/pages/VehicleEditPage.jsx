import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import Features from "../components/Features";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import axios from "axios";
import {
  fetchVehicle,
  vehcileListSelector,
} from "../../features/vehicleOwner/vehicleListSlice";

function VehicleEditPage() {
  const { id } = useParams(); // Assuming the vehicle ID is passed as a URL parameter
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null); // State variable to store vehicle details
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEditVehicle = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/vehicle/${id}`
        );
        setVehicle(data);
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
    fetchEditVehicle();
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
        vehicleModel: vehicle.vehicleModel,
        vehicleType: vehicle.vehicleType,
        location: vehicle.location,
        rentalCompanyName: vehicle.rentalCompanyName,
        images:
          uploadedFileNames.length > 0 ? uploadedFileNames : vehicle.images,
        price: vehicle.price,
        maxPersonsAllowed: vehicle.maxPersonsAllowed,
        features: vehicle.features.filter((feature) => feature !== ""), // Remove empty features
        description: vehicle.description,
        vehicleOwner: userInfo?._id,
        additionalServices: vehicle.additionalServices.filter(
          (service) => service !== ""
        ), // Remove empty additional services
      };

      const response = await axios.put(
        `http://localhost:3000/api/vehicle/${id}`,
        requestData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log(error.message);
    }

    navigate("/product/vehicles");
    window.location.reload();
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
      <h1>Edit Vehicle</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <Label htmlFor="model" value="Vehicle Model" />
          <TextInput
            id="model"
            type="text"
            placeholder="Model (e.g., Toyota Corolla 2017)"
            required
            value={vehicle?.vehicleModel || ""}
            onChange={(e) =>
              setVehicle({ ...vehicle, vehicleModel: e.target.value })
            }
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="type" value="Vehicle Type" />
          </div>
          <TextInput
            id="type"
            type="text"
            placeholder="Type (e.g., Sedan)"
            required
            value={vehicle?.vehicleType || ""}
            onChange={(e) =>
              setVehicle({ ...vehicle, vehicleType: e.target.value })
            }
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
            value={vehicle?.location || ""}
            onChange={(e) =>
              setVehicle({ ...vehicle, location: e.target.value })
            }
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="company" value="Rental company name" />
          </div>
          <TextInput
            id="company"
            type="text"
            placeholder="Type (e.g., City Drive Rentals)"
            required
            value={vehicle?.rentalCompanyName || ""}
            onChange={(e) =>
              setVehicle({ ...vehicle, rentalCompanyName: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 md:grid-cols-4 mt-2">
          {vehicle?.images.length > 0 &&
            vehicle?.images.map((link) => (
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            Upload
          </label>
        </div>
        <div>
          <Label htmlFor="desc" value="Description" />
          <Textarea
            id="desc"
            placeholder="description..."
            required
            rows={4}
            value={vehicle?.description || ""}
            onChange={(e) =>
              setVehicle({ ...vehicle, description: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="features" value="Features" />
          <Features
            selected={vehicle?.features || []}
            onChange={(selectedFeatures) =>
              setVehicle({ ...vehicle, features: selectedFeatures })
            }
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <Label htmlFor="price" value="Price" />
            <TextInput
              id="price"
              type="number"
              placeholder="PKR"
              required
              value={vehicle?.price || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, price: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="personsAllowed" value="Persons Allowed" />
            <TextInput
              id="personsAllowed"
              type="number"
              placeholder="1"
              required
              value={vehicle?.maxPersonsAllowed || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, maxPersonsAllowed: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="services" value="Additional services" />
          <Features
            selected={vehicle?.additionalServices || []}
            onChange={(selectedServices) =>
              setVehicle({ ...vehicle, additionalServices: selectedServices })
            }
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}

export default VehicleEditPage;
