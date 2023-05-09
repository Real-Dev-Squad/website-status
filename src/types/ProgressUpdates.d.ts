export interface reducerAction {
    type: string;
    value: string;
}

export interface progressStates {
    progress: string;
    plan: string;
    blockers: string;
}

export interface inputPropsTypes {
    name: string;
    question: string;
    value: string;
    onChange: any;
}
