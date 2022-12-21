import { FC } from 'react';
import Image from 'next/image';
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
      <span className={classNames.name}>{user.full_name}</span>
      <span>{idleSinceDateConverted}</span>
    </div>
  );
};

export default Card;
