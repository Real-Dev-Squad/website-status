import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IdleUser } from '@/interfaces/idleUser.type';
import classNames from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

type Props = {
  user: IdleUser
}

const Card: FC<Props> = ({ user }) => {
  const userImg = user?.picture?.url
  const USER_PROFILE_URL = `https://members.realdevsquad.com/${user.username}`;
  const idleFromDate = new Date(user.currentStatus.from);
  const presentDate = new Date();

  const idleSince = `${Math.ceil(
    (presentDate.getTime() - idleFromDate.getTime()) / (1000 * 3600 * 24),
  )} days ago`;
  
  return (
    <div
      className={classNames.card}
      aria-hidden="true"
    >
      <Image
        src={userImg || DUMMY_PROFILE}
        alt={user.full_name}
        width={150}
        height={150}
      />
      <Link href={USER_PROFILE_URL}>
        <span className={classNames.name}>{user.full_name}</span>
      </Link>
      <span>{idleSince}</span>
    </div>
  );
};

export default Card;
