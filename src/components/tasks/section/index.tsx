import { FunctionComponent } from 'react';
import Card from '../card';
import classNames from './section.scss';

type pullRequest = {
  title: string,
  completionDate: string,
  startedAt: string,
  author: string,
  profilePicture: string,
  issueStatus: string
}

type Props = {
  heading: string,
  content: pullRequest[]
}

const Section: FunctionComponent<Props> = ({ heading, content }) => {

  const cards = content.map((pullRequest, i) => {
    return <Card pullRequest={pullRequest} key={i} />
  })

  return (
    <div className={classNames.section}>
      <div className={classNames.heading}>{heading}</div>
      <div className={classNames.cardContainer}>
        {cards}
      </div>
    </div>
  )
}

export default Section;