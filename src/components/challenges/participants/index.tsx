import { FC } from 'react';
import classNames from '@/components/challenges/participants/participants.module.scss';

type IndexProps = {
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
};

const Index: FC<IndexProps> = ({ participants }) => {
  const listOfParticipant = participants.map((user) => (
    <li key={user.user_id} className={classNames.participantsList}>
      <img
        src={`https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${user.rds_member_id}/img.png`}
        alt={user.rds_member_id}
      />
    </li>
  ));
  return <ul className={classNames.participantsLists}>{listOfParticipant}</ul>;
};

export default Index;
