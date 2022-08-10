import { FC, useState } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import task from '@/interfaces/task.type';
import { AVAILABLE, BLOCKED, COMPLETED, VERIFIED } from '@/components/constants/beautified-task-status';

const moment = require('moment');

type Props = {
  content: task;
  shouldEdit: boolean;
  onContentChange: (changeId: string, changeObject: object) => void;
};

const Card: FC<Props> = ({
  content,
  shouldEdit = false,
  onContentChange,
}) => {
  const statusRedList = [BLOCKED];
  const statusNotOverDueList = [COMPLETED, VERIFIED, AVAILABLE];
  const cardDetails = content;
  const [assigneeProfilePic, setAssigneeProfilePic] = useState(
    `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`,
  );
  const contributorImageOnError = () => setAssigneeProfilePic('/dummyProfile.png');

  const localStartedOn = inputParser(cardDetails.startedOn);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = inputParser(cardDetails.endsOn);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  const statusFontColor = !statusRedList.includes(cardDetails.status) ? '#00a337' : '#f83535';
  const iconHeight = '25px';
  const iconWidth = '25px';

  const cardClassNames = [classNames.card];

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
        const toTimeStamp = new Date(`${toChange[changedProperty]}`).getTime() / 1000;
        toChange[changedProperty] = toTimeStamp;
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

  function getPercentageOfDays(startedOn: string, endsOn: string): number {
    const startDate = inputParser(startedOn)
    const endDate = inputParser(endsOn)

    // It provides us with total days that are there for the the project and number of days left
    const totalDays = endDate.diff(startDate, 'days')
    const daysLeft = endDate.diff(new Date(), 'days')

    // It provides the percentage of days left
    const percentageofDays = daysLeft/totalDays * 100
    return percentageofDays
  }
  
  function handleProgressColor(percentCompleted: number, startedOn: string, endsOn: string): string {
    const percentageofDays = getPercentageOfDays(startedOn, endsOn)

    if(percentageofDays >= percentCompleted) {
      return classNames.progressGreen
    } else if(percentageofDays < 50 && percentCompleted > 75) {
      return classNames.progressOrange
    } else if(percentageofDays < 25 && percentCompleted > 35) {
      return classNames.progressRed
    } else {
      return classNames.progressYellow
    }
  }

  if (isTaskOverdue()) {
    cardClassNames.push(classNames.overdueTask);
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
          <span
            className={classNames.cardStrongFont}
            contentEditable={shouldEdit}
            onKeyPress={(e) => handleChange(e, 'endsOn')}
            role="button"
            tabIndex={0}
          >
            {fromNowEndsOn}
          </span>
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
    </div>
  );
};

export default Card;