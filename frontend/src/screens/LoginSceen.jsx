import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/loginAnimation.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, loginUser } from "../features/auth/loginSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(loginSelector);
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");
  const options = {
    animationData: Logo,
    loop: true,
  };

  const { View } = useLottie(options);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      if (redirect.includes("vehicleOwner") && userInfo.role === "carOwner") {
        navigate(redirect);
      } else if (!redirect.includes("vehicleOwner")) {
        navigate(redirect);
      }
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-[1fr_1fr] w-full max-w-screen-lg">
        <div className="w-full mx-auto md:w-1/2 my-auto">{View}</div>
        <div className="w-full">
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              type="email"
              placeholder="john@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="password" value="Your password" />
            <TextInput
              id="password"
              type="password"
              helperText="At least 8 characters long"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="rounded-full">
              Login
            </Button>
            <div className="text-center py-2">
              Don't have an account yet? &nbsp;
              <Link to="/register" className="underline text-black">
                Register
              </Link>
            </div>
            <div className="text-center py-2">
              <Link to="/forget" className="underline text-black">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
