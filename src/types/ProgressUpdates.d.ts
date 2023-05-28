export interface reducerAction {
    type: string;
    value: string;
}

export interface progressStates {
    progress: string;
    plan: string;
    blockers: string;
}

interface dispatchParams {
    type: string;
    value: string;
}

export interface inputPropsTypes {
    name: string;
    question: string;
    value: string;
    onChange: (dispatchParams) => void;
}

interface question {
    id: number;
    name: string;
    question: string;
}

export interface formProps {
    questions: Array<question>;
}

export interface fetchedProgress {
    id: string;
    date: number;
}

export interface taskProgressResponse {
    message: string;
    data: Array<fetchedProgress>;
}
