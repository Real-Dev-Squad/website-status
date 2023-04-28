export type taskDetailsDataType = {
    id: string;
    isNoteworthy: boolean;
    lossRate: {
        dinero: number;
        neelam: number;
    };
    purpose: string;
    endsOn: number;
    title: string;
    status: string;
    assignee: string;
    links: string[];
    dependsOn: string[];
    percentCompleted: number;
    type: string;
    startedOn: number;
    featureUrl: string;
    completionAward: {
        neelam: number;
        dinero: number;
    };
};
