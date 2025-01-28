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
import TaskContainer from './TaskContainer';
import task, { taskStatusUpdateHandleProp } from '@/interfaces/task.type';
import { ProgressDetailsData } from '@/types/standup.type';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import Progress from '../ProgressCard';
import TaskDependency from '@/components/taskDetails/taskDependency';
import TaskDetailsShimmer from '@/components/Loaders/taskDetailsShimmer';
import {
    taskDetailsDataType,
    ButtonProps,
    TextAreaProps,
} from '@/interfaces/taskDetails.type';
import TaskUpdateModal from './TaskUpdateModal';

export function Button(props: ButtonProps) {
    const { buttonName, clickHandler, value, disabled } = props;
    return (
        <button
            type="button"
            className={styles['button']}
            onClick={() => clickHandler(value ?? true)}
            disabled={disabled}
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
    const isDev = router.query.dev === 'true';

    const { isUserAuthorized } = useUserData();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { data, isError, isLoading, isFetching, refetch } =
        useGetTaskDetailsQuery(taskID);
    const { data: extensionRequests } =
        useGetExtensionRequestDetailsQuery(taskID);
    const { data: progressData, refetch: refetchProgress } =
        useGetProgressDetailsQuery({
            taskId: taskID,
            dev: isDev,
        });

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
        setEditedTaskDetails((prev) => ({
            ...prev,
            assignee: e.target.value,
        }));
    };

    const handleAssigneSelect = async (userName: string) => {
        inputRef.current?.focus();
        setAssigneeName(userName);
        setShowSuggestion(false);
        setEditedTaskDetails((prev) => ({ ...prev, assignee: userName }));
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
        setEditedTaskDetails((prev) => ({
            ...prev,
            ...payload,
        }));
    };

    const handleProgressUpdate = async () => {
        await Promise.all([refetch(), refetchProgress()]);
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
    }
    async function onSave() {
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

        setLoading(true);
        try {
            await updateTaskDetails({
                editedDetails: updatedFields,
                taskID,
            }).unwrap();
            toast(SUCCESS, 'Successfully saved');
        } catch (error) {
            const errorMessage =
                error && typeof error === 'object' && 'data' in error
                    ? (error.data as { message?: string }).message ||
                      'An error occurred while saving'
                    : 'An error occurred while saving';
            toast(ERROR, errorMessage);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
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

    function renderLoadingComponent() {
        if (isLoading) {
            if (isDev) {
                return (
                    <div className={styles.taskDetailsContainer}>
                        {<TaskDetailsShimmer />}
                    </div>
                );
            } else {
                return <p className={styles.textCenter}>Loading...</p>;
            }
        }
        if (isError) {
            return <p className={styles.textCenter}>Something went wrong!</p>;
        }
    }

    function getStartedOn(timestamp: string | undefined) {
        return timestamp ? convertTimeStamp(parseInt(timestamp, 10)) : 'N/A';
    }

    const shouldRenderParentContainer = () => !isLoading && !isError && data;

    const taskProgress: ProgressDetailsData[] = progressData?.data || [];

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
                        loading={loading}
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
                            <Progress taskProgress={taskProgress} />
                            <TaskContainer
                                title="Task Dependencies"
                                hasImg={false}
                            >
                                <TaskDependency
                                    taskDependencyIds={taskDependencyIds}
                                    isEditing={isEditing}
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
                                    startedOn={getStartedOn(
                                        taskDetailsData?.startedOn
                                    )}
                                    endsOn={taskDetailsData?.endsOn || 0}
                                    setEditedTaskDetails={setEditedTaskDetails}
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
                                <TaskUpdateModal
                                    isOpen={isOpen}
                                    styles={styles}
                                    taskDetailsData={taskDetailsData}
                                    editedTaskDetails={editedTaskDetails}
                                    setIsOpen={setIsOpen}
                                    onUpdateSuccess={handleProgressUpdate}
                                />
                                <button
                                    data-testid="update-progress-button-dev"
                                    className={styles.button}
                                    onClick={() => setIsOpen(true)}
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
