import React from "react";
import "./OwnerRegisterScreen.css";
import { useState, useEffect } from "react";
import { FileInput, Select, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/registerSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TravelixBanner from "../assets/images/TravelixBanner.png";
import BlueUnderline from "../assets/icons/underlineBlue.svg";

function OwnerRegisterScreen() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");
  // const [accountNumber, setAccountNumber] = useState("");
  // const [accountName, setAccountName] = useState("");
  // const [bankName, setBankName] = useState("");
  // const [role, setRole] = useState("clubOwner"); // Default value
  // const [idCardImage, setIdCardImage] = useState(null);
  // const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
    accountNumber: Yup.string().required("Account number is required"),
    accountName: Yup.string().required("Account name is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "clubOwner",
      address: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
      image: null,
      idCardImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: ({
      name,
      email,
      phone,
      password,
      image,
      role,
      address,
      accountNumber,
      accountName,
      bankName,
      idCardImage,
    }) => {
      console.log(
        name,
        email,
        phone,
        password,
        image,
        role,
        address,
        accountNumber,
        accountName,
        bankName,
        idCardImage
      );
      dispatch(
        registerUser(
          name,
          email,
          phone,
          password,
          image,
          role,
          address,
          accountNumber,
          accountName,
          bankName,
          idCardImage
        )
      );
      navigate("/");
    },
  });

  return (
    <div className="j-main-container">
      <div className="j-reg-img-container">
        <img src={TravelixBanner}></img>
      </div>
      {/* FORM CONTAINER */}
      <form className="j-form-container" onSubmit={formik.handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="heading-Ucontainer j-reg-title">
            <h1 className="section-heading">Service Provider Register</h1>

            <img src={BlueUnderline} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3 j-reg-fileInput">
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload image
              </label>

              <button>
                <FileInput
                  id="file"
                  name="image"
                  type="file"
                  helperText="Upload your profile picture"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      formik.setFieldValue("image", file);
                    };
                    reader.readAsDataURL(file);
                  }}
                  onBlur={formik.handleBlur}
                />
              </button>
              {formik.touched.image && formik.errors.image ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.image}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Join as
              </label>
              <Select
                id="role"
                name="role"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              >
                <option value="clubOwner">Travel Club</option>
                <option value="carOwner">Car Owner</option>
                <option value="hotelOwner">Hotel Owner</option>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.role}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-6">
              <h2 className="font-semibold leading-7 text-gray-900 text-2xl text-left underline">
                Owner Specific Information
              </h2>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="street-address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3 j-reg-fileInput">
              <label
                htmlFor="file2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload CNIC image
              </label>

              <button>
                <FileInput
                  id="file2"
                  name="idCardImage"
                  type="file"
                  helperText="Upload your CNIC image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      formik.setFieldValue("idCardImage", file);
                    };
                    reader.readAsDataURL(file);
                  }}
                  onBlur={formik.handleBlur}
                />
              </button>
              {formik.touched.idCardImage && formik.errors.idCardImage ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.idCardImage}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="account"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Account Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accountNumber"
                  id="account"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountNumber}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.accountNumber && formik.errors.accountNumber ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.accountNumber}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Account Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="accountName"
                  id="accountName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.accountName && formik.errors.accountName ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.accountName}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="bank"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bank Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="bankName"
                  id="bank"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.bankName && formik.errors.bankName ? (
                <div className="text-red-500 font-medium text-sm">
                  {formik.errors.bankName}
                </div>
              ) : null}
            </div>

            <div className="col-span-full">
              <Button type="submit" className="rounded-full w-[50%] mx-auto">
                Register
              </Button>
              <div className="text-center py-2">
                Already a member? &nbsp;
                <Link to={"/login"} className="underline text-black">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OwnerRegisterScreen;
