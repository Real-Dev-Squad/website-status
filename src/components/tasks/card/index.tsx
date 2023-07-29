import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import getDateInString from '@/helperFunctions/getDateInString';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import { CardProps } from '@/interfaces/task.type';
import { ALT_KEY } from '@/constants/key';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useRouter } from 'next/router';
import TaskLevelEdit from './TaskTagEdit';
import { TaskStatusEditMode } from './TaskStatusEditMode';
import { updateTaskDetails } from '@/interfaces/task.type';
import {
    DUMMY_NAME,
    DUMMY_PROFILE as placeholderImageURL,
} from '@/constants/display-sections';
import { MAX_SEARCH_RESULTS } from '@/constants/constants';
import moment from 'moment';
import { Loader } from './Loader';
import { TaskLevelMap } from './TaskLevelMap';
import { TASK_STATUS } from '@/interfaces/task-status';
import {
    useDeleteTaskTagLevelMutation,
    useGetTaskTagsQuery,
} from '@/app/services/taskTagApi';
import { useEditMode } from '@/hooks/useEditMode';
import { useGetUsersByUsernameQuery } from '@/app/services/usersApi';
import { ConditionalLinkWrapper } from './ConditionalLinkWrapper';
import { useGetUserQuery } from '@/app/services/userApi';
import HandleProgressText from './ProgressText';
import HandleProgressbar from './ProgressBar';
import useUserData from '@/hooks/useUserData';
import { isTaskDetailsPageLinkEnabled } from '@/constants/FeatureFlags';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import Suggestions from '../SuggestionBox/Suggestions';
import useDebounce from '../../../hooks/useDebounce';

const Card: FC<CardProps> = ({
    content,
    shouldEdit = false,
    onContentChange = () => undefined,
}) => {
    const statusRedList = [TASK_STATUS.BLOCKED];
    const statusNotOverDueList = [
        TASK_STATUS.COMPLETED,
        TASK_STATUS.VERIFIED,
        TASK_STATUS.AVAILABLE,
    ];

    const cardDetails = content;
    const { data } = useGetUserQuery();
    const [progress, setProgress] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);
    const [updateTasks] = useUpdateTaskMutation();
    const [debounceTimeOut, setDebounceTimeOut] = useState<number>(0);

    const { data: userResponse } = useGetUsersByUsernameQuery({
        searchString: cardDetails.assignee,
        size: MAX_SEARCH_RESULTS,
    });
    const assigneeProfileImageURL: string =
        userResponse?.users[0]?.picture?.url || placeholderImageURL;
    const { SUCCESS, ERROR } = ToastTypes;

    const { data: userData, isUserAuthorized } = useUserData();

    const [showEditButton, setShowEditButton] = useState(false);

    const [keyLongPressed] = useKeyLongPressed();

    const { data: taskTagLevel, isLoading } = useGetTaskTagsQuery({
        itemId: cardDetails.id,
    });
    const [deleteTaskTagLevel] = useDeleteTaskTagLevelMutation();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();

    const [assigneeName, setAssigneeName] = useState<string>('');
    const debounceSearchTerm = useDebounce(assigneeName, 500);
    const inputRef = useRef<HTMLInputElement>(null);

    const { onEditRoute } = useEditMode();
    const router = useRouter();
    const { dev } = router.query;
    const isDevEnabled = (dev && dev === 'true') || false;

    useEffect(() => {
        const isAltKeyLongPressed = keyLongPressed === ALT_KEY;

        if (isAltKeyLongPressed) {
            setShowEditButton(true);
        }
    }, [keyLongPressed]);

    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
    const fromNowStartedOn = moment(localStartedOn).fromNow();

    const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
    const fromNowEndsOn = moment(localEndsOn).fromNow();
    const statusFontColor = !statusRedList.includes(
        cardDetails.status as TASK_STATUS
    )
        ? '#00a337'
        : '#f83535';
    const iconHeight = '25';
    const iconWidth = '25';

    const date: string = localEndsOn ? getDateInString(localEndsOn) : '';
    const [dateTimes, setDateTimes] = useState(date);

    function isTaskOverdue() {
        const timeLeft = localEndsOn.valueOf() - Date.now();
        return (
            !statusNotOverDueList.includes(cardDetails.status as TASK_STATUS) &&
            timeLeft <= 0
        );
    }

    function stripHtml(html: string) {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    function handleChange(
        event: any,
        changedProperty: keyof typeof cardDetails
    ) {
        if (event.key === 'Enter') {
            const toChange: any = cardDetails;
            toChange[changedProperty] = stripHtml(event.target.value);

            if (
                changedProperty === 'endsOn' ||
                changedProperty === 'startedOn'
            ) {
                const toTimeStamp =
                    new Date(`${event.target.value}`).getTime() / 1000;
                toChange[changedProperty] = toTimeStamp;
            }

            onContentChange(
                toChange.id,
                {
                    [changedProperty]: toChange[changedProperty],
                },
                isDevEnabled
            );
        }
    }

    function handelDateChange(
        event: React.ChangeEvent<HTMLInputElement>,
        changedProperty: keyof typeof cardDetails
    ) {
        const toChange: any = cardDetails;
        if (changedProperty === 'endsOn' || changedProperty === 'startedOn') {
            const toTimeStamp =
                new Date(`${event.target.value}`).getTime() / 1000;
            toChange[changedProperty] = toTimeStamp;
            onContentChange(toChange.id, {
                [changedProperty]: toChange[changedProperty],
            });
        }
    }

    function renderDate(fromNowEndsOn: string, shouldEdit: boolean) {
        if (shouldEdit) {
            return (
                <input
                    type="date"
                    onChange={(e) => {
                        setDateTimes(e.target.value);
                        handelDateChange(e, 'endsOn');
                    }}
                    value={dateTimes}
                />
            );
        }
        return (
            <span
                className={classNames.cardStrongFont}
                role="button"
                tabIndex={0}
            >
                {!cardDetails.endsOn ? 'TBD' : fromNowEndsOn}
            </span>
        );
    }

    const hasIssueAssignee = () => cardDetails.github?.issue.assignee ?? false;
    const hasTaskAssignee = () => cardDetails.assignee ?? false;
    const isIssueClosed = () => cardDetails.github?.issue?.status === 'closed';
    const isTaskComplete = () => cardDetails.status === 'Completed';

    const showAssignButton = () =>
        hasIssueAssignee() &&
        !hasTaskAssignee() &&
        !isIssueClosed() &&
        !isTaskComplete();

    const handleAssignToIssueAssignee = async () => {
        const data: updateTaskDetails = {
            assignee: cardDetails.github?.issue.assigneeRdsInfo?.username,
            status: 'ASSIGNED',
        };

        // Update start date when assigning the task to the issue assignee
        if (!cardDetails.startedOn) {
            data.startedOn = new Date().getTime() / 1000;
        }

        const response = updateTask({
            task: data,
            id: cardDetails.id,
            ...(isDevEnabled && { isDevEnabled: true }),
        });
        response
            .unwrap()
            .then(() => {
                toast(SUCCESS, 'Task assigned successfully!');
            })
            .catch((err) => {
                if ('response' in err) {
                    toast(ERROR, err.response.data.message);
                    return;
                }
                toast(ERROR, err.message);
            });
    };

    const getFormattedClosedAtDate = () => {
        const closedAt = cardDetails?.github?.issue?.closedAt;
        return getDateInString(new Date(closedAt ?? Date.now()));
    };

    const handleCloseTask = async () => {
        const data = {
            status: 'COMPLETED',
        };
        const response = updateTask({
            task: data,
            id: cardDetails.id,
            ...(isDevEnabled && { isDevEnabled: true }),
        });

        response
            .unwrap()
            .then((result) =>
                toast(SUCCESS, 'Task status changed successfully!')
            )
            .catch((err) => {
                if ('response' in err) {
                    toast(ERROR, err.response.data.message);
                    return;
                }
                toast(ERROR, err.message);
            });
    };

    const EditButton = () => (
        <div className={classNames.editButton} data-testid="edit-button">
            <Image
                src="/pencil.webp"
                alt="pencil icon to represent edit button"
                width={iconWidth}
                height={iconHeight}
                onClick={onEditRoute}
                tabIndex={0}
            />
        </div>
    );

    const handleProgressUpdate = () => {
        if (
            content.assignee === data?.username ||
            data?.roles.super_user === true
        ) {
            setProgress(true);
        } else {
            toast(ERROR, 'You cannot update progress');
        }
    };

    const debounceSlider = (debounceTimeOut: number) => {
        if (debounceTimeOut) {
            clearTimeout(debounceTimeOut);
        }
        const timer = setTimeout(() => {
            handleSliderChangeComplete(cardDetails.id, progressValue);
        }, 1000);
        setDebounceTimeOut(Number(timer));
    };

    const handleSliderChangeComplete = async (
        id: string,
        percentCompleted: number
    ) => {
        const data = {
            percentCompleted: percentCompleted,
        };
        await updateTasks({
            task: data,
            id: id,
        });
        toast(SUCCESS, 'Progress Updated Successfully');
    };

    const handleProgressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProgressValue(Number(event.target.value));
    };

    const handleSaveProgressUpdate = () => {
        setProgress(false);
    };

    const AssigneeButton = () => {
        return (
            <button
                className={classNames.card__top__button}
                type="button"
                disabled={isLoadingUpdateTaskDetails}
                onClick={handleAssignToIssueAssignee}
            >
                {`Assign to ${cardDetails.github?.issue.assigneeRdsInfo?.username}`}
            </button>
        );
    };

    const CloseTaskButton = () => {
        return (
            <div className={classNames.cardItems}>
                <span
                    className={classNames.cardSpecialFont}
                    contentEditable={shouldEdit}
                    onKeyDown={(e) => handleChange(e, 'startedOn')}
                    role="button"
                    tabIndex={0}
                >
                    The issue was closed on {getFormattedClosedAtDate()}
                </span>
                <button
                    className={classNames.close__task__button}
                    type="button"
                    disabled={isLoadingUpdateTaskDetails}
                    onClick={handleCloseTask}
                >
                    Close the task
                </button>
            </div>
        );
    };

    const handleAssignment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssigneeName(e.target.value);
        e.target.value ? setShowSuggestion(true) : setShowSuggestion(false);
    };

    const handleClick = (userName: string) => {
        inputRef.current?.focus();
        setAssigneeName(userName);
        setShowSuggestion(false);
    };
    return (
        <div
            className={`
                ${classNames.card}
                ${classNames.card_updated}
                ${isLoading && classNames.pointerEventsNone}
                ${isTaskOverdue() && classNames.overdueTask}
    `}
            data-testid="task-card"
        >
            {/* loading spinner */}
            {isLoading && <Loader />}
            <div className={classNames.cardItems}>
                <ConditionalLinkWrapper
                    redirectingPath="/tasks/[id]"
                    shouldDisplayLink={isTaskDetailsPageLinkEnabled}
                    taskId={cardDetails.id}
                >
                    <span
                        className={classNames.cardTitle}
                        contentEditable={shouldEdit}
                        onKeyDown={(e) => handleChange(e, 'title')}
                        role="button"
                        tabIndex={0}
                    >
                        {cardDetails.title}
                    </span>
                </ConditionalLinkWrapper>

                {/* progress bar */}
                <div>
                    <div className={classNames.progressContainerUpdated}>
                        <HandleProgressbar
                            progress={progress}
                            progressValue={progressValue}
                            percentCompleted={content.percentCompleted}
                            handleProgressChange={handleProgressChange}
                            debounceSlider={debounceSlider}
                            startedOn={content.startedOn}
                            endsOn={content.endsOn}
                        />
                    </div>
                    {dev === 'true' && (
                        <HandleProgressText
                            progress={progress}
                            handleSaveProgressUpdate={handleSaveProgressUpdate}
                            handleProgressUpdate={handleProgressUpdate}
                        />
                    )}
                </div>
            </div>
            <div className={classNames.taskStatusAndDateContainer}>
                <div className={classNames.dateInfo}>
                    <div>
                        <span className={classNames.cardSpecialFont}>
                            Estimated completion
                        </span>
                        <span className={classNames.completionDate}>
                            {renderDate(fromNowEndsOn, shouldEdit)}
                        </span>
                    </div>
                    <span
                        className={classNames.cardSpecialFont}
                        contentEditable={shouldEdit}
                        onKeyDown={(e) => handleChange(e, 'startedOn')}
                        role="button"
                        tabIndex={0}
                    >
                        {cardDetails.status === TASK_STATUS.AVAILABLE
                            ? 'Not started'
                            : `Started on ${fromNowStartedOn}`}
                    </span>
                </div>
                {/* EDIT task status */}
                <div className={classNames.taskStatusEditMode}>
                    {shouldEdit && (
                        <TaskStatusEditMode
                            task={cardDetails}
                            updateTask={onContentChange}
                        />
                    )}
                </div>
            </div>
            {showAssignButton() ? (
                <AssigneeButton />
            ) : (
                <div className={classNames.contributor}>
                    <span className={classNames.cardSpecialFont}>
                        Assigned to
                    </span>
                    <span className={classNames.contributorImage}>
                        <Image
                            src={assigneeProfileImageURL}
                            alt={cardDetails.assignee || DUMMY_NAME}
                            width={30}
                            height={30}
                        />
                    </span>
                    {shouldEdit ? (
                        isUserAuthorized && (
                            <Suggestions
                                assigneeName={assigneeName}
                                searchTerm={debounceSearchTerm}
                                showSuggestion={showSuggestion}
                                handleAssignment={handleAssignment}
                                handleClick={handleClick}
                                handleChange={handleChange}
                                ref={inputRef}
                            />
                        )
                    ) : (
                        <span className={classNames.cardStrongFont}>
                            {cardDetails.assignee}
                        </span>
                    )}
                </div>
            )}

            <div className={classNames.cardItems}>
                <div
                    className={`${classNames.taskTagLevelWrapper} ${
                        shouldEdit && classNames.editMode
                    }`}
                >
                    <TaskLevelMap
                        taskTagLevel={taskTagLevel}
                        shouldEdit={shouldEdit}
                        itemId={cardDetails.id}
                        deleteTaskTagLevel={deleteTaskTagLevel}
                    />
                    {shouldEdit && isUserAuthorized && (
                        <TaskLevelEdit
                            taskTagLevel={taskTagLevel}
                            itemId={cardDetails.id}
                        />
                    )}
                </div>
            </div>

            {cardDetails.status !== 'Completed' && isIssueClosed() && (
                <CloseTaskButton />
            )}
            {isUserAuthorized && showEditButton && <EditButton />}
        </div>
    );
};

export default Card;
