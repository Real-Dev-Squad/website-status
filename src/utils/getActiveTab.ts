import { Tab } from '@/interfaces/task.type';

export const getActiveTab = (section?: string): Tab => {
    switch (section) {
        case 'assigned':
            return Tab.ASSIGNED;
        case 'available':
            return Tab.AVAILABLE;
        case 'needs-review':
            return Tab.NEEDS_REVIEW;
        case 'in-review':
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

export const tabToUrlParams = (section: Tab): string => {
    switch (section) {
        case Tab.NEEDS_REVIEW:
            return 'needs-review';
        case Tab.IN_REVIEW:
            return 'in-review';
        case Tab.IN_PROGRESS:
            return 'in-progress';
        default:
            return section.toLowerCase();
    }
};
