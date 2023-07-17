import React, {
    ChangeEvent,
    FC,
    useEffect,
    useContext,
    useRef,
    useState,
} from 'react';
import TaskContainer from './TaskContainer';
import Details from './Details';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';
import classNames from './task-details.module.scss';
import { useRouter } from 'next/router';
import {
    useGetTaskDetailsQuery,
    useUpdateTaskDetailsMutation,
} from '@/app/services/taskDetailsApi';

import useUserData from '@/hooks/useUserData';
import { ButtonProps, TextAreaProps } from '@/interfaces/taskDetails.type';
import Layout from '@/components/Layout';
import TaskDependency from '@/components/taskDetails/taskDependency';
import { parseDependencyValue } from '@/utils/parseDependency';

export function Button(props: ButtonProps) {
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
export function Textarea(props: TextAreaProps) {
    const { name, value, onChange, testId } = props;

    return (
        <textarea
            className={classNames['textarea']}
            name={name}
            value={value}
            onChange={onChange}
            data-testid={testId}
        />
    );
}

type Props = {
    url?: string;
    taskID: string;
};

const TaskDetails: FC<Props> = ({ taskID }) => {
    const router = useRouter();

    const { data: userData, isUserAuthorized } = useUserData();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const initialDataRef = useRef<Record<string, any> | undefined>({});
    const { data, isError, isLoading, isFetching } =
        useGetTaskDetailsQuery(taskID);

    const taskDependencyIds: string[] = !isFetching
        ? data?.taskData?.dependsOn || []
        : [];

    const { SUCCESS, ERROR } = ToastTypes;

    const taskDetailsData = data?.taskData;
    const [taskDetails, setTaskDetails] = useState<
        Record<string, any> | undefined
    >({});
    const [editedDetails, setEditedDetails] = useState({});

    const [updateTaskDetails] = useUpdateTaskDetailsMutation();
    const [updatedDependencies, setUpdatedDependencies] = useState<string[]>(
        taskDetails?.dependsOn || []
    );

    useEffect(() => {
        const fetchedData = data?.taskData;
        setTaskDetails(taskDetailsData);
        initialDataRef.current = fetchedData;
    }, [isLoading, data]);

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        if (name === 'dependsOn') {
            const updatedDependencies = parseDependencyValue(value);
            setUpdatedDependencies(updatedDependencies);
        }
        const formData = {
            ...taskDetails,
            [event.target.name]: event.target.value,
            dependsOn: [...updatedDependencies],
        };
        setEditedDetails(formData);
        setTaskDetails(formData);
    }

    function onCancel() {
        setIsEditing(false);
        setTaskDetails(initialDataRef.current);
    }

    async function onSave() {
        setIsEditing(false);
        updateTaskDetails({
            editedDetails,
            taskID,
        })
            .unwrap()
            .then(() => toast(SUCCESS, 'Successfully saved'))
            .catch((error) => toast(ERROR, error.data.message));
        setTaskDetails(initialDataRef.current);
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
    const { dev } = router.query;
    const shouldRenderParentContainer = () => !isLoading && !isError && data;
    return (
        <Layout hideHeader={true}>
            {renderLoadingComponent()}
            {shouldRenderParentContainer() && (
                <div className={classNames.parentContainer}>
                    <div className={classNames.titleContainer}>
                        {isEditing ? (
                            <Textarea
                                name="title"
                                value={taskDetails?.title}
                                onChange={handleChange}
                                testId="title-textarea"
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
                            isUserAuthorized && (
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
                                        testId="purpose-textarea"
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
                            {dev && (
                                <TaskContainer
                                    title="Task DependsOn"
                                    hasImg={false}
                                >
                                    <TaskDependency
                                        taskDependencyIds={taskDependencyIds}
                                        isEditing={isEditing}
                                        updatedDependencies={
                                            updatedDependencies
                                        }
                                        handleChange={handleChange}
                                    />
                                </TaskContainer>
                            )}
                        </section>

                        <section className={classNames.rightContainer}>
                            <button
                                onClick={() =>
                                    router.push(`/progress/${taskID}?dev=true`)
                                }
                            >
                                Update Progress
                            </button>
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
        </Layout>
    );
};

export default TaskDetails;
