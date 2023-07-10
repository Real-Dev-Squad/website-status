import moment from 'moment';

const getPercentageOfDaysLeft = (startedOn: string, endsOn: string): number => {
    const startDate = moment(new Date(parseInt(startedOn, 10) * 1000));
    const endDate = moment(new Date(parseInt(endsOn, 10) * 1000));

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
