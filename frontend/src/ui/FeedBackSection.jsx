import React from "react";
import { Avatar, Blockquote, Rating } from "flowbite-react";

function FeedBackSection({
  user,
  comment,
  rating,
  createdAt,
  response = "",
  responseCreatedAt = "",
  isAdmin,
  handleResponse,
  feedbackId,
}) {
  return (
    <figure className="max-w-screen-md overflow-auto">
      <div className="mb-4 flex items-center">
        <Rating size="md">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <Rating.Star key={index} />
          ))}
        </Rating>
      </div>
      <Blockquote>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white ">
          {`"${comment}"`}
        </p>
      </Blockquote>

      <figcaption className="mt-6 flex items-center space-x-3">
        <Avatar
          rounded
          size="xs"
          img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="profile picture"
        />
        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">
            {user?.name}
          </cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
            {new Date(createdAt).toISOString().split("T")[0]}
          </cite>
        </div>
      </figcaption>
      {response && (
        <div className="bg-gray-100 p-4 mt-4 ml-4">
          {/* <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Response:
          </p> */}
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {`"${response}"`}
          </p>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
            {new Date(responseCreatedAt).toISOString().split("T")[0]}
          </cite>
        </div>
      )}
      {isAdmin && (
        <button
          className="btn btn-active max-w-xs mx-auto mt-4"
          onClick={() => handleResponse(feedbackId)}
        >
          Respond
        </button>
      )}
    </figure>
  );
}

export default FeedBackSection;
