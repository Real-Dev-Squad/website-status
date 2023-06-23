import award from '@/interfaces/award.type';

type task = {
    id: string;
    title: string;
    purpose: string;
    featureUrl: string;
    type: string;
    links: string[];
    endsOn: string;
    startedOn: string;
    status: string;
    assignee?: string;
    percentCompleted: number;
    dependsOn: string[];
    participants?: string[];
    completionAward: award;
    lossRate: award;
    isNoteworthy: boolean;
    createdBy: string;
    github?: {
        issue: {
            assignee?: string;
            status: string;
            id: number;
            closedAt?: string;
            assigneeRdsInfo?: {
                firstName: string | null | undefined;
                lastName: string | null | undefined;
                username: string;
            };
        };
    };
};

enum Tab {
    IN_PROGRESS = 'IN_PROGRESS',
    ASSIGNED = 'ASSIGNED',
    AVAILABLE = 'AVAILABLE',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    IN_REVIEW = 'IN_REVIEW',
    VERIFIED = 'VERIFIED',
    MERGED = 'MERGED',
    COMPLETED = 'COMPLETED',
}

type tasksCountObject = {
    ASSIGNED: number;
    COMPLETED: number;
    AVAILABLE: number;
    IN_PROGRESS: number;
    NEEDS_REVIEW: number;
    IN_REVIEW: number;
    VERIFIED: number;
    MERGED: number;
};

const TABS = Object.values(Tab);

export { TABS, Tab };

export type { tasksCountObject };

export default task;
