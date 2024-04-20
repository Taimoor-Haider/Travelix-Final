export default function calculateNumberOfDays(startDate, endDate) {
  // Convert both dates to milliseconds
  const startMilliseconds = new Date(startDate).getTime();
  const endMilliseconds = new Date(endDate).getTime();

  // Calculate the difference in milliseconds
  const differenceMilliseconds = endMilliseconds - startMilliseconds;

  // Convert milliseconds to days
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const numberOfDays = Math.floor(differenceMilliseconds / millisecondsInDay);

  return numberOfDays;
}

//   // Example usage:
//   const startDate = '2024-03-25';
//   const endDate = '2024-04-01';
//   const numberOfDays = calculateNumberOfDays(startDate, endDate);
//   console.log(numberOfDays); // Output: 7
