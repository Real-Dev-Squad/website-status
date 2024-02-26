export const AVAILABLE = 'AVAILABLE';
export const ASSIGNED = 'ASSIGNED';
export const IN_PROGRESS = 'IN_PROGRESS';
export const BACKLOG = 'BACKLOG';
export const BLOCKED = 'BLOCKED';
export const SMOKE_TESTING = 'SMOKE_TESTING';
export const COMPLETED = 'COMPLETED';
export const NEEDS_REVIEW = 'NEEDS_REVIEW';
export const IN_REVIEW = 'IN_REVIEW';
export const APPROVED = 'APPROVED';
export const MERGED = 'MERGED';
export const SANITY_CHECK = 'SANITY_CHECK';
export const REGRESSION_CHECK = 'REGRESSION_CHECK';
export const RELEASED = 'RELEASED';
export const VERIFIED = 'VERIFIED';
export const DONE = 'DONE';
// TODO: to change the value to UN_ASSIGNED after migration is done from backend
const UN_ASSIGNED = 'AVAILABLE';

export const STATUS_ORDER = [
    ASSIGNED,
    COMPLETED,
    BACKLOG,
    BLOCKED,
    AVAILABLE,
    IN_PROGRESS,
    SMOKE_TESTING,
    NEEDS_REVIEW,
    IN_REVIEW,
    APPROVED,
    MERGED,
    SANITY_CHECK,
    REGRESSION_CHECK,
    RELEASED,
    VERIFIED,
];

// TODO: Have only one single source of truth for task status and its derived values
export const BACKEND_TASK_STATUS = {
    UN_ASSIGNED,
    ASSIGNED,
    IN_PROGRESS,
    BACKLOG,
    BLOCKED,
    COMPLETED,
    NEEDS_REVIEW,
    IN_REVIEW,
    APPROVED,
    SMOKE_TESTING,
    SANITY_CHECK,
    REGRESSION_CHECK,
    MERGED,
    RELEASED,
    VERIFIED,
    DONE,
};

// https://github.com/Real-Dev-Squad/website-status/issues/1002
// TODO: convert this file into TS
// TODO: use all status as ENUMS
