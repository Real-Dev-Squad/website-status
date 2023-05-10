import task from '@/interfaces/task.type';

interface State {
    taskDetails: Record<string, any> | task;
    editedDetails: Record<string, any> | task;
}

interface Action {
    type: string;
    payload?: Record<string, any>;
}

const taskDetailsReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'setTaskDetails':
            return {
                ...state,
                taskDetails: { ...state.taskDetails, ...action.payload },
            };
        case 'setEditedDetails':
            return {
                ...state,
                editedDetails: { ...state.editedDetails, ...action.payload },
            };
        case 'reset':
            return { ...state, taskDetails: { ...action.payload } };
        default:
            return state;
    }
};

export default taskDetailsReducer;
