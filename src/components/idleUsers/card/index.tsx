import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IdleUser } from '@/interfaces/idleUser.type';
import classNames from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

type Props = {
  user: IdleUser
}

export const calculateIdleSince = (idleSince: string) => {
  const presentDate = new Date();
  return `${Math.ceil(
    (presentDate.getTime() - parseInt(idleSince)) / (1000 * 3600 * 24),
  )} days ago`;
}

const Card: FC<Props> = ({ user }) => {
  const userImg = user?.picture?.url
  const USER_PROFILE_URL = `https://members.realdevsquad.com/${user.username}`;
  const idleSinceDate = calculateIdleSince(user.currentStatus.from)

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
        data-testid='user-image'
      />
      <Link href={USER_PROFILE_URL}>
        <span className={classNames.name}>{user.full_name}</span>
      </Link>
      <span data-testid="idle-since">{idleSinceDate}</span>
    </div>
  );
};

export default Card;
