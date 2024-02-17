/*const convertTimeStamp = (timeStamp: number) => {
    const dateTime = new Date(timeStamp * 1000);
    return dateTime.toLocaleString();
};

export default convertTimeStamp;
*/

const convertTimeStamp = (timeStamp: number): string => {
    const dateTime = new Date(timeStamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return dateTime.toLocaleDateString('en-US', options);
};

export default convertTimeStamp;
