function formatDateTime(datetime) {
  const date = new Date(datetime);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  // Extract time components
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  // Format date as dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  // Format time as HH:mm:ss
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
}
export default formatDateTime;
