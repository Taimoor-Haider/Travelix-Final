import React, { useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { forgetpasswordSelector } from "../features/auth/forgetPasswordSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../features/auth/loginSlice";
function PasswordResetScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { email } = useSelector(forgetpasswordSelector);
  const navigate = useNavigate();
  console.log("Email in reset Screen is" + email);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending form");
    console.log(email);

    if (password !== confirmPassword) {
      setError("Passwords did not match");
      return;
    }
    console.log("Sending request to:");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/auth/reset-password",
        {
          email,
          resetCode: code,
          newPassword: password,
        }
      );

      if (response.status === 200) {
        setMessage(response.data);
      } else {
        setError(response.data);
      }

      navigate("/login");
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

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message color="info">{message}</Message>}
      {error && <Message>{error}</Message>}
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="mt-5">
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
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

      <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
        <a
          className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
          target="_blank"
        >
          <svg
            className="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View Github
        </a>
        <a
          className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
        >
          Contact us!
        </a>
      </p>
    </main>
  );
}

export default PasswordResetScreen;
