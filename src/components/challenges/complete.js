import classNames from './styles.module.scss';
import Label from '../label/label';

const Complete = ({ content }) => {
  return (
    <div className={classNames.boxConent}>
      <p className={classNames.heading}>{content.title}</p>
      <Label text='Level' value={content.level} />
      <Label text='Challenge Started' value={content.start_date} />
      <Label text='Challenge Ends' value={content.end_date} />
      <Label text='Active Participants' value={content.participants.length} />
      <p className={classNames.viewStats}>
        <a href='#'>View Stats</a>
      </p>
    </div>
  );
};

export default Complete;
