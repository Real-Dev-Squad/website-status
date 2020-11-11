import { FunctionComponent } from 'react';
import classNames from './card.scss'

type pullRequest = {
  title: string,
  completionDate: string,
  startedAt: string,
  author: string,
  profilePicture: string,
  issueStatus: string
}

type Props = {
  pullRequest: pullRequest
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

  return (
    <div className={classNames.card}>
      <span className={classNames.prTitle}>{title}</span>
      <span className={classNames.statusElement}>
        <span className={classNames.statusLable}>Estimated completion:</span><strong> {completionDate}</strong>
      </span>
      <span className={classNames.statusElement}>
        <span className={classNames.statusLable}>Started:</span><strong> {startedAt}</strong>
      </span>
      <div className={classNames.cardFooter}>
        <div className={classNames.profilePicture}>
          <img src={profilePicture} alt="" />
          <strong>{author}</strong>
        </div>
        <span className={classNames.statusElement}>
          <span className={classNames.statusLable}>Status:</span><strong> {issueStatus}</strong>
        </span>
      </div>
    </div>
  )
}

export default Card;