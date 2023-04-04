const getDateInString = (date: Date) => {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");
	const strDate = [year, month, day].join("-");
	return strDate;
};

export default getDateInString;
