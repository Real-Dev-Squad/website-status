export type standupUpdateType = {
    type: string;
    completed: string;
    planned: string;
    blockers: string;
};

// export type Standup = {
//     handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     yesterdayDate: string;
//     buttonDisable: boolean;
//     completed: string;
//     planned: string;
//     blockers: string;
// };

export type InputProps = {
    // id: string;
    placeholder: string;
    name: string;
    value: string;
    dataTestId: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
