import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  forgetpasswordSelector,
  reset,
} from "../features/auth/forgetPasswordSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
function ForgetPasswordScreen() {
  const [email, setEmail] = useState(""); // State variable to store email
  const { loading, error, success } = useSelector(forgetpasswordSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Before Dispatching");
    dispatch(forgetPassword(email));
    console.log("Aftar Dispatching");
    setEmail("");
    navigate("/reset");
    dispatch(reset());
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        {success && <Message color="info">"Please check your Email"</Message>}

        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                to={"/login"}
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleFormSubmit}>
              {" "}
              {/* Call handleFormSubmit function on form submission */}
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                      value={email} // Bind input value to email state
                      onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgetPasswordScreen;
