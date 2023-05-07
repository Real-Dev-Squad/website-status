export type taskDetailsDataType = {
    message?: string;
    taskData?: {
        assignee: string;
        completionAward: { dinero: number; neelam: number };
        createdBy: string;
        endsOn: number;
        isNoteworthy: boolean;
        lossRate: { dinero: number; neelam: number };
        percentCompleted: number;
        priority: string;
        startedOn: number;
        status: string;
        title: string;
        type: string;
    };
};
