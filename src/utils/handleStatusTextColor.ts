import { TASK_STATUS_MAPING } from '@/constants/constants';

const handleStatusTextColor = (status: any): string => {
    if (status === TASK_STATUS_MAPING.COMPLETED) return 'Green';
    if (status === TASK_STATUS_MAPING.BLOCKED) return 'Red';
    return 'Orange';
};

export default handleStatusTextColor;
