//Export function
export function getCurrentDate() {
  const today = new Date();
  return today.toLocaleDateString("en-EN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
