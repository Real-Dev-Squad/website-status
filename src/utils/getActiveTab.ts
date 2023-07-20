import { Tab } from '@/interfaces/task.type';

export const getActiveTab = (section?: string): Tab => {
    if (section === 'assigned') {
        return Tab.ASSIGNED;
    } else if (section === 'available') {
        return Tab.AVAILABLE;
    } else if (section === 'needs_review') {
        return Tab.NEEDS_REVIEW;
    } else if (section === 'in_review') {
        return Tab.IN_REVIEW;
    } else if (section === 'verified') {
        return Tab.VERIFIED;
    } else if (section === 'merged') {
        return Tab.MERGED;
    } else if (section === 'completed') {
        return Tab.COMPLETED;
    } else {
        return Tab.IN_PROGRESS;
    }
};
