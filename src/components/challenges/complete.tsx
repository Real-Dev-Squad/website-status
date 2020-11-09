import { FunctionComponent } from 'react';
import classNames from './styles.module.scss';
import Details from './details';
import Participants from './participants';

type CompleteProps = {
  content: {
    is_user_subscribed: number;
    title: string;
    level: string;
    start_date: string;
    end_date: string;
    participants: [];
  };
};

const Complete: FunctionComponent<CompleteProps> = ({ content }) => {
  return (
    <div className={classNames.boxConent}>
      <p className={classNames.heading}>{content.title}</p>
      <Details text='Level' value={content.level} />
      <Details text='Challenge Started' value={content.start_date} />
      <Details text='Challenge Ends' value={content.end_date} />
      <div className={classNames.participants}>
        <Details text='Participants' value={content.participants.length} />
        <Participants participants={content.participants} />
      </div>
      <p className={classNames.viewStats}>
        <a href='#'>View Stats</a>
      </p>
    </div>
  );
};

export default Complete;
