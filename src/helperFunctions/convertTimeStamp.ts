const convertTimeStamp = (timeStamp: number): string => {
    const dateTime = new Date(timeStamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return dateTime.toLocaleDateString('en-US', options);
};

export default convertTimeStamp;
