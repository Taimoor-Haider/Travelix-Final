import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import SuccessLogo from "../../src/assets/successPaymentAnim.json";
import FailureLogo from "../../src/assets/failedPaymentAnim.json";
import { useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { tourBookingSelector } from "../features/tour/tourbookingSlice";
import { vehicleDetailSlector } from "../features/vehicle/vehicleDetailSlice";
import { hotelDetailSelector } from "../features/hotel/hotelDetailSlice";
function PaymentSuccess() {
  const { userInfo } = useSelector(loginSelector);
  const { success: tourBookingSuccess } = useSelector(tourBookingSelector);
  const { success: vehicleDetailSuccess } = useSelector(vehicleDetailSlector);
  const { success: hotelDetailSuccess } = useSelector(hotelDetailSelector);

  const success =
    tourBookingSuccess || vehicleDetailSuccess || hotelDetailSuccess;
  // Define options for success and failure animations
  const navigate = useNavigate();
  const successOptions = {
    animationData: SuccessLogo,
    loop: true,
  };

  const failureOptions = {
    animationData: FailureLogo,
    loop: true,
  };

  // Determine which animation to show based on the flag
  console.log("In payment Success" + success);

  const { View } = useLottie(success ? successOptions : successOptions);
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        navigate(`/bookings/${userInfo._id}`);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [success, navigate]);
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      {View}
    </div>
  );
}

export default PaymentSuccess;
