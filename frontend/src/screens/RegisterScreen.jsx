import React, { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/signupAnimation.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { setRegisterUserInfo } from "../features/auth/registerSlice";
import { useDispatch } from "react-redux";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const options = {
    animationData: Logo,
    loop: true,
  };

  const navigate = useNavigate();
  const { View } = useLottie(options);
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Confirm password must match the password");
      return;
    }

    setLoading(true);
    setError(null);
    const lowercaseEmail = email.toLowerCase();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", lowercaseEmail);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", selectedRole);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);

    // Regular expression for phone number validation
    const phoneRegex = /^[0-9]{11}$/;
    const isPhoneValid = phoneRegex.test(phone);

    if (!isEmailValid) {
      setError("Invalid Email!");
      setLoading(false);
      return;
    }

    if (!isPhoneValid) {
      setError("Invalid Number!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://travelix-backend-v2.vercel.app/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let userObj = {
        ...response.data,
        token: response.headers["x-auth-token"],
      };
      console.log("userObject is:-", userObj);

      setUserInfo(userObj);
      if (response.status === 200) {
        dispatch(setRegisterUserInfo(userObj));
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data ? err.response.data : err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center p-5">
        <Button
          className="w-auto p-2"
          onClick={() => navigate("/register/owner")}
        >
          Register as Service Provider
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr]">
        <div
          className="w-[50%] mx-auto my-auto"
          style={{ borderRadius: "50%" }}
        >
          {View}
        </div>
        <div>
          <form
            className="flex max-w-md flex-col gap-2"
            onSubmit={handleFormSubmit}
          >
            {loading && <Loader />}
            {error ? <Message>{error}</Message> : ""}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" value="Your name*" />
              </div>
              <TextInput
                id="name1"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value.trimStart())}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email*" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="john@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Your phone*" />
              </div>
              <TextInput
                id="phone"
                type="text"
                placeholder="03*********"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password*" />
              </div>
              <TextInput
                id="password"
                type="password"
                helperText="At least 8 characters long"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirm-password" value="Confirm password*" />
              </div>
              <TextInput
                id="confirm-password"
                type="password"
                helperText="Must match the password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload image" />
              </div>
              <button>
                <FileInput
                  id="file"
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </button>
            </div>

            <Button type="submit" className="rounded-full">
              Register
            </Button>
            <div className="text-center py-2">
              Already a member? &nbsp;
              <Link to={"/login"} className="underline text-black">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
