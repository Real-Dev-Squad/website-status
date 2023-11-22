import { AVAILABLE, UNASSIGNED } from '@/constants/constants';
export function getChangedStatusName(name: string) {
    if (name === AVAILABLE) {
        return UNASSIGNED;
    } else {
        return name.split('_').join(' ');
    }
}
