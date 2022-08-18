import { FC } from 'react';
import Card from '@/components/Card/index';
import prDetails from '@/components/pullRequests/PRDetails';
import dateFromNow from '@/utils/renderDate';

interface pullRequestType {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

const pullRequest: FC<pullRequestType> = ({
  title,
  username,
  createdAt,
  updatedAt,
  url,
}) => {
  const createdAgo = dateFromNow(createdAt);
  const updatedAgo = dateFromNow(updatedAt);

  const prData = {
    CreatedBy: username,
    Created: createdAgo,
    Updated: updatedAgo,
  };

  return (
    <Card
      title={{ text: title, link: url }}
      data={prDetails(prData)}
      key={title}
    />
  );
};
export default pullRequest;
