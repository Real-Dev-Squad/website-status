import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IdleUser } from '@/interfaces/idleUser.type';
import getIdleSinceText from '@/helperFunctions/getIdleSinceText';
import styles from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

type Props = {
  user: IdleUser
}

const Card: FC<Props> = ({ user }) => {
  const userImg = user?.picture?.url
  const USER_PROFILE_URL = `https://members.realdevsquad.com/${user.username}`;
  const idleSinceText = getIdleSinceText(user.currentStatus.from)

  return (
    <div
      className={styles.card}
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
        <span className={styles.name}>{user.full_name}</span>
      </Link>
      <span data-testid="idle-since">{idleSinceText}</span>
    </div>
  );
};

export default Card;
