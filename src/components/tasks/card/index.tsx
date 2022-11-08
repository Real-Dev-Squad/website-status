import { FC, useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import getDateInString from '@/helperFunctions/getDateInString';
import { useKeyLongPressed } from '@/hooks/useKeyLongPressed';
import task from '@/interfaces/task.type';
import { AVAILABLE, BLOCKED, COMPLETED, VERIFIED } from '@/components/constants/beautified-task-status';
import { ALT_KEY } from '@/components/constants/key';
import classNames from '@/components/tasks/card/card.module.scss';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const statusRedList = [BLOCKED];
  const statusNotOverDueList = [COMPLETED, VERIFIED, AVAILABLE];
  const cardDetails = content;
  const [editTitle, setEditTitle] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editStartedOn, setEditStartedOn] = useState(false);
  const [editEndsOn, setEditEndsOn] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [editProgress, setEditProgress] = useState(false);
  const [assigneeProfilePic, setAssigneeProfilePic] = useState(
    `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`,
  );
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const [showEditButton, setShowEditButton] = useState(false);
  const [keyLongPressed] = useKeyLongPressed();
  useEffect(() => {
    const isAltKeyLongPressed = keyLongPressed === ALT_KEY;
    if (isAltKeyLongPressed) {
      setShowEditButton(!showEditButton)
    }
  }, [keyLongPressed]);
  useEffect(() => {
    if(shouldEdit){
      if(!isUserAuthorized){
        setEditTitle(true);
        setEditStatus(true);  
        setEditProgress(true);
      } else{
        setEditTitle(true);
        setEditStatus(true);  
        setEditProgress(true);
        setEditEndsOn(true);
        setEditStartedOn(true);
        setEditAssignee(true);
      }
    } else{
      setEditTitle(false);
      setEditStatus(false);  
      setEditProgress(false);
      setEditEndsOn(false);
      setEditStartedOn(false);
      setEditAssignee(false);
    }
  },[shouldEdit])
  const context = useAppContext() ;
  const { actions } = context || {}

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

      if(changedProperty === 'percentCompleted'){
        toChange[changedProperty] = parseInt(event.target.innerHTML);
      }

      onContentChange(toChange.id, {
        [changedProperty]: toChange[changedProperty],
      });
    }
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
    const percentageOfDaysLeft = daysLeft/totalDays * 100
    return percentageOfDaysLeft
  }
  
  function handleProgressColor(percentCompleted: number, startedOn: string, endsOn: string): string {
    const percentageOfDaysLeft = getPercentageOfDaysLeft(startedOn, endsOn)
    const percentIncomplete = 100 - percentCompleted
    if(percentCompleted === 100 || percentageOfDaysLeft >= percentIncomplete) {
      return classNames.progressGreen
    }

    if((percentageOfDaysLeft < 25 && percentIncomplete > 35) || (percentageOfDaysLeft<=0 && percentIncomplete>0)) {
      return classNames.progressRed
    }
    
    if(percentageOfDaysLeft < 50  && percentIncomplete > 75) {
      return classNames.progressOrange
    }
    
    return classNames.progressYellow;
  }

  function renderDate(fromNowEndsOn: string, shouldEdit: boolean){
    if(shouldEdit){
      return(
        <input
        type='date'
        onChange={(e) => setDateTimes(e.target.value)}
        onKeyPress={(e) => handleChange(e, 'endsOn')}
        value={dateTimes}
      />
      )
    } 
    return(  
      <span
          className={classNames.cardStrongFont}
          role='button'
          tabIndex={0}
        >
          {fromNowEndsOn}
      </span>
      )
  }

  const onEditEnabled = () => {
    actions.onEditRoute()
  }

  const editButtonCheck = () => {
    if(isUserAuthorized && showEditButton){
      return true;
    } else if(router.route === '/mine'){
      return true;
    } else{
      return false;
    }
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
          contentEditable={editTitle}
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
            contentEditable={editStatus}
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
            {renderDate(fromNowEndsOn,editEndsOn)}      
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
            <span
              className={classNames.cardStrongFont}
              contentEditable={editProgress}
              onKeyPress={(e) => handleChange(e, 'percentCompleted')}
              role="button"
              tabIndex={0}
            >
              {content.percentCompleted}
            </span>
            <span>
              % completed
            </span>
          </span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span
          className={classNames.cardSpecialFont}
        >
          <span>
            Started
            {' '}
          </span>
          <span
            contentEditable={editStartedOn}
            onKeyPress={(e) => handleChange(e, 'startedOn')}
            role="button"
            tabIndex={0}
          >
            {fromNowStartedOn}
          </span>
        </span>
        <span>
          <span className={classNames.cardSpecialFont}>Assignee:</span>
          <span
            className={classNames.cardStrongFont}
            contentEditable={editAssignee}
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
      {editButtonCheck() &&  
        <div className={classNames.editButton}>
          <Image src='/pencil.webp'
            alt='edit Pencil'
            width={iconWidth}
            height={iconHeight}
            onClick={onEditEnabled}
          />
        </div>
      }
    </div>
  );
};

export default Card;