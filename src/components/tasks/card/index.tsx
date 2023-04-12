import { FC, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import getDateInString from '@/helperFunctions/getDateInString';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import task from '@/interfaces/task.type';
import {
    AVAILABLE,
    BLOCKED,
    COMPLETED,
    VERIFIED,
} from '@/components/constants/beautified-task-status';
import { ALT_KEY } from '@/components/constants/key';
import taskItem, { taskItemPayload } from '@/interfaces/taskItem.type';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    ITEMS_URL,
    ITEM_BY_FILTER_URL,
    ITEM_TYPES,
} from '@/components/constants/url';
import TaskLevelEdit from './TaskTagEdit';

import moment from 'moment';

type Props = {
    content: task;
    shouldEdit: boolean;
    onContentChange?: (changeId: string, changeObject: object) => void;
};

const Card: FC<Props> = ({
    content,
    shouldEdit = false,
    onContentChange = () => undefined,
}) => {
    const statusRedList = [BLOCKED];
    const statusNotOverDueList = [COMPLETED, VERIFIED, AVAILABLE];
    const cardDetails = content;
    const [assigneeProfilePic, setAssigneeProfilePic] = useState(
        `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`
    );
    const { SUCCESS, ERROR } = ToastTypes;
    const isUserAuthorized = useContext(isUserAuthorizedContext);
    const [taskTagLevel, setTaskTagLevel] = useState<taskItem[]>();
    const [showEditButton, setShowEditButton] = useState(false);
    const [keyLongPressed] = useKeyLongPressed();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { actions, state } = useAppContext();

    useEffect(() => {
        const isAltKeyLongPressed = keyLongPressed === ALT_KEY;
        if (isAltKeyLongPressed) {
            setShowEditButton(true);
        }
    }, [keyLongPressed]);

    useEffect(() => {
        if (state?.isLoggedIn) {
            getTaskTags();
        }
    }, [state?.isLoggedIn]);

    const getTaskTags = async () => {
        try {
            const { requestPromise } = fetch({
                url: ITEM_BY_FILTER_URL,
                params: {
                    itemType: ITEM_TYPES.task,
                    itemId: `${cardDetails.id}`,
                },
            });
            const { data: result } = await requestPromise;
            setTaskTagLevel(result.data);
        } catch (err: any) {
            toast(ERROR, err.message);
        }
    };

    const contributorImageOnError = () =>
        setAssigneeProfilePic('/dummyProfile.png');

    const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
    const fromNowStartedOn = moment(localStartedOn).fromNow();

    const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
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
            toChange[changedProperty] = stripHtml(event.target.innerHTML);

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

    const updateTaskTagLevel = async (
        taskItemToUpdate: taskItem,
        method: 'delete' | 'post'
    ) => {
        const body: taskItemPayload = {
            itemId: cardDetails.id,
            itemType: 'TASK',
        };
        try {
            setIsLoading(true);
            if (method === 'post') {
                body.tagPayload = [
                    {
                        levelId: taskItemToUpdate.levelId,
                        tagId: taskItemToUpdate.tagId,
                    },
                ];
            } else if (method === 'delete') {
                body.tagId = taskItemToUpdate.tagId;
            }
            const { requestPromise } = fetch({
                url: ITEMS_URL,
                method,
                data: body,
            });
            const result = await requestPromise;
            if (result.status === 200 && method === 'delete') {
                taskTagLevel &&
                    setTaskTagLevel(
                        taskTagLevel?.filter(
                            (item) => item.tagId !== taskItemToUpdate.tagId
                        )
                    );
            } else if (result.status === 200 && method === 'post') {
                taskTagLevel
                    ? setTaskTagLevel([
                          ...taskTagLevel,
                          { itemId: cardDetails.id, ...taskItemToUpdate },
                      ])
                    : setTaskTagLevel([
                          { itemId: cardDetails.id, ...taskItemToUpdate },
                      ]);
            }
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            toast(ERROR, err.message);
        }
    };

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
                    onChange={(e) => setDateTimes(e.target.value)}
                    onKeyPress={(e) => handleChange(e, 'endsOn')}
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
                {fromNowEndsOn}
            </span>
        );
    }

    const onEditEnabled = () => {
        actions.onEditRoute();
    };

    return (
        <div
            className={`
        ${classNames.card}
        ${isLoading && classNames.pointerEventsNone}
        ${isTaskOverdue() && classNames.overdueTask}
    `}
        >
            {/* loading spinner */}
            {isLoading && (
                <div className={classNames.loadingBg}>
                    <div className={classNames.spinner}>
                        <span className={classNames.screenReaderOnly}>
                            loading
                        </span>
                    </div>
                </div>
            )}

            <div className={classNames.cardItems}>
                <Link
                    href={{
                        pathname: '/tasks/[id]',
                    }}
                    as={`/tasks/${cardDetails.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <span
                        className={classNames.cardTitle}
                        contentEditable={shouldEdit}
                        onKeyPress={(e) => handleChange(e, 'title')}
                        role="button"
                        tabIndex={0}
                    >
                        {cardDetails.title}
                    </span>
                </Link>
                <span>
                    <span className={classNames.cardSpecialFont}>Status:</span>
                    <span
                        className={classNames.cardStatusFont}
                        contentEditable={shouldEdit}
                        onKeyPress={(e) => handleChange(e, 'status')}
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
                            style={{ width: `${content.percentCompleted}%` }}
                        ></div>
                    </div>
                    <span>{content.percentCompleted}% completed</span>
                </span>
            </div>
            <div
                className={`${classNames.taskTagLevelWrapper} ${
                    shouldEdit && classNames.editMode
                }`}
            >
                <div className={classNames.taskTagLevelContainer}>
                    {taskTagLevel?.map((item) => (
                        <span
                            key={item.tagId}
                            className={classNames.taskTagLevel}
                        >
                            {item.tagName}{' '}
                            <small>
                                <b>LVL:{item.levelValue}</b>
                            </small>
                            {shouldEdit && isUserAuthorized && (
                                <span>
                                    <button
                                        className={
                                            classNames.removeTaskTagLevelBtn
                                        }
                                        onClick={() =>
                                            updateTaskTagLevel(item, 'delete')
                                        }
                                    >
                                        &#10060;
                                    </button>
                                </span>
                            )}
                        </span>
                    ))}
                </div>
                {shouldEdit && isUserAuthorized && (
                    <TaskLevelEdit
                        taskTagLevel={taskTagLevel}
                        updateTaskTagLevel={updateTaskTagLevel}
                    />
                )}
            </div>
            <div className={classNames.cardItems}>
                <span
                    className={classNames.cardSpecialFont}
                    contentEditable={shouldEdit}
                    onKeyPress={(e) => handleChange(e, 'startedOn')}
                    role="button"
                    tabIndex={0}
                >
                    Started {fromNowStartedOn}
                </span>
                <span>
                    <span className={classNames.cardSpecialFont}>
                        Assignee:
                    </span>
                    <span
                        className={classNames.cardStrongFont}
                        contentEditable={shouldEdit}
                        onKeyPress={(e) => handleChange(e, 'assignee')}
                        role="button"
                        tabIndex={0}
                    >
                        {cardDetails.assignee}
                    </span>
                    <span className={classNames.contributorImage}>
                        <Image
                            src={assigneeProfilePic}
                            alt="Assignee profile picture"
                            onError={contributorImageOnError}
                            width={45}
                            height={45}
                        />
                    </span>
                </span>
            </div>
            {isUserAuthorized && showEditButton && (
                <div className={classNames.editButton}>
                    <Image
                        src="/pencil.webp"
                        alt="edit Pencil"
                        width={iconWidth}
                        height={iconHeight}
                        onClick={onEditEnabled}
                    />
                </div>
            )}
        </div>
    );
};

export default Card;
