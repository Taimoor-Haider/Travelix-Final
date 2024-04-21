import React from "react";
import CheckSteps from "../components/CheckSteps";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
  addBookedUserInfo,
  addTravellersInfo,
} from "../features/tour/tourbookingSlice";
import { packageFormSelector } from "../features/PackageFromSlice";
import { useLottie } from "lottie-react";
import Logo from "../../src/assets/infoAnim.json";
import { useFormik } from "formik";
import * as Yup from "yup";

function BookingInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { noOfPersons } = useSelector(packageFormSelector);
  const options = {
    animationData: Logo,
    loop: true,
  };
  const { View } = useLottie(options);
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
    persons: Yup.array().of(
      Yup.object().shape({
        email: Yup.string()
          .trim() // Trim whitespace
          .email("Invalid email")
          .matches(
            /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
          )
          .required("Email is required"),
        cnic: Yup.string()
          .trim() // Trim whitespace
          .matches(/^\d{13}$/, {
            message: "CNIC must be exactly 13 digits",
            excludeEmptyString: true, // Exclude empty string from the error message
          })
          .matches(/^\d+$/, "CNIC must contain only numbers") // Only numbers allowed
          .required("CNIC is required"),
        number: Yup.string()
          .trim() // Trim whitespace
          .matches(
            /^[0-9]{11}$/,
            "Number must be 11 digits and contain only numbers"
          )
          .matches(/^\d+$/, "Number must contain only numbers") // Only numbers allowed
          .required("Account number is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      cnic: "",
      gender: "male",
      persons: Array.from({ length: noOfPersons - 1 }, () => ({
        email: "",
        cnic: "",
        number: "",
      })),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addBookedUserInfo(values));
      dispatch(addTravellersInfo(values.persons));
      navigate("/payment");
    },
  });

  console.log(formik.errors);

  return (
    <>
      <CheckSteps step1 step2 />
      <div className="grid grid-cols-[1fr_1.5fr]">
        <div className="self-center">Animation</div>
        <div>
          <form
            className="flex max-w-[80%] mx-auto flex-col gap-4"
            onSubmit={formik.handleSubmit}
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
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                    />
                  </div>
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-500 font-medium text-sm">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="cnic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CNIC
                  </label>
                  <div className="mt-2">
                    <input
                      id="cnic"
                      name="cnic"
                      type="text"
                      autoComplete="cnic"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cnic}
                    />
                  </div>
                  {formik.touched.cnic && formik.errors.cnic ? (
                    <div className="text-red-500 font-medium text-sm">
                      {formik.errors.cnic}
                    </div>
                  ) : null}
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
                      autoComplete="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-500 font-medium text-sm">
                      {formik.errors.gender}
                    </div>
                  ) : null}
                </div>

                {[...Array(noOfPersons - 1)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="col-span-full bg-gray-200 text-center rounded-full">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {index + 2} Person
                      </h2>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor={`email-${index}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name={`persons[${index}].email`}
                          id={`email-${index}`}
                          autoComplete={`email-level${index + 1}`}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.persons[index].email}
                        />
                      </div>
                      {formik.touched.persons &&
                      formik.touched.persons[index] &&
                      formik.touched.persons[index].email &&
                      formik.errors.persons &&
                      formik.errors.persons[index] &&
                      formik.errors.persons[index].email ? (
                        <div className="text-red-500 font-medium text-sm">
                          {formik.errors.persons[index].email}
                        </div>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`cnic-${index}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        CNIC
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name={`persons[${index}].cnic`}
                          id={`cnic-${index}`}
                          autoComplete={`cnic-level${index + 1}`}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.persons[index].cnic}
                        />
                      </div>
                      {formik.touched.persons &&
                      formik.touched.persons[index] &&
                      formik.touched.persons[index].cnic &&
                      formik.errors.persons &&
                      formik.errors.persons[index] &&
                      formik.errors.persons[index].cnic ? (
                        <div className="text-red-500 font-medium text-sm">
                          {formik.errors.persons[index].cnic}
                        </div>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`number-${index}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name={`persons[${index}].number`}
                          id={`number-${index}`}
                          autoComplete={`number-level${index + 1}`}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.persons[index].number}
                        />
                      </div>
                      {formik.touched.persons &&
                      formik.touched.persons[index] &&
                      formik.touched.persons[index].number &&
                      formik.errors.persons &&
                      formik.errors.persons[index] &&
                      formik.errors.persons[index].number ? (
                        <div className="text-red-500 font-medium text-sm">
                          {formik.errors.persons[index].number}
                        </div>
                      ) : null}
                    </div>
                  </React.Fragment>
                ))}
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

export default BookingInfo;
