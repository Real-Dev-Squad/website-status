import { FC } from 'react';
import classNames from '@/components/tasks/mine_card/card.module.scss';
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
    startedOn,
    status,
  } = content;

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      {informationElement('Started', startedOn)}
      {informationElement('Status', status)}
      
    </div>
  );
};

export default Card;
