import { FC, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import fetch from '@/helperFunctions/fetch';
import { IssueCardProps } from '@/interfaces/issueProps.type';
import { TASKS_URL } from '../../constants/url';
import useUserData from '@/hooks/useUserData';
import { useRouter } from 'next/router';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { TASK_REQUEST_TYPES } from '@/constants/tasks';
import { FEATURE } from '@/constants/task-type';
import { AVAILABLE } from '@/constants/task-status';
import { TaskData, TaskRequestData } from '@/components/issues/constants';
import { DEFAULT_TASK_PRIORITY } from '@/constants/constants';
import TaskManagementModal from './TaskManagementModal';
import { useAddOrUpdateMutation } from '@/app/services/taskRequestApi';
const { SUCCESS, ERROR } = ToastTypes;

const Card: FC<IssueCardProps> = ({ issue }) => {
    const date = new Date(issue.created_at).toDateString();
    const [taskExists, setTaskExists] = useState(issue.taskExists ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const devMode = router.query.dev === 'true' ? true : false;
    const { data: userData, isUserAuthorized } = useUserData();
    const [taskId, setTaskId] = useState(issue.taskId);
    const [requestId, setRequestId] = useState<string>();
    const [assignee, setAssignee] = useState<string | undefined>();
    const [updateTask] = useUpdateTaskMutation();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [addOrUpdateTaskRequest] = useAddOrUpdateMutation();
    const isTaskButtonDisabled = isLoading || (!isUserAuthorized && taskExists);

    const toggle = () => {
        setIsTaskModalOpen(!isTaskModalOpen);
    };
    const getIssueInfo = () => {
        const issueInfo: any = {
            status: issue.state,
            id: issue.id,
            html_url: issue.html_url,
        };

        if (issue.assignee) {
            issueInfo.assignee = issue.assignee.login;
        }

        return issueInfo;
    };

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const url = TASKS_URL;
            const data = {
                title: issue.title,
                type: 'feature',
                status: 'AVAILABLE',
                percentCompleted: 0,
                priority: 'TBD',
                github: {
                    issue: getIssueInfo(),
                },
            };

            const { requestPromise } = fetch({
                url,
                method: 'post',
                data,
            });
            const response = await requestPromise;
            setTaskId(response.data.task.id);
            toast(SUCCESS, 'Added the task');
            setTaskExists(true);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            if ('response' in error) {
                toast(ERROR, error.response.data.message);
                return;
            }
            toast(ERROR, error.message);
        }
    };

    const handleUpdateTask = async (taskData: TaskData, taskId: string) => {
        try {
            await updateTask({
                task: taskData,
                id: taskId,
            }).unwrap();
            toast(SUCCESS, 'Task updated successfully.');
            setAssignee(taskData.assignee);
            toggle();
        } catch (error: any) {
            toast(ERROR, error.data.message);
        }
    };

    const handleCreateTaskRequest = async (data: TaskRequestData) => {
        const requestData = {
            externalIssueUrl: issue.url,
            externalIssueHtmlUrl: issue.html_url,
            userId: userData?.id,
            requestType: TASK_REQUEST_TYPES.CREATION,
            proposedStartDate: data.startedOn,
            proposedDeadline: data.endsOn,
            description: data.description,
        };
        if (!requestData.description) delete requestData.description;
        try {
            const response = await addOrUpdateTaskRequest(requestData).unwrap();
            setRequestId(response.data.id);
            toast(SUCCESS, response.message);
        } catch (error: any) {
            toast(ERROR, error.data.message);
        }
    };

    const handleCreateTask = async (taskData: TaskData) => {
        try {
            if (!taskData.assignee) delete taskData.assignee;
            const url = TASKS_URL;
            const data = {
                title: issue.title,
                type: FEATURE,
                status: taskData.status || AVAILABLE,
                percentCompleted: 0,
                priority: DEFAULT_TASK_PRIORITY,
                github: {
                    issue: getIssueInfo(),
                },
                ...taskData,
            };
            const { requestPromise } = fetch({
                url,
                method: 'post',
                data,
            });
            const response = await requestPromise;
            setTaskId(response.data.task.id);
            toast(SUCCESS, 'Task created successfully');
            setTaskExists(true);
            toggle();
        } catch (error: any) {
            setIsLoading(false);
            if ('response' in error) {
                toast(ERROR, error.response.data.message);
                return;
            }
            toast(ERROR, error.message);
        }
    };
    return (
        <div className={styles.card}>
            <div className={styles.card_details}>
                <div className={styles.card__top__details__button}>
                    <h2 className={styles.card__title}>
                        <MarkdownRenderer content={issue.title} />
                    </h2>
                </div>
                <p className={styles.card__issue_created__by}>
                    Opened on {date} by
                    <a
                        href={issue.user.html_url ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {issue.user.login}
                    </a>
                </p>
                <div className="card__body">
                    <MarkdownRenderer
                        className={styles.card__body}
                        content={issue.body ?? 'No description provided.'}
                    />
                </div>
                {issue.assignee && (
                    <p className={styles.card__assignee}>
                        Assigned to:
                        <a
                            href={issue.assignee?.html_url ?? '#'}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {issue.assignee?.login}
                        </a>
                    </p>
                )}
                <p className={styles.card__link}>
                    Issue Link :{' '}
                    <a href={issue.html_url} target="_blank" rel="noreferrer">
                        {issue.html_url}
                    </a>{' '}
                </p>

                <div className={styles.label__block}>
                    {issue.labels.map(
                        (label: {
                            id: number | null | undefined;
                            name: string | null | undefined;
                        }) => (
                            <button className={styles.label} key={label.id}>
                                {label.name}
                            </button>
                        )
                    )}
                </div>
            </div>
            <div className={styles.actions}>
                {devMode ? (
                    <>
                        <button
                            className={styles.card__top__button}
                            disabled={isTaskButtonDisabled}
                            onClick={toggle}
                        >
                            {isUserAuthorized
                                ? 'Convert to Task'
                                : 'Request as Task'}
                        </button>
                        <TaskManagementModal
                            isUserAuthorized={isUserAuthorized}
                            isOpen={isTaskModalOpen}
                            toggle={toggle}
                            assignee={assignee}
                            taskId={taskId}
                            requestId={requestId}
                            handleCreateTask={handleCreateTask}
                            handleCreateTaskRequest={handleCreateTaskRequest}
                            handleUpdateTask={handleUpdateTask}
                        />
                    </>
                ) : (
                    <>
                        <button
                            className={styles.card__top__button}
                            disabled={
                                taskExists || isLoading || !isUserAuthorized
                            }
                            onClick={handleClick}
                        >
                            Convert to task
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
