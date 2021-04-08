import { FC } from 'react';
// import classNames from '@/components/challenges/styles.module.scss';
// import Details from '@/components/challenges/details';
// import Participants from '@/components/challenges/participants';
import Card from '@/components/Card/index';

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

const Complete: FC<CompleteProps> = ({ content }) => {
  const taskData = {
    Level: content.level,
    Challenge_Started: content.start_date,
    Challenge_Ends: content.end_date,
    Active_Participants: content.participants.length,
  };

  const task: any[] = [];
  function getTask() {
    // eslint-disable-next-line array-callback-return
    Object.entries(taskData).map(([key, value]) => {
      task.push({ key, value });
    });
    return task;
  }

  const arrayOfParticipants: any[] = content.participants;

  const participants: any[] = [];
  function getParticipants(users: any[]) {
    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      participants.push({
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.rds_member_id,
        imgUrl: user.img,
        key: user.rds_member_id,
      });
    });
    return participants;
  }

  return (
    <Card
      title={{ text: content.title }}
      data={getTask()}
      participants={getParticipants(arrayOfParticipants)}
      key={content.title}
    />
  );
};

export default Complete;
