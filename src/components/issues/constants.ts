export enum REQUEST_TABS {
    TASK_CREATION,
    CREATION_REQUEST,
}

export type TaskData = {
    assignee?: string;
    endsOn?: number;
    startedOn?: number;
    status?: string;
};

export type TaskRequestData = {
    startedOn: number | string;
    endsOn: number | string;
    description: string | undefined;
};
