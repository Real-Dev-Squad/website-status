import { FunctionComponent } from 'react';
import Card from '../card';
import classNames from './section.module.scss';

type Props = {
  heading: string,
  content: {
    title: string,
    state: string,
    createdAt: string,
    updatedAt: string,
    url: string,
    username: string
  }
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