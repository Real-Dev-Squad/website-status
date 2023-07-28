import moment from 'moment';

function inputParser(input: string) {
    const parsedDate = moment(new Date(parseInt(input, 10) * 1000));
    return parsedDate;
}

const getPercentageOfDaysLeft = (startedOn: string, endsOn: string): number => {
    const startDate = inputParser(startedOn);
    const endDate = inputParser(endsOn);

    /**
     * It provides us with total days that are there for the the project and
     * number of days left
     */
    const totalDays = endDate.diff(startDate, 'days');
    const daysLeft = endDate.diff(new Date(), 'days');

    /**
     * It provides the percentage of days left
     */

    const percentageOfDaysLeft = (daysLeft / totalDays) * 100;
    return percentageOfDaysLeft;
};

export default getPercentageOfDaysLeft;
