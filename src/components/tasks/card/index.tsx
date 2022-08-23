import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import task from '@/interfaces/task.type';
import { AVAILABLE, BLOCKED, COMPLETED, VERIFIED } from '@/components/constants/beautified-task-status';
import getDateInString from '@/helperFunctions/getDateInString';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAppContext } from '@/context';

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
  const { actions } = useAppContext();

  const contributorImageOnError = () => setAssigneeProfilePic('/dummyProfile.png');

  const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  const statusFontColor = !statusRedList.includes(cardDetails.status) ? '#00a337' : '#f83535';
  const iconHeight = '25px';
  const iconWidth = '25px';

  const date:string = !!localEndsOn ? getDateInString(localEndsOn) : '';
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
  if (isTaskOverdue()) {
    cardClassNames.push(classNames.overdueTask);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
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

  function handleKeyDown(event: any): void {
    const ALT_KEY = 18;
    if (event.keyCode === ALT_KEY) {
      setShowEditButton(true);
    }
  }

  const debouncedHandler = useDebounce(handleKeyDown, 300);

  useEffect(() => {

    document?.addEventListener('keydown', debouncedHandler);

    return () => {
      document?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    actions.handleToggleButton()
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
            {renderDate(fromNowEndsOn,shouldEdit)}      
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
            contentEditable={shouldEdit}
            onKeyPress={(e) => handleChange(e, 'assignee')}
            role="button"
            tabIndex={0}
          >
            {cardDetails.assignee}
          </span>
          <span
            className={classNames.contributorImage}
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
            onClick={handleClick}
          />
        </div>
      }

      {IsUserAuthorized && showEditButton &&
        <div className={classNames.editButton}>
          <Image src='/pencil.webp'
            alt='edit Pencil'
            width={iconWidth}
            height={iconHeight}
            onClick={handleClick}
          />
        </div>
      }

    </div>
  );
};
export default Card;