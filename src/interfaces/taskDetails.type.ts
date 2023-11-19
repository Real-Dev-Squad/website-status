import { ChangeEvent, ChangeEventHandler } from 'react';
import task from './task.type';
export type taskDetailsDataType = {
    message?: string;
    taskData?: task;
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
    placeholder: string;
};

export type TaskDependencyProps = {
    taskDependencyIds: string[];
    isEditing?: boolean;
    setEditedTaskDetails: React.Dispatch<React.SetStateAction<task>>;
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
