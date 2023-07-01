import { FC, useState, useEffect, useContext, useRef } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import getDateInString from '@/helperFunctions/getDateInString';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import task from '@/interfaces/task.type';
import { ALT_KEY } from '@/constants/key';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useRouter } from 'next/router';
import TaskLevelEdit from './TaskTagEdit';
import { TaskStatusEditMode } from './TaskStatusEditMode';
import { updateTaskDetails } from '@/interfaces/task.type';
import fetch from '@/helperFunctions/fetch';
import { TASKS_URL } from '@/constants/url';

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
import { isNewCardDesignEnabled } from '@/constants/FeatureFlags';

import useUserData from '@/hooks/useUserData';

import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import SuggestionBox from '../SuggestionBox/SuggestionBox';
import { userDataType } from '@/interfaces/user.type';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import userData from '@/helperFunctions/getUser';

type Props = {
    content: task;
    shouldEdit: boolean;
    onContentChange?: (changeId: string, changeObject: object) => void;
};

let timer: NodeJS.Timeout;

const Card: FC<Props> = ({
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

    // const [assigneeName, setAssigneeName] = useState('');

    const { data: taskTagLevel, isLoading } = useGetTaskTagsQuery({
        itemId: cardDetails.id,
    });
    const [deleteTaskTagLevel] = useDeleteTaskTagLevelMutation();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();

    const [isLoadingSuggestions, setIsLoadingSuggestions] =
        useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<GithubInfo[]>([]);
    const [assigneeName, setAssigneeName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { onEditRoute } = useEditMode();
    const router = useRouter();
    const { query } = router;
    const isNewCardEnabled = !!query.dev;

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
            toChange[changedProperty] = stripHtml(assigneeName);

            if (
                changedProperty === 'endsOn' ||
                changedProperty === 'startedOn'
            ) {
                const toTimeStamp =
                    new Date(`${event.target.value}`).getTime() / 1000;
                toChange[changedProperty] = toTimeStamp;
            }
            console.log(toChange);

            onContentChange(toChange.id, {
                [changedProperty]: toChange[changedProperty],
            });
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

    function inputParser(input: string) {
        const parsedDate = moment(new Date(parseInt(input, 10) * 1000));
        return parsedDate;
    }

    function getPercentageOfDaysLeft(
        startedOn: string,
        endsOn: string
    ): number {
        const startDate = inputParser(startedOn);
        const endDate = inputParser(endsOn);

        // It provides us with total days that are there for the the project and number of days left
        const totalDays = endDate.diff(startDate, 'days');
        const daysLeft = endDate.diff(new Date(), 'days');

        // It provides the percentage of days left
        const percentageOfDaysLeft = (daysLeft / totalDays) * 100;
        return percentageOfDaysLeft;
    }

    function handleProgressColor(
        percentCompleted: number,
        startedOn: string,
        endsOn: string
    ): string {
        const percentageOfDaysLeft = getPercentageOfDaysLeft(startedOn, endsOn);
        const percentIncomplete = 100 - percentCompleted;
        if (
            percentCompleted === 100 ||
            percentageOfDaysLeft >= percentIncomplete
        ) {
            return classNames.progressGreen;
        }

        if (
            (percentageOfDaysLeft < 25 && percentIncomplete > 35) ||
            (percentageOfDaysLeft <= 0 && percentIncomplete > 0)
        ) {
            return classNames.progressRed;
        }

        if (percentageOfDaysLeft < 50 && percentIncomplete > 75) {
            return classNames.progressOrange;
        }

        return classNames.progressYellow;
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

    const ProgressIndicator = () => (
        <div className={classNames.progressIndicator}>
            <div
                className={`
                ${handleProgressColor(
                    content.percentCompleted,
                    content.startedOn,
                    content.endsOn
                )}
                ${classNames.progressStyle}
                `}
                style={{
                    width: `${content.percentCompleted}%`,
                }}
            ></div>
        </div>
    );

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
        if (e.target.value) setShowSuggestion(true);
        else setShowSuggestion(false);
    };

    const handleClick = (userName: string) => {
        inputRef.current?.focus();
        setAssigneeName(userName);
        setShowSuggestion(false);
    };

    const fetchUsers = async (e: string) => {
        if (!e) return;
        setIsLoadingSuggestions(true);

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users?search=${e}`;
        try {
            const { requestPromise } = fetch({ url });
            const users = await requestPromise;
            const usersData = users.data.users;
            const suggestedUsers: GithubInfo[] = [];
            usersData.map((data: userDataType) => {
                suggestedUsers.push({
                    github_id: data.username,
                    profileImageUrl: data?.picture?.url
                        ? data.picture.url
                        : placeholderImageURL,
                });
            });

            setSuggestions(suggestedUsers);
            setIsLoadingSuggestions(false);
        } catch (error: any) {
            setIsLoadingSuggestions(false);
            toast(ERROR, error.message);
        }
    };

    const debounce = (fn: (e: string) => void, delay: number) => {
        return function (e: string) {
            clearTimeout(timer);
            setSuggestions([]);
            timer = setTimeout(() => {
                fn(e);
            }, delay);
        };
    };

    // show redesign only on dev
    if (isNewCardDesignEnabled)
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
                        shouldDisplayLink={isNewCardEnabled}
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
                    <div className={classNames.progressContainerUpdated}>
                        <ProgressIndicator />
                        <span>{content.percentCompleted}% </span>
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
                                <div
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                    }}
                                >
                                    <input
                                        ref={inputRef}
                                        value={assigneeName}
                                        className={classNames.cardStrongFont}
                                        onKeyDown={(e) => {
                                            handleChange(e, 'assignee');
                                        }}
                                        onChange={(e) => {
                                            handleAssignment(e);
                                            debounce(
                                                fetchUsers,
                                                400
                                            )(e.target.value);
                                        }}
                                        role="button"
                                        tabIndex={0}
                                    />

                                    {showSuggestion && (
                                        <SuggestionBox
                                            suggestions={suggestions}
                                            onClickName={handleClick}
                                            loading={isLoadingSuggestions}
                                        />
                                    )}
                                </div>
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

    return (
        <div
            className={`
            ${classNames.card}
            ${isLoading && classNames.pointerEventsNone}
            ${isTaskOverdue() && classNames.overdueTask}
      `}
        >
            {/* loading spinner */}
            {isLoading && <Loader />}

            <div className={classNames.cardItems}>
                <ConditionalLinkWrapper shouldDisplayLink={isNewCardEnabled}>
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
                <span>
                    <span className={classNames.cardSpecialFont}>Status:</span>
                    <span
                        className={classNames.cardStatusFont}
                        contentEditable={shouldEdit}
                        onKeyDown={(e) => handleChange(e, 'status')}
                        style={{ color: statusFontColor }}
                        role="button"
                        tabIndex={0}
                    >
                        {cardDetails.status}
                    </span>
                </span>
            </div>
            <div className={classNames.cardItems}>
                <span>
                    <Image
                        src="/calendar-icon.png"
                        alt="calendar icon"
                        width={iconWidth}
                        height={iconHeight}
                    />
                    <span className={classNames.cardSpecialFont}>Due Date</span>
                    {renderDate(fromNowEndsOn, shouldEdit)}
                </span>
            </div>
            <div className={classNames.cardItems}>
                <span className={classNames.progressContainer}>
                    <ProgressIndicator />

                    <span>{content.percentCompleted}% completed</span>
                </span>
            </div>
            <div
                className={`${classNames.taskTagLevelWrapper} ${
                    shouldEdit && classNames.editMode
                }`}
            >
                <TaskLevelMap
                    taskTagLevel={taskTagLevel}
                    itemId={cardDetails.id}
                    shouldEdit={shouldEdit}
                    deleteTaskTagLevel={deleteTaskTagLevel}
                />
                {shouldEdit && isUserAuthorized && (
                    <TaskLevelEdit
                        taskTagLevel={taskTagLevel}
                        itemId={cardDetails.id}
                    />
                )}
            </div>
            <div className={classNames.cardItems}>
                <span
                    className={classNames.cardSpecialFont}
                    contentEditable={shouldEdit}
                    onKeyDown={(e) => handleChange(e, 'startedOn')}
                    role="button"
                    tabIndex={0}
                >
                    Started {!cardDetails.startedOn ? 'TBD' : fromNowStartedOn}
                </span>
                {
                    // Assigne to button if task was created from an issue
                    showAssignButton() ? (
                        <AssigneeButton />
                    ) : (
                        <span>
                            <span className={classNames.cardSpecialFont}>
                                Assignee:
                            </span>
                            {shouldEdit ? (
                                isUserAuthorized && (
                                    <div
                                        style={{
                                            position: 'relative',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <input
                                            ref={inputRef}
                                            value={assigneeName}
                                            className={
                                                classNames.cardStrongFont
                                            }
                                            onKeyDown={(e) => {
                                                handleChange(e, 'assignee');
                                            }}
                                            onChange={(e) => {
                                                handleAssignment(e);
                                                debounce(
                                                    fetchUsers,
                                                    400
                                                )(e.target.value);
                                            }}
                                            role="button"
                                            tabIndex={0}
                                        />

                                        {showSuggestion && (
                                            <SuggestionBox
                                                suggestions={suggestions}
                                                onClickName={handleClick}
                                                loading={isLoadingSuggestions}
                                            />
                                        )}
                                    </div>
                                )
                            ) : (
                                <span className={classNames.cardStrongFont}>
                                    {cardDetails.assignee}
                                </span>
                            )}
                            <span className={classNames.contributorImage}>
                                <Image
                                    src={assigneeProfileImageURL}
                                    alt={cardDetails.assignee || DUMMY_NAME}
                                    width={45}
                                    height={45}
                                />
                            </span>
                        </span>
                    )
                }
            </div>
            {
                // Suggest to close task if issue was closed
                cardDetails.status !== 'Completed' && isIssueClosed() && (
                    <CloseTaskButton />
                )
            }
            {isUserAuthorized && showEditButton && <EditButton />}
        </div>
    );
};

export default Card;
