import { FC } from 'react';
import Card from '@/components/Card/index';
import classNames from '@/components/pullRequests/section/section.module.scss';

const moment = require('moment');

type pullRequestType = {
  title: string;
  state: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

type Props = {
  heading: string;
  content: Array<pullRequestType>;
};

function getPrData(pullRequest: pullRequestType) {
  const {
    state, createdAt, updatedAt, username,
  } = pullRequest;

  const localUpdatedAt = new Date(updatedAt);
  const fromNowUpdatedAt = moment(localUpdatedAt).fromNow();

  const prData = {
    State: state,
    CreatedAt: createdAt,
    UpdatedAt: fromNowUpdatedAt,
    Username: username,
  };
  const PR: any[] = [];
  function getPr() {
    // eslint-disable-next-line array-callback-return
    Object.entries(prData).map(([key, value]) => {
      PR.push({ key, value });
    });
    return PR;
  }

  return (
    <Card
      title={{ text: pullRequest.title, link: pullRequest.url }}
      data={getPr()}
      key={pullRequest.title}
    />
  );
}

function cards(content: Array<pullRequestType>) {
  return content.map((pullRequest) => (
    getPrData(pullRequest)
  ));
}

const Section: FC<Props> = ({ heading, content }) => (
  <div className={classNames.section}>
    <div className={classNames.heading}>{heading}</div>
    <div className={classNames.cardContainer}>{cards(content)}</div>
  </div>
);

export default Section;
