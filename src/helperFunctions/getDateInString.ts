const getDateInString = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const strDate = [year, month, day].join('-');
    return strDate;
};

export default getDateInString;