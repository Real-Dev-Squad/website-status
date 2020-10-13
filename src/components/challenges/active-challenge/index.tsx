import classNames from './active-challenge.module.scss';

const ActiveChallenge = () => {
  return (
    <div className={classNames.activeChallengeBox}>
      <div className={classNames.activeBoxConent}>
        <p className={classNames.heading}>Sherlock and Anagrams</p>
        <p>
          <span className={classNames.description}>Level</span>:
          <span className={classNames.descValue}> Easy</span>
        </p>
        <p>
          <span className={classNames.description}>Challenge Started</span>:
          <span className={classNames.descValue}> 14 Days Ago</span>
        </p>
        <p>
          <span className={classNames.description}>Challenge Ends</span>:
          <span className={classNames.descValue}> Today</span>
        </p>
        <p>
          <span className={classNames.description}>Active Participants</span>:
          <span className={classNames.descValue}> 5 Members</span>
        </p>
        <p className={classNames.activeBtn}>
          <button>I will do this</button>
        </p>
      </div>
    </div>
  );
};

export default ActiveChallenge;
