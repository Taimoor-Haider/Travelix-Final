import React, { useEffect, useRef, useState } from "react";
import "./homeStyles.css";
// import Link from "react-router-dom"
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import HotelCard from "../components/HotelCard";
import VehicleCard from "../components/Vehic;leCard";
import CardComponentTour from "../components/CardComponentTour";

import PaymentIcon from "../assets/icons/payment.svg";
import CarIcon from "../assets/icons/car.svg";
import DestinationIcon from "../assets/icons/destination.svg";
import tripSectionImage from "../assets/images/tripSection (1).jpg";
import newsLtterImage from "../assets/images/tripSection (2).jpg";

import heroImage from "../assets/images/travelMain.png";
import BlueUnderline from "../assets/icons/underlineBlue.svg";
// import { ReactComponent as GradientUnderline } from "../assets/icons/underlineGradient.svg";

// IMpoer for testimonials
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import qouteIcon from "../assets/icons/right-quote (2).png";
import user1 from "../assets/images/user (4).jpg";
import user2 from "../assets/images/user (4).jpg";
import user3 from "../assets/images/user (4).jpg";
import user4 from "../assets/images/user (4).jpg";
import user5 from "../assets/images/user (4).jpg";
import user6 from "../assets/images/user (4).jpg";
import user7 from "../assets/images/user (4).jpg";
import user8 from "../assets/images/user (4).jpg";

//   COMPONENTS
// CARD
import iconBg from "../assets/icons/icon-bg.svg";
import iconBgHover from "../assets/icons/icon-bg-hover.svg";
import { useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="homeServicesCard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-wrapper">
        <img
          src={isHovered ? iconBg : iconBgHover}
          alt="Background"
          className="icon-bg"
        />
      </div>
      {props.svg}

      {/* <hotelIcon /> */}
      {/* <img className="cardIconsImg" src={hotelIcon} /> */}
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};

// Components End

const MainHomeScreen = () => {
  const hotelIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 32 32"
    >
      <path
        fill="#3c698b"
        d="M9.5 15A1.5 1.5 0 1 1 8 16.5A1.5 1.5 0 0 1 9.5 15m0-2a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 9.5 13"
      ></path>
      <path
        fill="#3c698b"
        d="M25 14h-8a2 2 0 0 0-2 2v6H4V10.6l12-6.46l12.53 6.74l.94-1.76l-13-7a1 1 0 0 0-.94 0l-13 7A1 1 0 0 0 2 10v20h2v-6h24v6h2V19a5 5 0 0 0-5-5m-8 8v-6h8a3 3 0 0 1 3 3v3Z"
      ></path>
    </svg>
  );

  const carIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 256 256"
    >
      <g fill="#3c698b">
        <path
          d="M184 184h40v24a8 8 0 0 1-8 8h-24a8 8 0 0 1-8-8ZM32 208a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8v-24H32ZM194.11 52.75A8 8 0 0 0 186.8 48H69.2a8 8 0 0 0-7.31 4.75L32 120h192Z"
          opacity={0.2}
        ></path>
        <path d="M240 112h-10.8l-27.78-62.5A16 16 0 0 0 186.8 40H69.2a16 16 0 0 0-14.62 9.5L26.8 112H16a8 8 0 0 0 0 16h8v80a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-16h96v16a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-80h8a8 8 0 0 0 0-16M69.2 56h117.6l24.89 56H44.31ZM64 208H40v-16h24Zm128 0v-16h24v16Zm24-32H40v-48h176ZM56 152a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16H64a8 8 0 0 1-8-8m112 0a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8"></path>
      </g>
    </svg>
  );

  const travelClubIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 48 48"
    >
      <g fill="#3c698b">
        <path d="M24 6c-4.5 0-7 1.2-7 1.2V12l-3.529 3.529c-.593.593-.236 1.588.6 1.648c2.017.143 5.434.323 9.929.323c2.206 0 4.152-.043 5.8-.104h-.017a6 6 0 1 1-11.567 0c-.74-.027-1.42-.058-2.036-.09a8 8 0 1 0 15.64 0a112.94 112.94 0 0 0 2.109-.13c.836-.06 1.193-1.054.6-1.647L30.999 12V7.2S28.5 6 24 6"></path>
        <path
          fillRule="evenodd"
          d="m24.288 28.042l6.542 1.947l5.607-3.816A1 1 0 0 1 38 27v5h-2v-3.11l-4 2.722V40c0 .768.289 1.47.764 2H15.236c.475-.53.764-1.232.764-2v-8.465l-4-2.666V32h-2v-5a1 1 0 0 1 1.555-.832l5.696 3.797l6.46-1.923A.979.979 0 0 1 24 28c.083 0 .166.01.247.031l.008.002a.892.892 0 0 1 .033.01M25 30.341l5 1.488V40h-5zm-7 1.488l5-1.488V40h-5z"
          clipRule="evenodd"
        ></path>
        <path d="M37 34a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h5v-5a3 3 0 0 0-3-3zM9 34a3 3 0 0 0-3 3v5h5a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3z"></path>
      </g>
    </svg>
  );

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filteredReview, setFilteredReview] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const { userInfo } = useSelector(loginSelector);
  //Fetch Hotels
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        // Fetch hotels from the API
        const response = await fetch(
          "https://travelix-backend-v2.vercel.app/api/hotels"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Hotels");
        }
        const data = await response.json();
        setHotels(data); // Set the fetched hotels in the state
        console.log("Hotel:", data);
      } catch (error) {
        setError(error); // Set error if there's any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchVehicles = async () => {
      setLoading(true);
      try {
        // Fetch hotels from the API
        const response = await fetch(
          "https://travelix-backend-v2.vercel.app/api/vehicle"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Vehicles");
        }
        const data = await response.json();
        setVehicles(data); // Set the fetched hotels in the state
        console.log("Vehicles:", data);
      } catch (error) {
        setError(error); // Set error if there's any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchTours = async () => {
      setLoading(true);
      try {
        // Fetch hotels from the API
        const response = await fetch(
          "https://travelix-backend-v2.vercel.app/api/tours"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Tours");
        }
        const data = await response.json();
        setTours(data); // Set the fetched hotels in the state
        console.log("Tours:", data);
      } catch (error) {
        setError(error); // Set error if there's any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchReview = async () => {
      try {
        const response = await fetch(
          "https://travelix-backend-v2.vercel.app/api/reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setReviews(data);
        console.log("Reviews: ", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Set error if there's any
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchHotels(); // Call the fetchVehicles function when the component mounts
    fetchVehicles(); // Call the fetchVehicles function when the component mounts
    fetchTours(); // Call the fetchVehicles function when the component mounts
    fetchReview(); // Call the fetchVehicles function when the component mounts
  }, []);

  useEffect(() => {
    // Sort hotels by rating in descending order
    const sortedHotels = [...hotels].sort((a, b) => b.rating - a.rating);
    const sortedVehicles = [...vehicles].sort((a, b) => b.rating - a.rating);
    const sortedTours = [...tours].sort((a, b) => b.rating - a.rating);

    const filteredLocalReviews = reviews.filter(
      (review) => review.user !== null
    );
    if (filteredLocalReviews.length > 8) {
      const sortedUserReviews = [...filteredLocalReviews].sort(
        (a, b) => b.rating - a.rating
      );
      const top8Reviews = sortedUserReviews.slice(0, 8);
      setFilteredReview(top8Reviews);
    } else {
      // If user's reviews are less than or equal to 8, use all user's reviews
      setFilteredReview(filteredLocalReviews);
    }
    // Take the top 3 hotels
    const top3Hotels = sortedHotels.slice(0, 3);
    const top3Vehicles = sortedVehicles.slice(0, 3);
    const top3Tours = sortedTours.slice(0, 3);

    setFilteredHotels(top3Hotels);
    setFilteredTours(top3Tours);
    setFilteredVehicles(top3Vehicles);

    console.log("Filtered Reviews : ", filteredLocalReviews);
  }, [hotels, tours, vehicles, reviews]);

  return (
    <>
      {/* =======>  HeroSection <======== */}

      <div className="MainSection">
        <div class="custom-shape-divider-bottom-1709491773">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 598.97 114.72 1200 0z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="HeroSection">
          <div className="TitleContainer">
            <h1 className="mainTitle">
              Travel, <span className="underlineEnjoy">enjoy</span> and live a
              new and full life
            </h1>
          </div>
          <div className="HeroImageContainer">
            <img src={heroImage} alt="Travelling Image" className="HeroImage" />
          </div>
        </div>
      </div>

      {/* ==== End of Hero Section */}

      <h1 className="Main-Tagline">We Offer Best Services</h1>
      <div className="main-card-contanier">
        <Link to={"/hotel"}>
          <Card
            title="Hotel Booking"
            desc="Boook Hotels Seamlessly using our platform, Embark on your new Journey"
            svg={hotelIcon}
          />
        </Link>

        <Link to={"/vehicle"}>
          <Card
            title="Car Booking"
            desc="Boook Hotels Seamlessly using our platform, Embark on your new Journey"
            svg={carIcon}
          />
        </Link>
        <Link to={"/tour"}>
          <Card
            title="Tours"
            desc="Boook Hotels Seamlessly using our platform, Embark on your new Journey"
            svg={travelClubIcon}
          />
        </Link>
      </div>

      <section className="trip-steps-section">
        <div className="trip-headings">
          <div className="trip-step-title">
            <h1>
              Book Your Next <span>Trip</span> In 3 Easy Steps
            </h1>
          </div>
          <div className="trip-steps-container">
            <div className="home-steps">
              {/* <DestinationIcon /> */}
              <img src={DestinationIcon} />
              <div className="steps-subheadings">
                <h3>Choose Destination</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>
            <div className="home-steps">
              {/* <PaymentIcon /> */}
              <img src={PaymentIcon} />
              <div className="steps-subheadings">
                <h3>Make Payment</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>
            <div className="home-steps">
              {/* <CarIcon /> */}
              <img src={CarIcon} />
              <div className="steps-subheadings">
                <h3>Reach on Time</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="steps-image">
          <img src={tripSectionImage} />
        </div>
      </section>

      <section className="trending-container">
        <div className="heading-Ucontainer">
          <h1 className="section-heading">Top Rated Hotels</h1>
          <img src={BlueUnderline} />
        </div>

        <div className="trending">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : hotels.length > 0 ? (
            <div className="flex flex-wrap justify-start items-center gap-[2rem]">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <>{!loading && <Message color="info">No Hotels found!</Message>}</>
          )}
        </div>
      </section>

      <section className="trending-container">
        <div className="heading-Ucontainer">
          <h1 className="section-heading">Top Rated Cars</h1>
          {/* <BlueUnderline /> */}
          <img src={BlueUnderline} />
        </div>

        <div className="trending">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : vehicles.length > 0 ? (
            <div className="flex flex-wrap justify-start items-center gap-[2rem]">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <>
              {!loading && <Message color="info">No Vehicles found!</Message>}
            </>
          )}
        </div>
      </section>

      {!userInfo?.isTourOwner && (
        <section className="trending-container">
          <div className="heading-Ucontainer">
            <h1 className="section-heading">Top Rated Tours</h1>
            {/* <BlueUnderline /> */}
            <img src={BlueUnderline} />
          </div>

          <div className="trending">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error.message}</Message>
            ) : tours.length > 0 ? (
              <div className="flex flex-wrap justify-start items-center gap-[2rem]">
                {filteredTours.map((tour) => (
                  <CardComponentTour key={tour._id} tour={tour} />
                ))}
              </div>
            ) : (
              <>{!loading && <Message color="info">No Tours found!</Message>}</>
            )}
          </div>
        </section>
      )}

      <section className="testimonial-section">
        <div className="heading-Ucontainer">
          <h1 className="section-heading">Testimonials </h1>
          {/* <BlueUnderline /> */}
          <img src={BlueUnderline} />
        </div>
        {/* <TestimonialCarousel /> */}

        {/* TESTIMONAIL CROUSAL */}

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            // autoplay: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          loop={true}
        >
          {filteredReview.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonialBox">
                <div className="qoute">
                  <img src={qouteIcon} />
                </div>
                <div className="content">
                  <p>{review.comment}</p>
                  <div className="details">
                    <div className="imgBx">
                      <img
                        src={`${review.user.image}`}
                        alt={review.user.name}
                      />
                    </div>
                    <h3>
                      {review.user.name}
                      <br />
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>Lorem aliquip ex ea connodo consequat.</p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user1} />
                  </div>
                  <h3>
                    Hamdan Kalyar<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user2} />
                  </div>
                  <h3>
                    Jahanzaib Iqbal<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user3} />
                  </div>
                  <h3>
                    Taimoor Haider<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user4} />
                  </div>
                  <h3>
                    Zoahib AHmad<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user5} />
                  </div>
                  <h3>
                    Zunain Ali<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user6} />
                  </div>
                  <h3>
                    Ali Ansari<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user7} />
                  </div>
                  <h3>
                    Kashif Qureshi<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonialBox">
              <div className="qoute">
                <img src={qouteIcon} />
              </div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea connodo consequat.
                </p>
                <div className="details">
                  <div className="imgBx">
                    <img src={user8} />
                  </div>
                  <h3>
                    Haroon Rasheed<br></br>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>

        {/* Testimonial End */}
      </section>

      <div className="heading-Ucontainer newsLetterHeading">
        <h1 className="section-heading ">Subscribe To News Letter </h1>
        {/* <BlueUnderline /> */}
        <img src={BlueUnderline} />
      </div>
      <section className="newsLetter-section">
        <div className="NLettersection-container">
          <div className="NLetterimage-container">
            <img src={newsLtterImage} alt="House and pool" />
          </div>
          <div className="form-container">
            <h2>Get special offers, and more from travelworld</h2>
            <p>Rreceive exclusive deals on travel, vacations, and more.</p>
            <form className="newsForm">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainHomeScreen;
