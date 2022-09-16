import { FC, SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import classNames from '@/components/idleMembers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

const IMAGE_URL = process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL;

type Props = {
  idleMemberUserName: string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const [isImageAvailable, setIsImageAvailable] = useState(false);

  const assigneeProfilePic = (name: string) => `${IMAGE_URL}/${name}/img.png`;
  const getMemberDetails = (name: string) => {
    const newWindow = window.open(`https://members.realdevsquad.com/${name}`, '_blank', ' noopener ,norefferrer');
    if (newWindow) newWindow.opener = null;
  };
  const assigneeImageOnError = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsImageAvailable(true);
  };
  return (
    <div
      className={classNames.card}
      onClick={() => getMemberDetails(idleMemberUserName)}
      onKeyDown={() => getMemberDetails(idleMemberUserName)}
      aria-hidden="true"
    >
      <Image
        src={isImageAvailable ? `/${DUMMY_PROFILE}` : assigneeProfilePic(idleMemberUserName)}
        alt={idleMemberUserName}
        onError={assigneeImageOnError}
        width={150}
        height={150}
      />
      <span className={classNames.name}>{idleMemberUserName}</span>
    </div>
  );
};

export default Card;
