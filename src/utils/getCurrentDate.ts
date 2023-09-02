import { challengesApi } from '@/app/services/challengesApi';
import { DATEFORMAT } from '@/constants/constants';
import moment from 'moment';

/**
 * this getCurrentDate() function can be used when you have
 * to display certain form or something based on specific time
 * like standup form should be visible only after 6am so
 * then we can use this function to check if time for current date is
 * before 6am or after 6am.
 */

export function getCurrentDate(time: number): string {
    const now = moment();
    console.log('now', now);
    const hour = now.hours();
    console.log('hour', hour);
    console.log('time', time);
    console.log('inside function');
    if (hour < time) {
        console.log('inside if statement');
        now.subtract(1, 'day');
    }
    return now.format(DATEFORMAT);
}
