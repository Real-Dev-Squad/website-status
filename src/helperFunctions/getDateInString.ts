const getDateInString = (date: Date) => {
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const strDate = [year, month, day].join('-');
    return strDate;
};

export default getDateInString;
