import award from '@/interfaces/award.type';
import { TASK_STATUS } from './task-status';

type task = {
    id: string;
    title: string;
    purpose: string;
    featureUrl: string;
    type: string;
    links: string[];
    endsOn: string;
    startedOn: string;
    status: TASK_STATUS;
    assignee?: string;
    percentCompleted: number;
    dependsOn: string[];
    participants?: string[];
    completionAward: award;
    lossRate: award;
    isNoteworthy: boolean;
    createdBy: string;
};

enum Tab {
    ASSIGNED = 'ASSIGNED',
    COMPLETED = 'COMPLETED',
    AVAILABLE = 'AVAILABLE',
    IN_PROGRESS = 'IN_PROGRESS',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    IN_REVIEW = 'IN_REVIEW',
    VERIFIED = 'VERIFIED',
    MERGED = 'MERGED',
}

const TABS = Object.values(Tab);

export { TABS, Tab };

export default task;
