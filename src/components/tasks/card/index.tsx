import { FC } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { task } from '@/components/constants/types';

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
    ownerId,
    status,
  } = content;

  const ownerProfilePic = `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}${ownerId}/img.png`;

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      {informationElement('Estimated completion', endsOn)}
      {informationElement('Started', startedOn)}
      <div className={classNames.cardFooter}>
        <div className={classNames.profilePicture}>
          <img
            src={ownerProfilePic}
            alt="ownerId profile"
          />
          <strong>{ownerId}</strong>
        </div>
        {informationElement('Status', status)}
      </div>
    </div>
  );
};

export default Card;
