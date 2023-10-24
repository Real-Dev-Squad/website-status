import { FC, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import { REQUEST_TABS } from './constants';
import Modal from '../Modal';
import TaskRequestForm from './TaskRequestForm';
import ActionForm from './ActionForm';
import { TaskData, TaskRequestData } from '@/components/issues/constants';

type TaskManagementProps = {
    isUserAuthorized: boolean;
    isOpen: boolean;
    assignee?: string;
    taskId?: string;
    requestId?: string;
    toggle: () => void;
    handleCreateTaskRequest: (
        TaskRequestData: TaskRequestData
    ) => Promise<void>;
    handleCreateTask: (taskData: TaskData) => Promise<void>;
    handleUpdateTask: (taskData: TaskData, taskId: string) => Promise<void>;
};

const TaskManagementModal: FC<TaskManagementProps> = ({
    isUserAuthorized,
    isOpen,
    toggle,
    assignee,
    taskId,
    requestId,
    handleCreateTaskRequest,
    handleCreateTask,
    handleUpdateTask,
}) => {
    const defaultTaskConversionTab = isUserAuthorized
        ? REQUEST_TABS.TASK_CREATION
        : REQUEST_TABS.CREATION_REQUEST;
    const [selectedTab, setSelectedTab] = useState(defaultTaskConversionTab);

    const handleTaskRequestTabChange = (tab: REQUEST_TABS) => {
        setSelectedTab(tab);
    };
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={styles.taskTabs}>
                    <button
                        onClick={() =>
                            handleTaskRequestTabChange(
                                REQUEST_TABS.CREATION_REQUEST
                            )
                        }
                        className={`${styles.taskTab} ${
                            selectedTab === REQUEST_TABS.CREATION_REQUEST
                                ? styles.highlightTaskTab
                                : ''
                        }`}
                    >
                        Task Request
                    </button>
                    {isUserAuthorized && (
                        <button
                            onClick={() =>
                                handleTaskRequestTabChange(
                                    REQUEST_TABS.TASK_CREATION
                                )
                            }
                            className={`${styles.taskTab} ${
                                selectedTab === REQUEST_TABS.TASK_CREATION
                                    ? styles.highlightTaskTab
                                    : ''
                            }`}
                        >
                            Task Assignment
                        </button>
                    )}
                </div>
                {selectedTab === REQUEST_TABS.CREATION_REQUEST && (
                    <TaskRequestForm
                        requestId={requestId}
                        taskId={taskId}
                        createTaskRequest={handleCreateTaskRequest}
                    />
                )}
                {selectedTab === REQUEST_TABS.TASK_CREATION && (
                    <ActionForm
                        taskId={taskId || ''}
                        taskAssignee={assignee}
                        createTask={handleCreateTask}
                        updateTask={handleUpdateTask}
                    />
                )}
            </Modal>
        </>
    );
};

export default TaskManagementModal;
