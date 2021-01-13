import { FC } from 'react';
import classNames from './card.module.scss';

const moment = require('moment');

type Props = {
  pullRequest: {
    title: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    username: string;
  };
};

const Card: FC<Props> = ({ pullRequest }) => {
  const {
    title, state, createdAt, updatedAt, url, username,
  } = pullRequest;

  const localCreatedAt = new Date(createdAt);
  const fromNowCreatedAt = moment(localCreatedAt).fromNow();
  const readableCreatedAt = `${localCreatedAt.toDateString()} ${localCreatedAt.toTimeString()}`;

  const localUpdatedAt = new Date(updatedAt);
  const fromNowUpdatedAt = moment(localUpdatedAt).fromNow();
  const readableUpdatedAt = `${localUpdatedAt.toDateString()} ${localUpdatedAt.toTimeString()}`;

  function informationElement(key: string, value: string) {
    return (
      <span className={classNames.statusElement}>
        <span className={classNames.statusLable}>{`${key}: `}</span>
        <strong>{value}</strong>
      </span>
    );
  }
  return (
    <div className={classNames.card}>
      <a
        href="https://www.realdevsquad.com/"
        className={classNames.links}
        target="_blank"
        rel="noreferrer"
      >
        <span className={classNames.prTitle}>{title}</span>
      </a>
      {informationElement('State', state)}
      <div className={classNames.datetime}>
        <span className={classNames.nothover}>
          {informationElement('Created At', fromNowCreatedAt)}
        </span>
        <span className={classNames.onhover}>
          {informationElement('Created At', readableCreatedAt)}
        </span>
      </div>
      <div className={classNames.datetime}>
        <span className={classNames.nothover}>
          {informationElement('Updated At', fromNowUpdatedAt)}
        </span>
        <span className={classNames.onhover}>
          {informationElement('Updated At', readableUpdatedAt)}
        </span>
      </div>
      {informationElement('PR url', url)}
      {informationElement('Username', username)}
      <div className={classNames.Center}>
        <a
          href={url}
          className={classNames.links}
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" className={classNames.activeBtn}>
            Open PR in Github
          </button>
        </a>
      </div>
    </div>
  );
};

export default Card;
