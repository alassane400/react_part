function getdate() {
  const now = new Date(Date.now());

// Array of days in French
const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// Get the day of the week in French
const dayOfWeek = daysOfWeek[now.getDay()];

// Format the date as dd/mm/YY
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const year = String(now.getFullYear());

// Combine the parts
const formattedDate = `${dayOfWeek}, ${day}/${month}/${year}`;
return formattedDate;
}
export default getdate
