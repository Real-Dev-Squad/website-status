type task = {
    id: string;
    title: string;
    purpose: string;
    featureUrl: string;
    type: string;
    links?: string[];
    endsOn: number;
    startedOn: string;
    createdBy: string;
    assignee?: string;
    percentCompleted: number;
    dependsOn?: string[];
    level?: 1 | 2 | 3 | 4 | 5;
    participants?: string[];
    completionAward: { dinero: number; neelam: number };
    lossRate: { dinero: number; neelam: number };
    isNoteworthy: boolean;
    github?: {
        issue: {
            html_url: string;
            status: string;
            assignee?: string; // optional
            id: number;
            closedAt?: string; // optional
            assigneeRdsInfo?: {
                // optional
                firstName?: string;
                lastName?: string;
                username?: string;
            };
        };
    };
    status: string; // Update the type of task status once this is addressed https://github.com/Real-Dev-Squad/website-status/issues/1002
    priority: string;
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
    BACKLOG = 'BACKLOG',
    BLOCKED = 'BLOCKED',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
    IN_REVIEW = 'IN_REVIEW',
    VERIFIED = 'VERIFIED',
    MERGED = 'MERGED',
    COMPLETED = 'COMPLETED',
    OVERDUE = 'OVERDUE',
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
    readOnly: boolean;
};

export default task;

export type GetAllTaskParamType = {
    status?: string;
    nextTasks?: string;
    prevTasks?: string;
    size?: number;
    assignee?: string;
    title?: string;
    dev?: boolean;
};

export type TabTasksData = {
    ALL: task[];
    IN_PROGRESS: task[];
    ASSIGNED: task[];
    AVAILABLE: task[];
    UNASSIGNED: task[];
    BACKLOG: task[];
    BLOCKED: task[];
    NEEDS_REVIEW: task[];
    IN_REVIEW: task[];
    VERIFIED: task[];
    MERGED: task[];
    COMPLETED: task[];
    OVERDUE: task[];
    DONE: task[];
};

export type CardTaskDetails = task & {
    assigningUser: string;
    savingDate: string;
    savingText: string;
};

export const depreciatedTaskStatus = ['AVAILABLE'];
export const newTaskStatus = ['UNASSIGNED', 'DONE'];

export type taskStatusUpdateHandleProp = {
    newStatus: string;
    newProgress?: number;
};

export type ExtensionDetailItem = {
    label: string;
    value: string;
    className?: string;
    testId: string;
};

export type ExtensionRequest = {
    reason: string;
    newEndsOn: number;
    title: string;
    taskId: string;
    oldEndsOn: number;
    status: string;
    requestNumber: number;
    id: string;
    timestamp: number;
    assignee: string;
    assigneeId: string;
    reviewedBy?: string;
    reviewedAt?: number;
};

export type ExtensionRequestsResponse = {
    message: string;
    allExtensionRequests: ExtensionRequest[];
};
