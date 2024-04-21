import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendFeedback } from "../features/Feedback/feedbackSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Message from "./Message";
import Loader from "./Loader";
import axios from "axios";
const Feedbacks = () => {
  const { targetId } = useParams();
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRatingChange = (value) => {
    // If the same star is clicked again, remove the rating
    if (rating === value) {
      setRating(null);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating !== null && message.trim() !== "") {
      dispatch(sendFeedback(targetId, rating, message));
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `https://travelix-backend-v2.vercel.app/api/bookings/updateFeedback/${targetId}`
      );
      setSuccess(true);
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

  if (success) {
    navigate("/");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <form
          className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>

          <div className="mb-4">
            <label className="block mb-1">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  key={value}
                  className="relative cursor-pointer text-blue-500"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    className="hidden"
                    checked={rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                  <FontAwesomeIcon
                    icon={rating >= value ? solidStar : regularStar}
                    onClick={() => handleRatingChange(value)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block mb-1">
              Message
            </label>
            <textarea
              id="message"
              className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default Feedbacks;
