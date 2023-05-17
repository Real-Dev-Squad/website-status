export type standupUpdateType = {
    type: string;
    completed: string;
    planned: string;
    blockers: string;
};

export interface Standup {
    handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    yesterdayDate: string;
    buttonDisable: boolean;
    completed: string;
    planned: string;
    blockers: string;
}
