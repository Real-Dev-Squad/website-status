import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { idleUser } from '@/interfaces/idleUser.type';
import convertDatetoYMD from '@/helperFunctions/convertDatetoYMD'
import classNames from '@/components/idleUsers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

type Props = {
  user: idleUser
}

const Card: FC<Props> = ({ user }) => {
  const userImg = user?.picture?.url
  const idleSinceDateConverted = convertDatetoYMD(user.currentStatus.from);
  const USER_PROFILE_URL = `https://members.realdevsquad.com/${user.username}`;

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
      <span>{idleSinceDateConverted}</span>
    </div>
  );
};

export default Card;