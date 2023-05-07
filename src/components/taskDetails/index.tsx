import React, {
    ChangeEvent,
    FC,
    useEffect,
    useContext,
    useReducer,
    useRef,
    useState,
    ChangeEventHandler,
} from 'react';
import NavBar from '@/components/navBar/index';
import TaskContainer from './TaskContainer';
import Details from './Details';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import taskDetailsReducer from './taskDetails.reducer';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import updateTaskDetails from '@/helperFunctions/updateTaskDetails';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';
import task from '@/interfaces/task.type';
import classNames from './task-details.module.scss';
import { useGetTaskDetailsQuery } from '@/app/services/taskDetailsApi';

type ButtonProps = {
    buttonName: string;
    clickHandler: (value: any) => void;
    value?: boolean;
};
type TextAreaProps = {
    name: string;
    value: string;
    onChange: ChangeEventHandler;
};
function Button(props: ButtonProps) {
    const { buttonName, clickHandler, value } = props;

    return (
        <button
            type="button"
            className={classNames['button']}
            onClick={() => clickHandler(value)}
        >
            {buttonName}
        </button>
    );
}
function Textarea(props: TextAreaProps) {
    const { name, value, onChange } = props;
    return (
        <textarea
            className={classNames['textarea']}
            name={name}
            value={value}
            data-testid="edit button"
            onChange={onChange}
        />
    );
}

type Props = {
    url: string;
    taskID: string;
};

const initialState = {
    taskDetails: {} as task,
    editedDetails: {} as task,
};

const TaskDetails: FC<Props> = ({ url, taskID }) => {
    const isAuthorized = useContext(isUserAuthorizedContext);
    const [state, dispatch] = useReducer(taskDetailsReducer, initialState);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const initialDataRef = useRef<Record<string, any> | undefined>({});
    const { data, isError, isLoading } = useGetTaskDetailsQuery(taskID);
    const { SUCCESS, ERROR } = ToastTypes;
    const { taskDetails } = state;
    useEffect(() => {
        const fetchedData = data?.taskData;
        dispatch({ type: 'setTaskDetails', payload: fetchedData });
        initialDataRef.current = fetchedData;
    }, [isLoading, data]);

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const formData = {
            [event.target.name]: event.target.value,
        };
        dispatch({ type: 'setEditedDetails', payload: formData });
        dispatch({ type: 'setTaskDetails', payload: formData });
    }

    function onCancel() {
        setIsEditing(false);
        dispatch({ type: 'reset' });
        dispatch({ type: 'setTaskDetails', payload: initialDataRef.current });
    }

    async function onSave() {
        setIsEditing(false);
        try {
            const responseData = await updateTaskDetails(
                state.editedDetails,
                taskID
            );
            if (responseData.status === 204) {
                initialDataRef.current = state.taskDetails;
                toast(SUCCESS, 'Successfully saved');
            }
        } catch (err) {
            toast(ERROR, 'Could not save changes');
            dispatch({
                type: 'setTaskDetails',
                payload: initialDataRef.current,
            });
        }
        dispatch({ type: 'reset', payload: initialDataRef.current });
    }

    function renderLoadingComponent() {
        if (isLoading) {
            return <p className={classNames.textCenter}>Loading...</p>;
        }
        if (isError) {
            return (
                <p className={classNames.textCenter}>Something went wrong!</p>
            );
        }
    }

    const shouldRenderParentContainer = () =>
        !isLoading && !isError && taskDetails;

    return (
        <>
            <NavBar />
            {renderLoadingComponent()}
            {shouldRenderParentContainer() && (
                <div className={classNames.parentContainer}>
                    <div className={classNames.titleContainer}>
                        {isEditing ? (
                            <Textarea
                                name="title"
                                value={taskDetails?.title}
                                onChange={handleChange}
                            />
                        ) : (
                            <span
                                data-testid="task-title"
                                className={classNames.taskTitle}
                            >
                                {taskDetails?.title}
                            </span>
                        )}
                        {!isEditing ? (
                            isAuthorized && (
                                <Button
                                    buttonName="Edit"
                                    clickHandler={setIsEditing}
                                    value={true}
                                />
                            )
                        ) : (
                            <div className={classNames.editMode}>
                                <Button
                                    buttonName="Cancel"
                                    clickHandler={onCancel}
                                />
                                <Button
                                    buttonName="Save"
                                    clickHandler={onSave}
                                />
                            </div>
                        )}
                    </div>

                    <section className={classNames.detailsContainer}>
                        <section className={classNames.leftContainer}>
                            <TaskContainer title="Description" hasImg={false}>
                                {isEditing ? (
                                    <Textarea
                                        name="purpose"
                                        value={taskDetails?.purpose}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>
                                        {!taskDetails?.purpose
                                            ? 'No description available'
                                            : taskDetails?.purpose}
                                    </p>
                                )}
                            </TaskContainer>
                            <TaskContainer title="Details" hasImg={false}>
                                <div
                                    className={
                                        classNames['sub_details_grid_container']
                                    }
                                >
                                    <Details
                                        detailType={'Type'}
                                        value={taskDetails?.type}
                                    />
                                    <Details
                                        detailType={'Priority'}
                                        value={taskDetails?.priority}
                                    />
                                    <Details
                                        detailType={'Status'}
                                        value={taskDetails?.status}
                                    />
                                    <Details
                                        detailType={'Link'}
                                        value={taskDetails?.featureUrl}
                                    />
                                </div>
                            </TaskContainer>
                        </section>

                        <section className={classNames.rightContainer}>
                            <TaskContainer
                                src="/participant_logo.png"
                                title="Participants"
                                hasImg={true}
                            >
                                <Details
                                    detailType={'Assignee'}
                                    value={
                                        taskDetails?.type === 'feature'
                                            ? taskDetails?.assignee
                                            : taskDetails?.participants?.join(
                                                  ' , '
                                              )
                                    }
                                />
                                <Details
                                    detailType={'Reporter'}
                                    value={'Ankush'}
                                />
                            </TaskContainer>
                            <TaskContainer
                                src="/calendar-icon.png"
                                title="Dates"
                                hasImg={true}
                            >
                                <Details
                                    detailType={'StartedOn'}
                                    value={convertTimeStamp(
                                        taskDetails?.startedOn
                                    )}
                                />
                                <Details
                                    detailType={'EndsOn'}
                                    value={convertTimeStamp(
                                        taskDetails?.endsOn
                                    )}
                                />
                            </TaskContainer>
                        </section>
                    </section>
                </div>
            )}
        </>
    );
};

export default TaskDetails;
