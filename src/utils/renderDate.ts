const moment = require('moment');
// dates are in number and string format.
function dateFromNow(date: string | number): string {
  if (date === null) return 'Invalid date';
  const dateInNumber = Number(date);
  const formatDate = isNaN(dateInNumber) ?  new Date(date) : new Date(dateInNumber * 1000);
  return moment(formatDate).fromNow();
}

export default dateFromNow;