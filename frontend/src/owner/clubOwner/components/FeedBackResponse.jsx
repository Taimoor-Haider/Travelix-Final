import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginSelector } from "../../features/auth/loginSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
function FeedBackResponse() {
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");

  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setLoading(true); // Set loading state to true before making the request
        const { data } = await axios.get(
          `https://travelix-backend-v2.vercel.app/api/reviews/${feedbackId}`
        );
        setFeedback(data);
        setLoading(false); // Set loading state to false after successful request
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading state to false after encountering an error
      }
    };

    fetchResponse(); // Call the fetchResponse function
  }, [feedbackId]); // Add feedbackId as a dependency to useEffect

  if (loading) {
    return <Loader />; // Render loading state
  }

  if (error) {
    return <Message>{error}</Message>; // Render error state
  }

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const reponse = {
      review: feedback._id, // Use actual ObjectId from your feedbacks
      owner: userInfo._id, // Use actual ObjectId from your users
      comment: response,
    };

    await axios
      .post(`https://travelix-backend-v2.vercel.app/api/responses`, reponse)
      .then((res) => {
        navigate("/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mx-auto max-w-2xl">
        <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleResponseSubmit}>
            <div>
              <label
                for="hs-feedback-post-comment-textarea-1"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Feedback
              </label>
              <div className="mt-1">
                <textarea
                  readOnly
                  id="hs-feedback-post-comment-textarea-1"
                  name="hs-feedback-post-comment-textarea-1"
                  rows="3"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Leave your comment here..."
                >
                  {feedback?.comment}
                </textarea>
              </div>
            </div>

            <div>
              <label
                for="hs-feedback-post-comment-textarea-2"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Response
              </label>
              <div className="mt-1">
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  id="hs-feedback-post-comment-textarea-2"
                  name="hs-feedback-post-comment-textarea-2"
                  rows="3"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Leave your comment here..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6 grid" type="submit">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedBackResponse;
