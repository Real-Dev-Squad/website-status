export default function convertDatetoYMD(timestamp: string) {
  const today = new Date();
  const idleSincedate = new Date(timestamp);
  const dateArray = idleSincedate.toISOString().split('-');
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const yy = parseInt(dateArray[0]);
  const mm = parseInt(dateArray[1]);
  const dd = parseInt(dateArray[2]);
  let years, months;
  // months
  months = month - mm;
  if (day < dd) {
    months = months - 1;
  }
  // years
  years = year - yy;
  if (month * 100 + day < mm * 100 + dd) {
    years = years - 1;
    months = months + 12;
  }
  // days
  const days = Math.floor(
    (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  return `${years} years , ${months} months , ${days} days`;
}
