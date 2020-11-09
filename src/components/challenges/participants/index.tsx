import { FunctionComponent } from 'react';
import classNames from './participants.module.scss';

type IndexProps = {
  participants: {
    rds_member_id: string;
  }[];
};
const Index: FunctionComponent<IndexProps> = ({ participants }) => {
  const listOfParticipant = participants.map((user, index) => {
    return (
      <li key={index} className={classNames.participantsList}>
        <img
          src={`https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${user.rds_member_id}/img.png`}
          alt={user.rds_member_id}
        />
      </li>
    );
  });
  return <ul className={classNames.participantsLists}>{listOfParticipant}</ul>;
};

export default Index;
