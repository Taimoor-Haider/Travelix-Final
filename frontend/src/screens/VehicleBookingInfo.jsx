import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVehcileBookingUserInfo } from "../features/vehicle/vehicleDetailSlice";
import VehicleCheckoutSteps from "../components/VehicleCheckoutSteps";
import { Button } from "flowbite-react";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/infoAnim.json";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim() // Trim whitespace
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  cnic: Yup.string()
    .trim() // Trim whitespace
    .matches(/^\d{13}$/, {
      message: "CNIC must be exactly 13 digits",
      excludeEmptyString: true, // Exclude empty string from the error message
    })
    .matches(/^\d+$/, "CNIC must contain only numbers") // Only numbers allowed
    .required("CNIC is required"),
  gender: Yup.string()
    .trim() // Trim whitespace
    .required("Gender is required"),
});

const initialValues = {
  fullName: "",
  cnic: "",
  gender: "male",
};

function VehicleBookingInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleChange, touched, handleBlur, handleSubmit, values, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        dispatch(addVehcileBookingUserInfo(values));
        navigate("/vehicle/payment");
      },
    });
  console.log(errors);

  const options = {
    animationData: Logo,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <>
      <VehicleCheckoutSteps step1 step2 />
      <div className="grid grid-cols-[1fr_1.5fr]">
        <div>{View}</div>
        <div>
          <form
            className="flex max-w-[80%] mx-auto flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="full-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="full-name"
                      autoComplete="off"
                      placeholder="Name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />
                    {errors.fullName && touched.fullName ? (
                      <div className="text-red-500 font-medium text-sm">
                        {errors.fullName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="cni c"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CNIC
                  </label>
                  <div className="mt-2">
                    <input
                      id="cnic"
                      name="cnic"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cnic}
                    />
                    {errors.cnic && touched.cnic ? (
                      <div className="text-red-500 font-medium text-sm">
                        {errors.cnic}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                  <div className="mt-2">
                    <select
                      id="gender"
                      name="gender"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Make Payment
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default VehicleBookingInfo;
