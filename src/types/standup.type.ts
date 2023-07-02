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
    dataTestId: string;
    labelValue: string;
    htmlFor: string;
    inputId: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type userDetails = {
    data: [
        {
            blockers: string;
            completed: string;
            createdAt: number;
            date: number;
            id: string;
            planned: string;
            type: string;
            userId: string;
        }
    ];
    message: string;
    count: number;
};
