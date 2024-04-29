export function formatDate(dateString) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}
export const ucFirst = (stringVal) =>{
  return  (stringVal.charAt(0).toUpperCase() + stringVal.slice(1))
}