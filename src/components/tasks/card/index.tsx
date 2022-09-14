import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import task from '@/interfaces/task.type';
import { AVAILABLE, BLOCKED, COMPLETED, VERIFIED } from '@/components/constants/beautified-task-status';
import getDateInString from '@/helperFunctions/getDateInString';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import { useAppContext } from '@/context';
import { ALT_KEY } from '@/components/constants/key';
import { type } from 'os';
import AssigneeDropdownMenu from "./AssigneeDropdownMenu"
import { on } from 'process';

const moment = require('moment');

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
    `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`,
  );
  const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
  const { SUCCESS, ERROR } = ToastTypes;

  const [IsUserAuthorized, setIsUserAuthorized] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [isAssigneeDropdownOpen, setisAssigneeDropdownOpen] = useState(false)
  const assigneeNameRefElement = useRef<HTMLElement>(null)
  const [keyLongPressed] = useKeyLongPressed();
  useEffect(() => {
    const isAltKeyLongPressed = keyLongPressed === ALT_KEY;
    if (isAltKeyLongPressed) {
      setShowEditButton(true)
    }
  }, [keyLongPressed]);

  const context = useAppContext();
  const { actions } = context || {}

  const contributorImageOnError = () => setAssigneeProfilePic('/dummyProfile.png');

  const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  const statusFontColor = !statusRedList.includes(cardDetails.status) ? '#00a337' : '#f83535';
  const iconHeight = '25px';
  const iconWidth = '25px';

  const date: string = !!localEndsOn ? getDateInString(localEndsOn) : '';
  const [dateTimes, setDateTimes] = useState(date);

  function isTaskOverdue() {
    const timeLeft = localEndsOn.valueOf() - Date.now();
    return !statusNotOverDueList.includes(cardDetails.status) && timeLeft <= 0;
  }

  function stripHtml(html: string) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function handleChange(event: any, changedProperty: keyof typeof cardDetails) {
    if (event.key === 'Enter') {
      const toChange: any = cardDetails;
      toChange[changedProperty] = stripHtml(event.target.innerHTML);

      if (changedProperty === 'endsOn' || changedProperty === 'startedOn') {
        const toTimeStamp = new Date(`${event.target.value}`).getTime() / 1000;
        toChange[changedProperty] = toTimeStamp;
      }

      onContentChange(toChange.id, {
        [changedProperty]: toChange[changedProperty],
      });
    }
  }

  const updateAssignee = (username: string) => {
    const toChange: any = cardDetails;
    const changedProperty: keyof typeof cardDetails = 'assignee';
    toChange[changedProperty] = username
    if (assigneeNameRefElement.current !== null) {
      assigneeNameRefElement.current.innerText = username
    }
    setAssigneeProfilePic(
      `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`
    )

    onContentChange(toChange.id, {
      [changedProperty]: toChange[changedProperty]
    })
  }

  function inputParser(input: string) {
    const parsedDate = moment(new Date(parseInt(input, 10) * 1000))
    return parsedDate
  }

  function getPercentageOfDaysLeft(startedOn: string, endsOn: string): number {
    const startDate = inputParser(startedOn)
    const endDate = inputParser(endsOn)

    // It provides us with total days that are there for the the project and number of days left
    const totalDays = endDate.diff(startDate, 'days')
    const daysLeft = endDate.diff(new Date(), 'days')

    // It provides the percentage of days left
    const percentageOfDaysLeft = daysLeft / totalDays * 100
    return percentageOfDaysLeft
  }

  function handleProgressColor(percentCompleted: number, startedOn: string, endsOn: string): string {
    const percentageOfDaysLeft = getPercentageOfDaysLeft(startedOn, endsOn)
    const percentIncomplete = 100 - percentCompleted
    if (percentCompleted === 100 || percentageOfDaysLeft >= percentIncomplete) {
      return classNames.progressGreen
    }

    if ((percentageOfDaysLeft < 25 && percentIncomplete > 35) || (percentageOfDaysLeft <= 0 && percentIncomplete > 0)) {
      return classNames.progressRed
    }

    if (percentageOfDaysLeft < 50 && percentIncomplete > 75) {
      return classNames.progressOrange
    }

    return classNames.progressYellow;
  }

  function renderDate(fromNowEndsOn: string, shouldEdit: boolean) {
    if (shouldEdit) {
      return (
        <input
          type='date'
          onChange={(e) => setDateTimes(e.target.value)}
          onKeyPress={(e) => handleChange(e, 'endsOn')}
          value={dateTimes}
        />
      )
    }
    return (
      <span
        className={classNames.cardStrongFont}
        role='button'
        tabIndex={0}
      >
        {fromNowEndsOn}
      </span>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const { admin: adminUser, super_user: superUser } = data?.roles
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);

  const onEditEnabled = () => {
    actions.onEditRoute()
  }

  return (
    <div
      className={`
        ${classNames.card}
        ${isTaskOverdue() && classNames.overdueTask}
    `}
    >
      <div className={classNames.cardItems}>
        <span
          className={classNames.cardTitle}
          contentEditable={shouldEdit}
          onKeyPress={(e) => handleChange(e, 'title')}
          role="button"
          tabIndex={0}
        >
          {cardDetails.title}
        </span>
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
                ${handleProgressColor(content.percentCompleted, content.startedOn, content.endsOn)}
                ${classNames.progressStyle}
              `}
              style={{ width: `${content.percentCompleted}%` }}>
            </div>
          </div>
          <span>
            {content.percentCompleted}% completed
          </span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span
          className={classNames.cardSpecialFont}
          contentEditable={shouldEdit}
          onKeyPress={(e) => handleChange(e, 'startedOn')}
          role="button"
          tabIndex={0}
        >
          Started
          {' '}
          {fromNowStartedOn}
        </span>
        <span>
          <span className={classNames.cardSpecialFont}>Assignee:</span>
          <span
            className={classNames.cardStrongFont}
            role="button"
            tabIndex={0}
            ref={assigneeNameRefElement}
          >
            {cardDetails.assignee}
          </span>
          <span
            className={`${classNames.contributorImage} ${shouldEdit && classNames.cursorPointer}`}
            onClick={() => setisAssigneeDropdownOpen(!isAssigneeDropdownOpen)}
          >
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
      {IsUserAuthorized && showEditButton &&
        <div className={classNames.editButton}>
          <Image src='/pencil.webp'
            alt='edit Pencil'
            width={iconWidth}
            height={iconHeight}
            onClick={onEditEnabled}
          />
        </div>
      }
      {(IsUserAuthorized && isAssigneeDropdownOpen && shouldEdit) &&
        <AssigneeDropdownMenu
          updateAssignee={updateAssignee}
        />}
    </div>
  );
};

export default Card;