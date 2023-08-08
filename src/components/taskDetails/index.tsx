import React, {
    ChangeEvent,
    FC,
    useState,
    ReactElement,
    useEffect,
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
import {
    ButtonProps,
    TextAreaProps,
    taskDetailsDataType,
} from '@/interfaces/taskDetails.type';
import Layout from '@/components/Layout';
import TaskDependency from '@/components/taskDetails/taskDependency';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { ProgressDetailsData } from '@/types/standup.type';
import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';
import { useAddOrUpdateMutation } from '@/app/services/taskRequestApi';

export function Button(props: ButtonProps) {
    const { buttonName, clickHandler, value } = props;
    return (
        <button
            type="button"
            className={classNames['button']}
            onClick={() => clickHandler(value ?? true)}
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
    const { query } = router;
    const isDevModeEnabled = query.dev === 'true' ? true : false;

    const { isUserAuthorized, data: userData } = useUserData();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { data, isError, isLoading, isFetching } =
        useGetTaskDetailsQuery(taskID);

    const taskDependencyIds: string[] = !isFetching
        ? data?.taskData?.dependsOn || []
        : [];
    const { SUCCESS, ERROR } = ToastTypes;

    const taskDetailsData: taskDetailsDataType['taskData'] = data?.taskData;

    const [editedTaskDetails, setEditedTaskDetails] = useState<
        taskDetailsDataType['taskData'] | undefined
    >(data?.taskData);

    const [addOrUpdateTaskRequest, taskRequestUpdateStatus] =
        useAddOrUpdateMutation();

    useEffect(() => {
        if (data?.taskData) {
            setEditedTaskDetails(data.taskData);
        }
    }, [data]);

    const [updateTaskDetails] = useUpdateTaskDetailsMutation();

    function onCancel() {
        setIsEditing(false);
        setEditedTaskDetails(taskDetailsData);
    }
    async function onSave() {
        setIsEditing(false);
        await updateTaskDetails({
            editedDetails: editedTaskDetails,
            taskID,
        })
            .unwrap()
            .then(() => toast(SUCCESS, 'Successfully saved'))
            .catch((error) => toast(ERROR, error.data.message));
    }

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setEditedTaskDetails((prevState) => ({
            ...prevState!,
            ...(prevState
                ? { [name]: name === 'dependsOn' ? [value] : value }
                : {}),
        }));
    }

    function taskRequestHandle() {
        if (!userData) {
            return;
        }
        addOrUpdateTaskRequest({ taskId: taskID, userId: userData.id })
            .unwrap()
            .then(() => toast(SUCCESS, 'Successfully requested for task'))
            .catch((error) => toast(ERROR, error.data.message));
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

    const shouldRenderParentContainer = () => !isLoading && !isError && data;

    const { data: taskProgress } = useGetProgressDetailsQuery({
        taskId: taskID,
    });
    const taskProgressArray: Array<ReactElement> = [];
    if (taskProgress) {
        if (taskProgress.data.length > 0) {
            taskProgress.data.forEach((data: ProgressDetailsData) => {
                taskProgressArray.push(
                    <>
                        <li>
                            {getDateFromTimestamp(data.date)} : {data.completed}
                        </li>
                        <br />
                    </>
                );
            });
        }
    }

    return (
        <Layout hideHeader={true}>
            {renderLoadingComponent()}
            {shouldRenderParentContainer() && (
                <div className={classNames.parentContainer}>
                    <div className={classNames.titleContainer}>
                        {isEditing ? (
                            <Textarea
                                name="title"
                                value={editedTaskDetails?.title}
                                onChange={handleChange}
                                testId="title-textarea"
                            />
                        ) : (
                            <span
                                data-testid="task-title"
                                className={classNames.taskTitle}
                            >
                                {taskDetailsData?.title}
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
                                        value={editedTaskDetails?.purpose}
                                        onChange={handleChange}
                                        testId="purpose-textarea"
                                    />
                                ) : (
                                    <p>
                                        {!taskDetailsData?.purpose
                                            ? 'No description available'
                                            : taskDetailsData?.purpose}
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
                                        value={taskDetailsData?.type}
                                    />
                                    <Details
                                        detailType={'Priority'}
                                        value={taskDetailsData?.priority}
                                    />
                                    <Details
                                        detailType={'Status'}
                                        value={taskDetailsData?.status}
                                    />
                                    <Details
                                        detailType={'Link'}
                                        value={taskDetailsData?.featureUrl}
                                    />
                                </div>
                            </TaskContainer>
                            {isDevModeEnabled && (
                                <>
                                    <TaskContainer
                                        title="Task Dependencies"
                                        hasImg={false}
                                    >
                                        <TaskDependency
                                            taskDependencyIds={
                                                taskDependencyIds
                                            }
                                            isEditing={isEditing}
                                            updatedDependencies={
                                                taskDetailsData?.dependsOn || []
                                            }
                                            handleChange={handleChange}
                                            setEditedTaskDetails={
                                                setEditedTaskDetails
                                            }
                                        />
                                    </TaskContainer>
                                    <TaskContainer
                                        title="Progress Updates"
                                        hasImg={false}
                                    >
                                        {taskProgressArray.length > 0 ? (
                                            <div> {taskProgressArray} </div>
                                        ) : (
                                            'No Progress found'
                                        )}
                                    </TaskContainer>
                                </>
                            )}
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
                                        taskDetailsData?.type === 'feature'
                                            ? taskDetailsData?.assignee
                                            : taskDetailsData?.participants?.join(
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
                                    detailType={'Started On'}
                                    value={convertTimeStamp(
                                        taskDetailsData?.startedOn ?? 0
                                    )}
                                />
                                <Details
                                    detailType={'Ends On'}
                                    value={convertTimeStamp(
                                        taskDetailsData?.endsOn ?? 0
                                    )}
                                />
                            </TaskContainer>
                            {isDevModeEnabled && (
                                <>
                                    <TaskContainer
                                        hasImg={false}
                                        title="Request for task"
                                    >
                                        <button
                                            className={classNames.button}
                                            onClick={taskRequestHandle}
                                        >
                                            Request for task
                                        </button>
                                    </TaskContainer>
                                    <TaskContainer
                                        hasImg={false}
                                        title="Update Progress"
                                    >
                                        <button
                                            className={classNames.button}
                                            onClick={() =>
                                                router.push(
                                                    `/progress/${taskID}?dev=true`
                                                )
                                            }
                                        >
                                            Update Progress
                                        </button>
                                    </TaskContainer>
                                </>
                            )}
                        </section>
                    </section>
                </div>
            )}
        </Layout>
    );
};

export default TaskDetails;
