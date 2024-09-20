import { ChangeEventHandler } from 'react';
import task from './task.type';
export type taskDetailsDataType = {
    message?: string;
    taskData?: task;
    allExtensionRequests: [];
};

export type ButtonProps = {
    buttonName: string;
    clickHandler: (value: boolean) => void;
    value?: boolean;
    className?: string;
    disabled?: boolean;
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
    url?: string | null;
    isEditing?: boolean;
    setEditedTaskDetails?: React.Dispatch<React.SetStateAction<task>>;
};
export type DetailsContentProps = {
    color: string | undefined;
    isGitHubLink: boolean;
    value: string | undefined;
    gitHubIssueLink: string | undefined;
    isTimeDetail: boolean;
    formatDate: (timestamp: string | number | undefined) => string;
    tooltipActive: boolean;
    renderedValue: string;
    getRelativeTime: (timestamp: string | number | undefined) => string;
};
export type DependencyItem =
    | PromiseFulfilledResult<{
          title: string | undefined;
          id: string;
      }>
    | PromiseRejectedResult;
