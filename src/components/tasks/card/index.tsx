import { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import getDateInString from '@/helperFunctions/getDateInString';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import { CardProps } from '@/interfaces/task.type';
import { ALT_KEY } from '@/constants/key';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import TaskLevelEdit from './TaskTagEdit';
import { TaskStatusEditMode } from './TaskStatusEditMode';
import { updateTaskDetails } from '@/interfaces/task.type';
import {
    DUMMY_NAME,
    DUMMY_PROFILE as placeholderImageURL,
} from '@/constants/display-sections';
import { MAX_SEARCH_RESULTS, TASK_STATUS_MAPING } from '@/constants/constants';
import {
    COMPLETED,
    VERIFIED,
    AVAILABLE,
    DONE,
    BLOCKED,
} from '@/constants/task-status';
import moment from 'moment';
import { Loader } from './Loader';
import { TaskLevelMap } from './TaskLevelMap';
import {
    useDeleteTaskTagLevelMutation,
    useGetTaskTagsQuery,
} from '@/app/services/taskTagApi';
import { useGetUsersByUsernameQuery } from '@/app/services/usersApi';
import { ConditionalLinkWrapper } from './ConditionalLinkWrapper';
import useUserData from '@/hooks/useUserData';
import { isTaskDetailsPageLinkEnabled } from '@/constants/FeatureFlags';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import ProgressContainer from './progressContainer';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';
import { StatusIndicator } from './StatusIndicator';
import Suggestions from '../SuggestionBox/Suggestions';
import { useRouter } from 'next/router';

const Card: FC<CardProps> = ({
    content,
    shouldEdit = false,
    onContentChange = () => undefined,
}) => {
    const router = useRouter();
    const isDevMode = router.query.dev === 'true' ? true : false;
    const statusRedList = [BLOCKED];
    const statusNotOverDueList = [COMPLETED, VERIFIED, AVAILABLE, DONE];

    const cardDetails = content;

    const [editedTaskDetails, setEditedTaskDetails] = useState({
        ...cardDetails,
        savingText: '',
        assigningUser: '',
        savingDate: '',
    });

    const { data: userResponse } = useGetUsersByUsernameQuery({
        searchString: editedTaskDetails.assignee,
        size: MAX_SEARCH_RESULTS,
    });
    const assigneeProfileImageURL: string =
        userResponse?.users[0]?.picture?.url || placeholderImageURL;
    const { SUCCESS, ERROR } = ToastTypes;

    const { isUserAuthorized } = useUserData();

    const [showEditButton, setShowEditButton] = useState(false);

    const [keyLongPressed] = useKeyLongPressed();

    const [isEditMode, setIsEditMode] = useState(false);

    const { data: taskTagLevel, isLoading } = useGetTaskTagsQuery({
        itemId: cardDetails.id,
    });
    const [deleteTaskTagLevel] = useDeleteTaskTagLevelMutation();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();

    const [assigneeName, setAssigneeName] = useState<string>(
        cardDetails.assignee ?? ''
    );
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const isAltKeyLongPressed = keyLongPressed === ALT_KEY;

        if (isAltKeyLongPressed && isUserAuthorized) {
            setShowEditButton(true);
        }
    }, [keyLongPressed]);

    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    function getStartedAgo() {
        if (cardDetails.startedOn === undefined) {
            return 'N/A';
        } else {
            const localStartedOn = new Date(
                parseInt(cardDetails.startedOn, 10) * 1000
            );
            const fromNowStartedOn = moment(localStartedOn).fromNow();
            return fromNowStartedOn;
        }
    }

    const localEndsOn = new Date(cardDetails.endsOn * 1000);
    const fromNowEndsOn = moment(localEndsOn).fromNow();
    const statusFontColor = !statusRedList.includes(cardDetails.status)
        ? '#00a337'
        : '#f83535';
    const iconHeight = '25';
    const iconWidth = '25';

    const date: string = localEndsOn ? getDateInString(localEndsOn) : '';
    const [dateTimes, setDateTimes] = useState(date);

    function isTaskOverdue() {
        const timeLeft = localEndsOn.valueOf() - Date.now();
        return (
            !statusNotOverDueList.includes(cardDetails.status) && timeLeft <= 0
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

            onContentChange(toChange.id, {
                [changedProperty]: toChange[changedProperty],
            });
        }
    }

    function handelDateChange(
        event: React.ChangeEvent<HTMLInputElement>,
        changedProperty: keyof typeof cardDetails
    ) {
        const toChange: any = { ...cardDetails };
        if (changedProperty === 'endsOn' || changedProperty === 'startedOn') {
            const toTimeStamp =
                new Date(`${event.target.value}`).getTime() / 1000;
            toChange[changedProperty] = toTimeStamp;

            setEditedTaskDetails((prev) => ({
                ...prev,
                savingDate: PENDING,
            }));

            const response = updateTask({
                id: toChange.id,
                task: {
                    [changedProperty]: toChange[changedProperty],
                },
            });

            response
                .unwrap()
                .then((result) => {
                    setEditedTaskDetails((prev) => ({
                        ...prev,
                        savingDate: SAVED,
                    }));
                })
                .catch((err) => {
                    setEditedTaskDetails((prev) => ({
                        ...prev,
                        savingDate: ERROR_STATUS,
                    }));
                })
                .finally(() => {
                    setTimeout(() => {
                        setEditedTaskDetails((prev) => ({
                            ...prev,
                            savingDate: '',
                        }));
                    }, 3000);
                });
        }
    }

    function renderDate(fromNowEndsOn: string, isEditable: boolean) {
        if (isEditable) {
            return (
                <input
                    type="date"
                    onChange={(e) => {
                        setDateTimes(e.target.value);
                        handelDateChange(e, 'endsOn');
                    }}
                    value={dateTimes}
                    data-testid="date"
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
    const isTaskComplete = () => cardDetails.status === DONE;

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

    const onEditRoute = () => {
        setIsEditMode(true);
    };
    const isEditable = shouldEdit && isUserAuthorized && isEditMode;

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
        <div className={classNames.editButton}>
            <Image
                src="/pencil.webp"
                alt="pencil icon to represent edit button"
                width={iconWidth}
                height={iconHeight}
                onClick={onEditRoute}
                tabIndex={0}
                data-testid="edit-button"
            />
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
                    contentEditable={isEditable}
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
        setEditedTaskDetails((prev) => ({
            ...prev,
            assignee: userName,
            assigningUser: PENDING,
        }));
        setShowSuggestion(false);

        const response = updateTask({
            id: cardDetails.id,
            task: {
                assignee: userName,
            },
        });

        response
            .unwrap()
            .then((result) => {
                setEditedTaskDetails((prev) => ({
                    ...prev,
                    assigningUser: SAVED,
                }));
            })
            .catch((err) => {
                setEditedTaskDetails((prev) => ({
                    ...prev,
                    assigningUser: ERROR_STATUS,
                }));
            })
            .finally(() => {
                setTimeout(() => {
                    setEditedTaskDetails((prev) => ({
                        ...prev,
                        assigningUser: '',
                    }));
                }, 3000);
            });
    };

    const onCancelEditRoute = () => {
        setIsEditMode(false);
    };

    const CancelEditButton = () => (
        <div className={classNames.cancelEditButton}>
            <Image
                src="/cancel.png"
                alt="close edit mode"
                width={20}
                height={20}
                onClick={onCancelEditRoute}
                tabIndex={-1}
                data-testid="cancel-edit-button"
            />
        </div>
    );

    const handleTitleChange = (value: string) => {
        setEditedTaskDetails((prev) => ({
            ...prev,
            savingText: PENDING,
        }));

        const response = updateTask({
            id: cardDetails.id,
            task: {
                title: value,
            },
        });

        response
            .unwrap()
            .then((result) => {
                setEditedTaskDetails((prev) => ({
                    ...prev,
                    savingText: SAVED,
                }));
            })
            .catch((err) => {
                setEditedTaskDetails((prev) => ({
                    ...prev,
                    savingText: ERROR_STATUS,
                }));
            })
            .finally(() => {
                setTimeout(() => {
                    setEditedTaskDetails((prev) => ({
                        ...prev,
                        savingText: '',
                    }));
                }, 2000);
            });
    };

    const debounceTitle = (func: (value: string) => void, delay: number) => {
        const timerIdRef = useRef<NodeJS.Timeout | undefined>();
        return (value: string) => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
            }
            timerIdRef.current = setTimeout(() => {
                func(value);
            }, delay);
        };
    };

    const debouncedHandleTitleChange = debounceTitle(handleTitleChange, 3000);

    const inputHandler = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        setEditedTaskDetails((prev) => ({
            ...prev,
            title: value,
        }));
        if (value.trim() === '') {
            setEditedTaskDetails((prev) => ({
                ...prev,
                savingText: ERROR_STATUS,
            }));
            toast(ERROR, 'Title is not allowed to be empty');
            setTimeout(() => {
                setEditedTaskDetails((prev) => ({
                    ...prev,
                    savingText: '',
                }));
            }, 3000);
        } else {
            debouncedHandleTitleChange(value);
        }
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
                {isEditable ? (
                    <div className={classNames.textareaSection}>
                        <textarea
                            className={classNames.textarea}
                            name="title"
                            value={editedTaskDetails.title}
                            onChange={inputHandler}
                            data-testid="title-textarea"
                        />

                        <StatusIndicator
                            status={editedTaskDetails.savingText}
                        />
                    </div>
                ) : (
                    <ConditionalLinkWrapper
                        redirectingPath="/tasks/[id]"
                        shouldDisplayLink={isTaskDetailsPageLinkEnabled}
                        taskId={cardDetails.id}
                    >
                        <span
                            className={classNames.cardTitleText}
                            contentEditable={isEditable}
                            onKeyDown={(e) => handleChange(e, 'title')}
                            role="button"
                            tabIndex={0}
                        >
                            {editedTaskDetails.title}
                        </span>
                    </ConditionalLinkWrapper>
                )}

                {/* progress bar */}
                <div className={classNames.progressContainer}>
                    <ProgressContainer content={content} />
                </div>
            </div>
            <div className={classNames.taskStatusAndDateContainer}>
                <div className={classNames.dateInfo}>
                    <div className={classNames.dateSection}>
                        <p className={classNames.cardSpecialFont}>
                            Estimated completion
                        </p>
                        <p className={classNames.completionDate}>
                            {renderDate(fromNowEndsOn, isEditable)}
                        </p>
                        <StatusIndicator
                            status={editedTaskDetails.savingDate}
                        />
                    </div>
                    <span
                        className={classNames.cardSpecialFont}
                        contentEditable={isEditable}
                        onKeyDown={(e) => handleChange(e, 'startedOn')}
                        role="button"
                        tabIndex={0}
                        data-testid="started-on"
                    >
                        {cardDetails.status === AVAILABLE
                            ? 'Not started'
                            : `Started ${getStartedAgo()}`}
                    </span>
                </div>
                {/* EDIT task status */}
                <div className={classNames.taskStatusEditMode}>
                    {isEditable ? (
                        <TaskStatusEditMode
                            task={editedTaskDetails}
                            setEditedTaskDetails={setEditedTaskDetails}
                            isDevMode={isDevMode}
                        />
                    ) : (
                        <div className={classNames.statusContainer} style={{}}>
                            <p className={classNames.cardSpecialFont}>
                                Status:
                            </p>
                            <p
                                data-testid="task-status"
                                className={classNames.statusText}
                            >
                                {TASK_STATUS_MAPING[
                                    cardDetails.status as keyof typeof TASK_STATUS_MAPING
                                ] ||
                                    cardDetails.status ||
                                    'NA'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className={classNames.contributor}>
                <p className={classNames.cardSpecialFont}>
                    {cardDetails.assignee ? 'Assigned to' : 'Assign to'}
                </p>
                <span className={classNames.contributorImage}>
                    <Image
                        src={assigneeProfileImageURL}
                        alt={cardDetails.assignee || DUMMY_NAME}
                        width={30}
                        height={30}
                    />
                </span>
                {isEditable
                    ? isUserAuthorized && (
                          <div
                              className={`${classNames.assigneeSuggestionInput} ${classNames.assignedToSection}`}
                          >
                              <Suggestions
                                  assigneeName={assigneeName}
                                  showSuggestion={showSuggestion}
                                  handleClick={handleClick}
                                  handleAssignment={handleAssignment}
                                  setShowSuggestion={setShowSuggestion}
                                  ref={inputRef}
                              />

                              <StatusIndicator
                                  status={editedTaskDetails.assigningUser}
                              />
                          </div>
                      )
                    : editedTaskDetails.assignee && (
                          <p className={classNames.cardStrongFont}>
                              {editedTaskDetails.assignee}
                          </p>
                      )}
                {showAssignButton() && <AssigneeButton />}
            </div>

            <div className={classNames.cardItems}>
                <div
                    className={`${classNames.taskTagLevelWrapper} ${
                        isEditable && classNames.editMode
                    }`}
                >
                    <TaskLevelMap
                        taskTagLevel={taskTagLevel}
                        shouldEdit={isEditable}
                        itemId={cardDetails.id}
                        deleteTaskTagLevel={deleteTaskTagLevel}
                    />
                    {isEditable && isUserAuthorized && (
                        <TaskLevelEdit
                            taskTagLevel={taskTagLevel}
                            itemId={cardDetails.id}
                        />
                    )}
                </div>
            </div>

            {cardDetails.status !== COMPLETED && isIssueClosed() && (
                <CloseTaskButton />
            )}
            {!isEditMode && showEditButton && <EditButton />}
            {isEditMode && <CancelEditButton />}
        </div>
    );
};

export default Card;
