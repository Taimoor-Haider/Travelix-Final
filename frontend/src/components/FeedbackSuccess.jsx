import React from "react";
import { useLottie } from "lottie-react";
import FeedbackSucces from "../../src/assets/feedbackSuccess.json";

function FeedbackSuccess() {
  const { View } = useLottie(FeedbackSucces);

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      {View}
    </div>
  );
}

export default FeedbackSuccess;
