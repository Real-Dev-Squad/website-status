const convertTimeStamp = (timeStamp: string) => {
    const dateTime = new Date(parseInt(timeStamp));
    return dateTime.toLocaleString();
};

export default convertTimeStamp;
