import { COMPLETED, DONE, AVAILABLE, UNASSINGED } from '@/constants/constants';
export function getChangedStatusName(name: string) {
    if (name === COMPLETED) {
        return DONE;
    } else if (name === AVAILABLE) {
        return UNASSINGED;
    } else {
        return name.split('_').join(' ');
    }
}
