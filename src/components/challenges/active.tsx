import { FC, useState } from 'react';
// import classNames from '@/components/challenges/styles.module.scss';
// import Details from '@/components/challenges/details';
// import Participants from '@/components/challenges/participants';
import Card from '@/components/Card/index';

type ActiveProps = {
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

const Active: FC<ActiveProps> = ({ content }) => {
  const [isUserSubscribed, setUserSubscribed] = useState(content.is_user_subscribed);

  // const subscribeEventHandler = async () => {
  //   setUserSubscribed(1);
  // };

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
      button={
        {
          text: 'I will do this',
          onClick: async () => {
            if (!isUserSubscribed) {
              (setUserSubscribed(1));
            }
          },
        }
      }
      key={content.title}
    />
    // <div className={classNames.boxContent}>
    //   <p className={classNames.heading}>{content.title}</p>
    //   <Details text="Level" value={content.level} />
    //   <Details text="Challenge Started" value={content.start_date} />
    //   <Details text="Challenge Ends" value={content.end_date} />
    //   <div className={classNames.participants}>
    //     <Details
    //       text="Active Participants"
    //       value={content.participants.length}
    //     />
    //     <Participants participants={content.participants} />
    //   </div>
    //   {
    //     !isUserSubscribed && (
    //       <p className={classNames.activeBtn}>
    //         <button
    //           onClick={subscribeEventHandler}
    //           onKeyDown={subscribeEventHandler}
    //           tabIndex={0}
    //           type="button"
    //         >
    //           I will do this
    //         </button>
    //       </p>
    //     )
    //   }
    // </div>
  );
};

export default Active;
