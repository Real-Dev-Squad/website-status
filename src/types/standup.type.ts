import { userDataType } from '@/interfaces/user.type';

export type standupUpdateType = {
    type: string;
    completed: string;
    planned: string;
    blockers: string;
};

export type InputProps = {
    placeholder: string;
    name: string;
    value: string;
    labelValue: string;
    htmlFor: string;
    inputId: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ProgressDetailsData = {
    blockers: string;
    completed: string;
    createdAt: number;
    date: number;
    id: string;
    planned: string;
    type: string;
    userData?: userDataType;
    taskId?: string;
};

export type progressDetails = {
    data: Array<ProgressDetailsData>;
    message: string;
    count: number;
};

type Section = {
    title: string;
    inputs: string[];
};

export type SectionComponentProps = {
    section: Section;
    sectionIndex: number;
    onInputChange: (
        sectionIndex: number,
        inputIndex: number,
        value: string
    ) => void;
    onAddField: (sectionIndex: number) => void;
    onRemoveField: (sectionIndex: number) => void;
};
