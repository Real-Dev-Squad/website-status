import { FunctionComponent } from 'react';

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
    <>
      <style jsx>{`
        .card {
          border: 0.2rem solid black;
          border-radius: 0.5rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          max-width: 25rem;
          margin-bottom: 2rem;
          cursor: pointer;
        }

        .prTitle {
          color: #041484;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .cardFooter {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .profilePicture {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 6rem;
        }

        .profilePicture > img {
          width: 3rem;
          border-radius: 50%;
        }

        .statusLable {
          color: grey;
          font-weight: bold;
        }
      `}</style>
      <div className="card">
        <span className="prTitle">{title}</span>
        <span className="statusElement">
          <span className="statusLable">Estimated completion:</span><strong> {completionDate}</strong>
        </span>
        <span className="statusElement">
          <span className="statusLable">Started:</span><strong> {startedAt}</strong>
        </span>
        <div className="cardFooter">
          <div className="profilePicture">
            <img src={profilePicture} alt="" />
            <strong>{author}</strong>
          </div>
          <span className="statusElement">
            <span className="statusLable">Status:</span><strong> {issueStatus}</strong>
          </span>
        </div>
      </div>
    </>
  )
}

export default Card;