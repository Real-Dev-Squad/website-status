import { FC, useState } from 'react';
import Card from '@/components/Card/index';
import details from '@/components/challenges/details';
import participantsDetails from '@/components/challenges/participants';
import { toast } from 'react-toastify';

const SUBSCRIBE_TO_CHALLENGE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/subscribe`;

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
    is_active: boolean;
    is_user_subscribed: number;
  },
  userId: string
};

const Active: FC<ActiveProps> = ({ content, userId }) => {
  const [isUserSubscribed, setUserSubscribed] = useState(content.is_user_subscribed);

  const subscibeUser = () => {
    fetch(SUBSCRIBE_TO_CHALLENGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        challenge_id: content.id,
        user_id: userId,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => setUserSubscribed(res.is_user_subscribed))
      .catch((err) => {
        toast.error(err, {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <Card
      title={{ text: content.title }}
      data={details(content)}
      participants={participantsDetails(content)}
      button={
        isUserSubscribed ? {
          text: 'I will do this',
          onClick: subscibeUser,
        }
          : undefined
      }
      key={content.title}
    />
  );
};

export default Active;
