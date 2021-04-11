import { FC } from 'react';
import { task } from '@/components/constants/types';
import Card from '@/components/Card/index';

type Props = {
  content: task,
};

const taskCard: FC<Props> = ({ content }) => {
  const {
    title,
    endsOn,
    startedOn,
    ownerId,
    status,
  } = content;

  const ownerProfilePic = `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}${ownerId}/img.png`;

  const taskData = {
    Estimated_completion: endsOn,
    Started: startedOn,
    Status: status,
    Owner: ownerId,
  };
  const taskArray: any[] = [];
  const getTask = () => {
    Object.entries(taskData).forEach(([key, value]) => {
      taskArray.push({ key, value });
    });
    return taskArray;
  };

  const arrayOfOwner: any[] = [{ userName: ownerId, imgUrl: ownerProfilePic, key: ownerId }];

  return (
    <Card
      title={{ text: title }}
      data={getTask()}
      participants={arrayOfOwner}
      key={title}
    />
  );
};

export default taskCard;
