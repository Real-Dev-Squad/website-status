import { FC } from 'react';
import Card from '@/components/pullRequests/card';
import classNames from '@/components/pullRequests/section/section.module.scss';

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

function cards(content: Array<pullRequestType>) {
  return content.map((pullRequest) => (
    <Card pullRequest={pullRequest} key={pullRequest.title} />
  ));
}

const Section: FC<Props> = ({ heading, content }) => (
  <div className={classNames.section}>
    <div className={classNames.heading}>{heading}</div>
    <div className={classNames.cardContainer}>{cards(content)}</div>
  </div>
);

export default Section;
