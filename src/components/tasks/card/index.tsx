import { FC } from 'react';
import classNames from './card.module.scss';

type Props = {
  pullRequest: {
    title: string,
    completionDate: string,
    startedAt: string,
    author: string,
    profilePicture: string,
    issueStatus: string
  }
}

const informationElement = (title, value) => (
  <span className={classNames.statusElement}>
    <span className={classNames.statusLable}>{`${title}: `}</span>
    <strong>{value}</strong>
  </span>
);

const Card: FC<Props> = ({ pullRequest }) => {
  const {
    title,
    completionDate,
    startedAt,
    author,
    profilePicture,
    issueStatus,
  } = pullRequest;

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      {informationElement('Estimated completion', completionDate)}
      {informationElement('Started', startedAt)}
      <div className={classNames.cardFooter}>
        <div className={classNames.profilePicture}>
          <img src={profilePicture} alt="Author profile" />
          <strong>{author}</strong>
        </div>
        {informationElement('Status', issueStatus)}
      </div>
    </div>
  );
};

export default Card;
