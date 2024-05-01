export function formatDate(dateString) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}
export function convertTimestamp(timestamp) {
  const dateObj = new Date(timestamp);

  // Adjust time for UTC timezone
  const utcYear = dateObj.getUTCFullYear();
  const utcMonth = dateObj.getUTCMonth();
  const utcDate = dateObj.getUTCDate();
  const utcHours = dateObj.getUTCHours();
  const utcMinutes = dateObj.getUTCMinutes();
  
  // Get day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[dateObj.getDay()];

  // Get month and day
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();

  // Format time
  let hours = utcHours;
  const minutes = utcMinutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Handle noon and midnight
  const formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;

  // Construct formatted date string
  const formattedDate = dayOfWeek + ', ' + month + ' ' + day;
  
  return { date: formattedDate, time: formattedTime };
}


export const ucFirst = (stringVal) =>{
  return  (stringVal.charAt(0).toUpperCase() + stringVal.slice(1))
}