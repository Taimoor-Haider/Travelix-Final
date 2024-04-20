import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import { sendFeedback } from "../features/Feedback/feedbackSlice";
const Feedbacks = () => {
  // State variables to store form data
  const { targetId } = useParams();

  console.log(targetId);

  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Event handlers to update state
  const handleRatingChange = (e) => setRating(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating && message) {
      dispatch(sendFeedback(targetId, rating, message));
    }
    navigate("/");
  };

  return (
    <form
      className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>

      <div className="mb-4">
        <label className="block mb-1">Rating</label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <React.Fragment key={value}>
              <input
                type="radio"
                name="rating"
                id={`rating${value}`}
                value={value}
                className="hidden"
                checked={rating === value}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`rating${value}`}
                className={`relative cursor-pointer ${
                  rating === value ? "text-blue-500" : ""
                }`}
              >
                <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                  {rating === value && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="ml-2">{value}</span>
              </label>
            </React.Fragment>
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
          onChange={handleMessageChange}
        ></textarea>
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Feedbacks;
