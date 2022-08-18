const moment = require('moment');
function dateFromNow(date: string | number): string {
  if (date === null) return 'Invalid date';
  // dates are in number and string format in database.
  const dateInNumber = Number(date);
  const formatDate = isNaN(dateInNumber) ?  new Date(date) : new Date(dateInNumber * 1000);
  return moment(formatDate).fromNow();
}

export default dateFromNow;