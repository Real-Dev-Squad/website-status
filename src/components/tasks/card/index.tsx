import { FC, useState } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { task } from '@/components/constants/types';

const moment = require('moment');

type Props = {
  content: task,
};

const informationElement = (title: string, value: string) => (
  <span className={classNames.statusElement}>
    <span className={classNames.statusLable}>{`${title}: `}</span>
    <strong>{value}</strong>
  </span>
);

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
  const readableStartedOn = `${localStartedOn.toLocaleDateString()}, ${localStartedOn.toLocaleTimeString()}`;

  const localEndsOn = new Date(parseInt(endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  const readableEndsOn = `${localEndsOn.toLocaleDateString()}, ${localEndsOn.toLocaleTimeString()}`;

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      <div className={classNames.datetime}>
        <span className={classNames.nothover}>
          {informationElement('Estimated completion', fromNowEndsOn)}
        </span>
        <span className={classNames.onhover}>
          {informationElement('Estimated completion', readableEndsOn)}
        </span>
      </div>
      <div className={classNames.datetime}>
        <span className={classNames.nothover}>
          {informationElement('Started', fromNowStartedOn)}
        </span>
        <span className={classNames.onhover}>
          {informationElement('Started', readableStartedOn)}
        </span>
      </div>
      <div className={classNames.cardFooter}>
        <div className={classNames.profilePicture}>
          <img
            src={assigneeProfilePic}
            alt="No contributor"
            onError={contributorImageOnError}
          />
          <strong>{assignee || 'No contributor'}</strong>
        </div>
        {informationElement('Status', status)}
      </div>
    </div>
  );
};

export default Card;
