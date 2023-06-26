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
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';
import classNames from './task-details.module.scss';
import { useRouter } from 'next/router';
import { TASKS_URL } from '@/constants/url';
import fetch from '@/helperFunctions/fetch';
import Link from 'next/link';
import {
    useGetTaskDetailsQuery,
    useUpdateTaskDetailsMutation,
} from '@/app/services/taskDetailsApi';
import {
    ButtonProps,
    TextAreaProps,
    taskDetailsDataType,
} from '@/interfaces/taskDetails.type';
import Layout from '@/components/Layout';

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
    url?: string;
    taskID: string;
};

const TaskDetails: FC<Props> = ({ taskID }) => {
    const router = useRouter();
    const { query } = router;
    const isDevModeEnabled = query.dev === 'true' ? true : false;
    const isAuthorized = useContext(isUserAuthorizedContext);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string[]>([]);
    const [id, setId] = useState<string[]>([]);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const initialDataRef = useRef<Record<string, any> | undefined>({});
    const { data, isError, isLoading } = useGetTaskDetailsQuery(taskID);
    const { SUCCESS, ERROR } = ToastTypes;

    const taskDetailsData = data?.taskData;
    const [taskDetails, setTaskDetails] = useState<
        Record<string, any> | undefined
    >({});
    const [editedDetails, setEditedDetails] = useState({});

    const [updateTaskDetails] = useUpdateTaskDetailsMutation();

    useEffect(() => {
        const fetchedData = data?.taskData;
        setTaskDetails(taskDetailsData);
        initialDataRef.current = fetchedData;
    }, [isLoading, data]);

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const formData = {
            ...taskDetails,
            [event.target.name]: event.target.value,
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

    const fetchDependentTasks = async (
        taskDetails: taskDetailsDataType['taskData']
    ) => {
        try {
            if (taskDetails?.dependsOn) {
                const dependsOnTitles = await Promise.all(
                    taskDetails.dependsOn.map(async (taskId: string) => {
                        const { requestPromise } = fetch({
                            url: `${TASKS_URL}/${taskId}/details`,
                        });
                        const data = await requestPromise;
                        return [data?.data?.taskData?.title, taskId];
                    })
                );
                const titles = dependsOnTitles.map(
                    (innerArray) => innerArray[0]
                );
                const ids = dependsOnTitles.map(
                    (innerArrays) => innerArrays[1]
                );
                setTaskTitle(titles);
                setId(ids);
                setIsFetched(true);
            }
        } catch (error) {
            console.error('Error while fetching taskdependency', error);
        }
    };
    if (taskDetailsData && !isFetched) {
        fetchDependentTasks(taskDetailsData);
    }
    const navigateToTask = (taskId: string) => {
        router.push(`/tasks/${taskId}`);
    };
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
                            <TaskContainer
                                title="Task DependsOn"
                                hasImg={false}
                            >
                                <ol
                                    className={
                                        classNames[
                                            'task_dependency_list_container'
                                        ]
                                    }
                                >
                                    {taskTitle.length ? (
                                        taskTitle.map((title, index) => (
                                            <Link
                                                href={`/tasks/${id[index]}`}
                                                key={index}
                                            >
                                                <li
                                                    onClick={() =>
                                                        navigateToTask(
                                                            id[index]
                                                        )
                                                    }
                                                >
                                                    {title}
                                                </li>
                                            </Link>
                                        ))
                                    ) : (
                                        <p>No Dependency</p>
                                    )}
                                </ol>
                            </TaskContainer>
                        </section>

                        <section className={classNames.rightContainer}>
                            {isDevModeEnabled && (
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/progress/${taskID}?dev=true`
                                        )
                                    }
                                >
                                    Update Progress
                                </button>
                            )}
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
