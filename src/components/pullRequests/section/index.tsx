import { FunctionComponent } from 'react';
import Card from '../card';
import classNames from './section.module.scss';

type Props = {
  heading: string,
  content: []
}

function cards(content){
  const cards = content.map((pullRequest, i) => {
    return <Card pullRequest={pullRequest} key={i} />
  })
  return cards
}

const Section: FunctionComponent<Props> = ({ heading, content }) => {
  return (
    <div className={classNames.section}>
      <div className={classNames.heading}>{heading}</div>
      <div className={classNames.cardContainer}>
        {cards(content)}
      </div>
    </div>
  )
}

export default Section;