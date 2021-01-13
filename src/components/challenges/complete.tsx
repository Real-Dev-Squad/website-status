import { FC } from 'react';
import classNames from './styles.module.scss';
import Details from './details';
import Participants from './participants';

type CompleteProps = {
  content: {
    id: number;
    title: string;
    level: string;
    start_date: string;
    end_date: string;
    participants: {
      user_id: string;
      first_name: string;
      last_name: string;
      yoe: number;
      company: string;
      designation: string;
      img: string;
      github_id: string;
      linkedin_id: string;
      twitter_id: string;
      instagram_id: string;
      is_member: number;
      rds_member_id: string;
    }[];
    is_active: number;
    is_user_subscribed: number;
  };
};

const Complete: FC<CompleteProps> = ({ content }) => (
  <div className={classNames.boxContent}>
    <p className={classNames.heading}>{content.title}</p>
    <Details text="Level" value={content.level} />
    <Details text="Challenge Started" value={content.start_date} />
    <Details text="Challenge Ends" value={content.end_date} />
    <div className={classNames.participants}>
      <Details text="Participants" value={content.participants.length} />
      <Participants participants={content.participants} />
    </div>
    <p className={classNames.viewStats}>
      <a href="/">View Stats</a>
    </p>
  </div>
);

export default Complete;
