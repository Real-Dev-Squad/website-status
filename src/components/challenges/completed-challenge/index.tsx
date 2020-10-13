import classNames from './completed-challenge.module.scss';

const CompletedChallenge = () => {
  return (
    <div className={classNames.completedChallengeBox}>
      <div className={classNames.completedBoxConent}>
        <p className={classNames.heading}>Linked Lists</p>
        <p>
          <span className={classNames.description}>Level</span>:
          <span className={classNames.descValue}> Easy</span>
        </p>
        <p>
          <span className={classNames.description}>Challenge Started</span>:
          <span className={classNames.descValue}> 36 Days Ago</span>
        </p>
        <p>
          <span className={classNames.description}>Challenge Ended</span>:
          <span className={classNames.descValue}> 14 Days Ago</span>
        </p>
        <p>
          <span className={classNames.description}>Participated</span>:
          <span className={classNames.descValue}> 5 Members</span>
        </p>
        <p className={classNames.viewStats}>
          <a href='#'>View Stats</a>
        </p>
      </div>
    </div>
  );
};

export default CompletedChallenge;
