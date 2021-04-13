import { FC, useState } from 'react';
import { task } from '@/components/constants/types';
import Card from '@/components/Card/index';

const moment = require('moment');

type Props = {
  content: task,
};

const taskCard: FC<Props> = ({ content }) => {
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

  const taskData = {
    Estimated_completion: fromNowEndsOn,
    Started: fromNowStartedOn,
    Status: status,
  };
  const taskArray: any[] = [];
  const getTask = () => {
    Object.entries(taskData).forEach(([key, value]) => {
      taskArray.push({ key, value });
    });
    return taskArray;
  };

  const owner = {
    userName: assignee,
    imgUrl: assigneeProfilePic,
    onError: contributorImageOnError,
    key: assignee,
  };

  return (
    <div>
      <Card
        title={{ text: title }}
        data={getTask()}
        owner={owner}
        key={title}
      />
    </div>
  );
};

export default taskCard;
