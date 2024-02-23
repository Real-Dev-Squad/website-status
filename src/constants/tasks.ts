export const EMPTY_TASKS_DATA = {
    ALL: [],
    IN_PROGRESS: [],
    ASSIGNED: [],
    AVAILABLE: [],
    UNASSIGNED: [],
    BACKLOG: [],
    BLOCKED: [],
    NEEDS_REVIEW: [],
    IN_REVIEW: [],
    VERIFIED: [],
    MERGED: [],
    COMPLETED: [],
    OVERDUE: [],
    DONE: [],
};

export const TASK_REQUEST_TYPES = {
    CREATION: 'CREATION',
    ASSIGNMENT: 'ASSIGNMENT',
};

export const TASK_PRIORITY_COLORS: Record<string, string> = {
    HIGH: '#D82E2F',
    MEDIUM: '#F4BE2C',
    LOW: '#1FAA59',
};
