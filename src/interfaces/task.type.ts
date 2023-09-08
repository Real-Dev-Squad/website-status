import award from '@/interfaces/award.type';

type task = {
    id: string;
    title: string;
    purpose: string;
    featureUrl: string;
    type: string;
    links: string[];
    endsOn: number;
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

export type TasksResponseType = {
    message?: string;
    tasks: task[];
    next?: string;
    prev?: string;
};

export type ProgressSliderProps = {
    value: number;
    debounceSlider: (debounceTimeOut: number) => void;
    handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
};

export type updateTaskDetails = Partial<Omit<task, 'startedOn'>> & {
    startedOn?: number;
    percentCompleted?: number;
    endsOn?: number;
    status?: string;
    assignee?: string;
};

export type ProgressBarProps = {
    progress: boolean;
    progressValue: number;
    percentCompleted: number;
    startedOn: string;
    endsOn: string;
    handleProgressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    debounceSlider: (debounceTimeOut: number) => void;
    isLoading: boolean;
};

export type ProgressIndicatorProps = {
    percentCompleted: number;
    startedOn: string;
    endsOn: string;
};

export type handleProgressTextProps = {
    handleProgressUpdate: () => void;
    isLoading: boolean;
};

enum Tab {
    ALL = 'ALL',
    IN_PROGRESS = 'IN_PROGRESS',
    ASSIGNED = 'ASSIGNED',
    AVAILABLE = 'AVAILABLE',
    UNASSIGNED = 'UNASSIGNED',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    IN_REVIEW = 'IN_REVIEW',
    VERIFIED = 'VERIFIED',
    MERGED = 'MERGED',
    COMPLETED = 'COMPLETED',
    DONE = 'DONE',
}

const TABS = Object.values(Tab);

export { TABS, Tab };

export type TaskRequestPayload = {
    task: updateTaskDetails;
    id: string;
};

export type CardProps = {
    content: task;
    shouldEdit: boolean;
    onContentChange?: (changeId: string, changeObject: object) => void;
};

export type ProgressContainerProps = {
    content: task;
};

export default task;

export type GetAllTaskParamType = {
    status?: string;
    nextTasks?: string;
    prevTasks?: string;
    size?: number;
    assignee?: string;
    title?: string;
};

export type TabTasksData = {
    ALL: task[];
    IN_PROGRESS: task[];
    ASSIGNED: task[];
    UNASSIGNED: task[];
    AVAILABLE: task[];
    NEEDS_REVIEW: task[];
    IN_REVIEW: task[];
    VERIFIED: task[];
    MERGED: task[];
    COMPLETED: task[];
    DONE: task[];
};

export type CardTaskDetails = task & {
    assigningUser: string;
    savingDate: string;
    savingText: string;
};

export const depreciatedTaskStatus = ['AVAILABLE', 'COMPLETED'];
export const newTaskStatus = ['UNASSIGNED', 'DONE'];
