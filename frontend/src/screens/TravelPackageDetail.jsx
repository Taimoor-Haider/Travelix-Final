import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SimpleMap from "../components/SimpleMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faLocationDot,
  faMapLocationDot,
  faStopwatch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "../ui/Slider";
import { useNavigate } from "react-router-dom";
import Gallery from "../components/Gallery";
import Stat from "../ui/Stat";
import BadgeList from "../ui/BadgeList";
import EmenitiesModal from "../components/EmenitiesModal";
import SelectElement from "../ui/SelectElement";
import PackageForm from "../ui/PackageForm";
import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import FeedBackSection from "../ui/FeedBackSection";
import {
  fetchTour,
  tourDetailSelector,
} from "../features/tour/tourDetailSlice";
import { getProfileURL } from "../utils/image-utils";
function TravelPackageDetail() {
  // const [tourPackage, setTourPackage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [showGallery, setShowGallery] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, tourPackage, error } = useSelector(tourDetailSelector);
  const dispatch = useDispatch();
  //Emenities

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tourPackage?.amenities);
  }, [tourPackage]);

  useEffect(() => {
    dispatch(fetchTour(id));
  }, [dispatch, id]);

  if (error) {
    return <Message color="failure">{error.response.data}</Message>;
  }

  if (!loading && !tourPackage) {
    return <Message color="failure">Tour package not found.</Message>;
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.response?.data}</Message>
      ) : (
        tourPackage && (
          <div>
            <section className="mt-4  px-4 py-8 -mx-8">
              <button
                className="btn btn-neutral btn-wide"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </button>
              <div>
                <div className="flex sm:items-center items-start sm:flex-row gap-5 flex-col sm:justify-between">
                  <h1 className="text-2xl font-bold">{tourPackage.place}</h1>
                  <div></div>
                </div>
                {/* Image Gallery */}
                <div className="h-[30rem] py-[1.8rem] relative">
                  <Slider images={tourPackage?.images} />
                  <div className="top-btn">
                    <Gallery tourPackage={tourPackage} />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-5">
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="text-2xl">
                        <FontAwesomeIcon icon={faMapLocationDot} />
                        <span className="mx-2 font-medium">
                          {tourPackage.title}
                        </span>
                      </div>

                      <div className="text-2xl">
                        <FontAwesomeIcon icon={faStopwatch} />
                        <span className="mx-2 text-xl text-gray-500">
                          {tourPackage.duration}
                        </span>
                      </div>
                      <Stat
                        text_1={"Rating"}
                        stat_1={tourPackage.rating.toFixed(2)}
                        text_2={"Reviews"}
                        stat_2={tourPackage.noOfReviews}
                      />
                    </div>

                    <div className="flex gap-5 justify-start items-start border p-3">
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={getProfileURL(tourPackage.tourOwner?.image)}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-[1.4rem] font-medium">
                          {tourPackage.travelClubName}
                        </p>
                        <p className="text-[1.2rem] font-normal">
                          {tourPackage.tourOwner?.name}
                        </p>
                        <p className="font-light text-[0.9rem] tracking-widest">
                          {tourPackage.tourOwner?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-start w-[80%] m-auto">
                    <BadgeList list={list?.slice(0, 7)} />
                    {list?.length > 7 && (
                      <EmenitiesModal
                        items={tourPackage?.amenities}
                        BtnText={`See all ${list.length} emenities`}
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr] my-[4.4rem] grid-rows-[30rem]">
                  <div className="justify-self-center p-5 overflow-auto ">
                    <h1 className="text-xl font-semibold border-b-4 border-[#dee2e6] py-3 mb-4">
                      Tour Description
                    </h1>
                    {tourPackage.description}
                  </div>
                  <div className="p-2">
                    <form
                      className=" h-full w-[80%] m-auto p-5 flex flex-col gap-5 box-shadow-1 bg-[#dee2e6]"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <PackageForm tourPackage={tourPackage} />
                    </form>
                  </div>
                </div>
                <section className="section-feedback">
                  {tourPackage.feedbacks.map(
                    ({ user, rating, comment, createdAt, response }, index) => (
                      <FeedBackSection
                        key={index}
                        user={user}
                        rating={rating}
                        comment={comment}
                        createdAt={createdAt}
                        response={response?.comment}
                        responseCreatedAt={response?.createdAt}
                      />
                    )
                  )}
                </section>
              </div>
              <section className="my-10 min-h-[30rem] w-full m-auto">
                <SimpleMap />
              </section>
            </section>
          </div>
        )
      )}
    </div>
  );
}
{
  /* <SimpleMap title={tourPackage.title} /> */
}
export default TravelPackageDetail;
