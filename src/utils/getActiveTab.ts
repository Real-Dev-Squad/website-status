import { Tab } from '@/interfaces/task.type';

export const getActiveTab = (section?: string): Tab => {
    switch (section) {
        case 'assigned':
            return Tab.ASSIGNED;
        case 'available':
            return Tab.AVAILABLE;
        case 'needs_review':
            return Tab.NEEDS_REVIEW;
        case 'in_review':
            return Tab.IN_REVIEW;
        case 'verified':
            return Tab.VERIFIED;
        case 'merged':
            return Tab.MERGED;
        case 'completed':
            return Tab.COMPLETED;
        default:
            return Tab.IN_PROGRESS;
    }
};
