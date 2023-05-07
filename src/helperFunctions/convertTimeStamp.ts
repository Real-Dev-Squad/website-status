const convertTimeStamp = (timeStamp: number) => {
    const dateTime = new Date(timeStamp*1000);
    return dateTime.toLocaleString();
};

export default convertTimeStamp;
