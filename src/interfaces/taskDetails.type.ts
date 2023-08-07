import { ChangeEvent, ChangeEventHandler } from 'react';
export type taskDetailsDataType = {
    message?: string;
    taskData?: {
        assignee: string;
        completionAward: { dinero: number; neelam: number };
        createdBy: string;
        endsOn: number;
        purpose: string;
        isNoteworthy: boolean;
        dependsOn: string[];
        lossRate: { dinero: number; neelam: number };
        percentCompleted: number;
        priority: string;
        startedOn: number;
        status: string;
        title: string;
        type: string;
        participants: string[];
        featureUrl: string;
    };
};

export type ButtonProps = {
    buttonName: string;
    clickHandler: (value: boolean) => void;
    value?: boolean;
};
export type TextAreaProps = {
    name: string;
    value: string | undefined;
    onChange: ChangeEventHandler;
    testId: string;
};

export type TaskDependencyProps = {
    taskDependencyIds: string[];
    isEditing?: boolean;
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setEditedTaskDetails: React.Dispatch<
        React.SetStateAction<taskDetailsDataType['taskData'] | undefined>
    >;
};
export type DependencyListProps = {
    taskDependencyIds: string[];
};
export type TaskDetailsProps = {
    detailType: string;
    value?: string;
};
export type DependencyItem =
    | PromiseFulfilledResult<{
          title: string | undefined;
          id: string;
      }>
    | PromiseRejectedResult;
