import { FunctionComponent } from 'react';
import classNames from './card.scss'

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

const Card: FunctionComponent<Props> = ({ pullRequest }) => {
  const {
    title,
    completionDate,
    startedAt,
    author,
    profilePicture,
    issueStatus
  } = pullRequest

  function informationElement(title, value) {
    return (
      <span className={classNames.statusElement}>
        <span className={classNames.statusLable}>{`${title}: `}</span><strong>{value}</strong>
      </span>
    )
  }

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      {informationElement('Estimated completion', completionDate)}
      {informationElement('Started', startedAt)}
      <div className={classNames.cardFooter}>
        <div className={classNames.profilePicture}>
          <img src={profilePicture} alt="Author profile picture" />
          <strong>{author}</strong>
        </div>
        {informationElement('Status', issueStatus)}
      </div>
    </div>
  )
}

export default Card;