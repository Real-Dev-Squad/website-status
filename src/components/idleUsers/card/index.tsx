import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IdleUser } from '@/interfaces/idleUser.type';
import getIdleSinceText from '@/helperFunctions/getIdleSinceText';
import styles from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';
import { MEMBERS_URL } from '@/components/constants/url';

type Props = {
  user: IdleUser
}

const Card: FC<Props> = ({ user }) => {
  const userImg = user?.picture?.url;
  const idleSinceText = getIdleSinceText(user.currentStatus.from);
  const profileUrl = `${MEMBERS_URL}/${user.username}`;
  let fullName = user.full_name;

  if (fullName.length > 15) {
    fullName = fullName.split(' ').slice(0, -1).join(' ');
  }
  
  return (
    <a data-testid='profile-card' className={styles.card} href={profileUrl} >
      <Image
        src={userImg || DUMMY_PROFILE}
        alt={user.full_name}
        width={150}
        height={150}
        data-testid='user-image'
        priority={true}
      />
      <p className={styles.name}>{fullName}</p>
      <span data-testid='idle-since'>{idleSinceText}</span>
    </a>
  );
};

export default Card;