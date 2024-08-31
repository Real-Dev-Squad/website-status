import React, { ChangeEvent, FC, useState, useEffect, useRef } from 'react';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';
import styles from './task-details.module.scss';
import { useRouter } from 'next/router';
import {
    useGetExtensionRequestDetailsQuery,
    useGetTaskDetailsQuery,
    useUpdateTaskDetailsMutation,
} from '@/app/services/taskDetailsApi';
import useUserData from '@/hooks/useUserData';
import Layout from '@/components/Layout';
import { TaskHeader } from './TaskHeader';
import { TaskDescription } from './TaskDescription';
import { TaskDetailsSection } from './TaskDetailsSection';
import { TaskParticipants } from './TaskParticipants';
import { TaskDates } from './TaskDates';
import { TaskDependencies } from './TaskDependencies';
import { TaskProgress } from './TaskProgress';
import TaskContainer from './TaskContainer';
import task, { taskStatusUpdateHandleProp } from '@/interfaces/task.type';
import { ProgressDetailsData } from '@/types/standup.type';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import {
    taskDetailsDataType,
    ButtonProps,
    TextAreaProps,
} from '@/interfaces/taskDetails.type';

export function Button(props: ButtonProps) {
    const { buttonName, clickHandler, value } = props;
    return (
        <button
            type="button"
            className={styles['button']}
            onClick={() => clickHandler(value ?? true)}
        >
            {buttonName}
        </button>
    );
}

export function Textarea(props: TextAreaProps) {
    const { name, value, onChange, testId, placeholder } = props;

    return (
        <textarea
            className={styles['textarea']}
            name={name}
            value={value}
            onChange={onChange}
            data-testid={testId}
            placeholder={placeholder}
        />
    );
}

type Props = {
    url?: string;
    taskID: string;
};

const TaskDetails: FC<Props> = ({ taskID }) => {
    const router = useRouter();
    const { isUserAuthorized } = useUserData();
    const [newEndOnDate, setNewEndOnDate] = useState('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { data, isError, isLoading, isFetching } =
        useGetTaskDetailsQuery(taskID);
    const { data: extensionRequests } =
        useGetExtensionRequestDetailsQuery(taskID);
    const isExtensionRequestPending = Boolean(
        extensionRequests?.allExtensionRequests.length
    );
    const taskDependencyIds: string[] = !isFetching
        ? data?.taskData?.dependsOn || []
        : [];
    const { SUCCESS, ERROR } = ToastTypes;

    const taskDetailsData: task = {
        ...(data?.taskData || {}),
        id: taskID,
    } as task;

    const [editedTaskDetails, setEditedTaskDetails] = useState<task>({
        ...(data?.taskData || {}),
        id: taskID,
    } as task);
    const [assigneeName, setAssigneeName] = useState<string>(
        data?.taskData?.assignee || ''
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
    const handleAssignment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssigneeName(e.target.value);
        setShowSuggestion(Boolean(e.target.value));
        setEditedTaskDetails((prev: any) => ({
            ...prev,
            assignee: e.target.value,
        }));
    };
    const handleAssigneSelect = async (userName: string) => {
        inputRef.current?.focus();
        setAssigneeName(userName);
        setShowSuggestion(false);
        setEditedTaskDetails((prev: any) => ({ ...prev, assignee: userName }));
    };
    const handleTaskStatusUpdate = ({
        newStatus,
        newProgress,
    }: taskStatusUpdateHandleProp) => {
        const payload: { status: string; percentCompleted?: number } = {
            status: newStatus,
        };
        if (newProgress !== undefined) {
            payload.percentCompleted = newProgress;
        }
        setEditedTaskDetails((prev: any) => ({
            ...prev,
            ...payload,
        }));
    };

    useEffect(() => {
        if (data?.taskData) {
            setEditedTaskDetails({
                ...data?.taskData,
                id: taskID,
            } as task);
            setAssigneeName(data?.taskData?.assignee || '');
        }
    }, [data]);

    const [updateTaskDetails] = useUpdateTaskDetailsMutation();

    function onCancel() {
        setIsEditing(false);
        setEditedTaskDetails(taskDetailsData);
        setNewEndOnDate('');
    }
    async function onSave() {
        setIsEditing(false);
        setNewEndOnDate('');
        const updatedFields: Partial<taskDetailsDataType['taskData']> = {};
        for (const key in editedTaskDetails) {
            if (
                taskDetailsData &&
                editedTaskDetails[
                    key as keyof taskDetailsDataType['taskData']
                ] !==
                    taskDetailsData[
                        key as keyof taskDetailsDataType['taskData']
                    ]
            ) {
                updatedFields[key as keyof taskDetailsDataType['taskData']] =
                    editedTaskDetails[
                        key as keyof taskDetailsDataType['taskData']
                    ];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            return;
        }

        await updateTaskDetails({
            editedDetails: updatedFields,
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

        setEditedTaskDetails((prevState: any) => ({
            ...prevState!,
            ...(prevState
                ? { [name]: name === 'dependsOn' ? [value] : value }
                : {}),
        }));
    }

    function renderLoadingComponent() {
        if (isLoading) {
            return <p className={styles.textCenter}>Loading...</p>;
        }
        if (isError) {
            return <p className={styles.textCenter}>Something went wrong!</p>;
        }
    }

    function getStartedOn(timestamp: string | undefined) {
        return timestamp ? convertTimeStamp(parseInt(timestamp, 10)) : 'N/A';
    }

    function getEndsOn(timestamp: number | undefined) {
        return timestamp ? convertTimeStamp(timestamp) : 'TBD';
    }

    const shouldRenderParentContainer = () => !isLoading && !isError && data;

    const { data: progressData } = useGetProgressDetailsQuery({
        taskId: taskID,
    });
    const taskProgress: ProgressDetailsData[] = progressData?.data || [];

    const handleBlurOfEndsOn = () => {
        const endsOn = new Date(`${newEndOnDate}`).getTime() / 1000;

        if (endsOn > 0) {
            setEditedTaskDetails((prev: any) => ({
                ...prev,
                endsOn,
            }));
        }
    };

    return (
        <Layout hideHeader={true}>
            {renderLoadingComponent()}
            {shouldRenderParentContainer() && (
                <div className={styles.parentContainer}>
                    <TaskHeader
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        onSave={onSave}
                        onCancel={onCancel}
                        title={editedTaskDetails?.title}
                        handleChange={handleChange}
                        isUserAuthorized={isUserAuthorized}
                    />

                    <section className={styles.detailsContainer}>
                        <section className={styles.leftContainer}>
                            <TaskContainer title="Description" hasImg={false}>
                                <TaskDescription
                                    isEditing={isEditing}
                                    purpose={editedTaskDetails?.purpose}
                                    handleChange={handleChange}
                                />
                            </TaskContainer>
                            <TaskContainer title="Details" hasImg={false}>
                                <TaskDetailsSection
                                    isEditing={isEditing}
                                    type={editedTaskDetails?.type}
                                    priority={editedTaskDetails?.priority}
                                    status={editedTaskDetails?.status}
                                    link={
                                        editedTaskDetails?.github?.issue
                                            ?.html_url || ''
                                    }
                                    percentCompleted={
                                        editedTaskDetails?.percentCompleted
                                    }
                                    handleTaskStatusUpdate={
                                        handleTaskStatusUpdate
                                    }
                                    taskDetailsData={taskDetailsData}
                                />
                            </TaskContainer>
                            <TaskProgress taskProgress={taskProgress} />
                            <TaskContainer
                                title="Task Dependencies"
                                hasImg={false}
                            >
                                <TaskDependencies
                                    isEditing={isEditing}
                                    taskDependencyIds={taskDependencyIds}
                                    setEditedTaskDetails={setEditedTaskDetails}
                                />
                            </TaskContainer>
                        </section>

                        <section className={styles.rightContainer}>
                            <TaskContainer
                                src="/participant_logo.png"
                                title="Participants"
                                hasImg={true}
                            >
                                <TaskParticipants
                                    isEditing={isEditing}
                                    isUserAuthorized={isUserAuthorized}
                                    assigneeName={assigneeName}
                                    showSuggestion={showSuggestion}
                                    handleAssignment={handleAssignment}
                                    handleAssigneSelect={handleAssigneSelect}
                                    setShowSuggestion={setShowSuggestion}
                                />
                            </TaskContainer>
                            <TaskContainer
                                src="/calendar-icon.png"
                                title="Dates"
                                hasImg={true}
                            >
                                <TaskDates
                                    isEditing={isEditing}
                                    isUserAuthorized={isUserAuthorized}
                                    startedOn={getStartedOn(
                                        taskDetailsData?.startedOn
                                    )}
                                    endsOn={taskDetailsData?.endsOn || 0}
                                    newEndOnDate={newEndOnDate}
                                    setNewEndOnDate={setNewEndOnDate}
                                    handleBlurOfEndsOn={handleBlurOfEndsOn}
                                    isExtensionRequestPending={
                                        isExtensionRequestPending
                                    }
                                    taskId={taskDetailsData.id}
                                />
                            </TaskContainer>
                            <TaskContainer
                                hasImg={false}
                                title="Update Progress"
                            >
                                <button
                                    data-testid="update-progress-button"
                                    className={styles.button}
                                    onClick={() =>
                                        router.push(
                                            `/progress/${taskID}?dev=true`
                                        )
                                    }
                                >
                                    Update Progress
                                </button>
                            </TaskContainer>
                        </section>
                    </section>
                </div>
            )}
        </Layout>
    );
};

export default TaskDetails;
