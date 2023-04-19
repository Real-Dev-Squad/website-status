const convertTimeStamp = (timeStamp: number) => {
    const dateTime = new Date(timeStamp*1000);
    console.log(typeof timeStamp);
    return dateTime.toLocaleString();
};

export default convertTimeStamp;
