import { FC } from 'react';
import Card from '../card';
import classNames from './section.module.scss';

type Props = {
  heading: string;
  content: [];
};

function cards(content) {
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
