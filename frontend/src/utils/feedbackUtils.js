// feedbackUtils.js
export const scheduleFeedbackPrompt = (booking) => {
  const { endDate, entityID } = booking;
  const currentTime = Date.now();
  const timeUntilPrompt = endDate - currentTime;
  if (timeUntilPrompt > 0) {
    setTimeout(() => {
      // Display feedback form when scheduled time arrives
      // You can show a modal or navigate to a feedback page
      console.log("Time to show feedback prompt for booking:", booking);
      // For example:
      // showFeedbackModal(entityID);
      // navigateToFeedbackPage(entityID);
    }, timeUntilPrompt);
  }
};
