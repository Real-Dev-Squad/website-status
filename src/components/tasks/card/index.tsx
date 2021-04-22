/* eslint-disable no-constant-condition */
import { FC, useState } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { task } from '@/components/constants/types';
import Image from 'next/image';

const moment = require('moment');

type Props = {
  content: task,
};

const Card: FC<Props> = ({ content }) => {
  const {
    title,
    endsOn,
    startedOn,
    status,
    assignee,
  } = content;

  const [assigneeProfilePic, setAssigneeProfilePic] = useState(`${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}${assignee}/img.png`);
  const contributorImageOnError = () => setAssigneeProfilePic('dummyProfile.png');

  const localStartedOn = new Date(parseInt(startedOn, 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();

  const statusFontColor = status === 'active' || 'assigned' || 'completed' || 'pending' ? '#00a337' : '#f83535';

  return (
    <div className={classNames.card}>
      <div className={classNames.cardItems}>
        <span className={classNames.cardTitle}>{title}</span>
        <span>
          <span className={classNames.cardSpecialFont}>Status:</span>
          <span className={classNames.cardStatusFont} style={{ color: statusFontColor }}>
            {status}
          </span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span>
          <Image
            src="/calendar-icon.png"
            alt="calendar icon"
            width="25px"
            height="25px"
          />
          <span className={classNames.cardSpecialFont}>
            Due Date
          </span>
          <span className={classNames.cardStrongFont}>{fromNowEndsOn}</span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span className={classNames.cardSpecialFont}>
          Started
          {' '}
          {fromNowStartedOn}
        </span>
        <span>
          <span className={classNames.cardSpecialFont}>Assignee:</span>
          <span className={classNames.cardStrongFont}>{assignee}</span>
          <span>
            <img
              className={classNames.contributorImage}
              src={assigneeProfilePic}
              alt="No contributor"
              onError={contributorImageOnError}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Card;
