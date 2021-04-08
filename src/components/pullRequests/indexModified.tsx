import { FC } from 'react';
import Card from '@/components/Card/index';

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
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  const presentDate = new Date();

  const createdAgo = `${Math.ceil(
    (presentDate.getTime() - created.getTime()) / (1000 * 3600 * 24),
  )}days ago`;
  const updatedAgo = `${Math.ceil(
    (presentDate.getTime() - updated.getTime()) / (1000 * 3600 * 24),
  )}days ago`;

  const prData = {
    CreatedBy: username,
    Created: createdAgo,
    Updated: updatedAgo,
  };
  const PR:any[] = [];
  function getPr() {
    // eslint-disable-next-line array-callback-return
    Object.entries(prData).map(([key, value]) => {
      PR.push({ key, value });
    });
    return PR;
  }

  return (
    <Card
      title={{ text: title, link: url }}
      data={getPr()}
      key={title}
    />
  );
};
export default pullRequest;
