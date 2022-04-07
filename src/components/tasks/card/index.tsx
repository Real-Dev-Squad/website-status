import { FC, useState } from 'react';
import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
import task from '@/interfaces/task.type';
import { AVAILABLE, BLOCKED, COMPLETED, VERIFIED } from '@/components/constants/beautified-task-status';

const moment = require('moment');

type Props = {
  content: task;
  shouldEdit: boolean;
  onContentChange: any;
  darkMode?: boolean
};

const Card: FC<Props> = ({
  content,
  shouldEdit = false,
  onContentChange = () => undefined,
  darkMode,
}) => {
  const statusRedList = [BLOCKED];
  const statusNotOverDueList = [COMPLETED, VERIFIED, AVAILABLE];
  const cardDetails = content;
  const [assigneeProfilePic, setAssigneeProfilePic] = useState(
    `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`,
  );
  const contributorImageOnError = () => setAssigneeProfilePic('/dummyProfile.png');

  const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  const statusFontColor = !statusRedList.includes(cardDetails.status) ? '#00a337' : '#f83535';
  const iconHeight = '25px';
  const iconWidth = '25px';

  const cardClassNames = [classNames.card];

  function isTaskOverdue() {
    const currentDate = new Date();
    const timeLeft = localEndsOn.valueOf() - currentDate.valueOf();
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
  if (isTaskOverdue()) {
    cardClassNames.push(classNames.overdueTask);
  }
  return (
    <div className={darkMode ? classNames.darkTheme : classNames.lightTheme}>
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
              className={classNames.cardCalendarIcon}
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
    </div>
  );
};

export default Card;
