import classNames from './styles.module.scss';

const Complete = ({content}) => {
  return (
    <div className={classNames.boxConent}>
      <p className={classNames.heading}>{content.title}</p>
      <p>
        <span className={classNames.description}>Level</span>:
        <span className={classNames.descValue}>{content.level}</span>
      </p>
      <p>
        <span className={classNames.description}>Challenge Started</span>:
        <span className={classNames.descValue}>{content.startDate}</span>
      </p>
      <p>
        <span className={classNames.description}>Challenge Ends</span>:
        <span className={classNames.descValue}>{content.endDate}</span>
      </p>
      <p>
        <span className={classNames.description}>Active Participants</span>:
        <span
          className={classNames.descValue}
        >{`${content.participantsCnt} Members`}</span>
      </p>
      <p className={classNames.viewStats}>
        <a href='#'>View Stats</a>
      </p>
    </div>
  );
};

export default Complete;
