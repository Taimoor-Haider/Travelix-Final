const formatDateStr = (datestr) => {
  const date = new Date(datestr);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

  // Format into YYYY-DD-MM
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  return formattedDate; // Output: 2024-10-04
};

export default formatDateStr;
