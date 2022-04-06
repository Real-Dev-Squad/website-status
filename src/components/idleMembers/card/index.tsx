import { FC, SyntheticEvent } from 'react';
import Image from 'next/image';
import classNames from '@/components/idleMembers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';

const IMAGE_URL = process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL;

type Props = {
  idleMemberUserName: string,
  darkMode: boolean
}

const Card: FC<Props> = ({ idleMemberUserName, darkMode }) => {
  const assigneeProfilePic = (name: string) => `${IMAGE_URL}/${name}/img.png`;
  const getMemberDetails = (name: string) => {
    const newWindow = window.open(`https://members.realdevsquad.com/${name}`, '_blank', ' noopener ,norefferrer');
    if (newWindow) newWindow.opener = null;
  };
  const assigneeImageOnError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DUMMY_PROFILE;
  };
  return (
    <div className={darkMode ? classNames.darkTheme : classNames.lightTheme}>
      <div
        className={classNames.card}
        onClick={() => getMemberDetails(idleMemberUserName)}
        onKeyDown={() => getMemberDetails(idleMemberUserName)}
        aria-hidden="true"
      >
        <Image
          src={assigneeProfilePic(idleMemberUserName)}
          alt={idleMemberUserName}
          onError={assigneeImageOnError}
          width={150}
          height={150}
        />
        <span className={classNames.name}>{idleMemberUserName}</span>
      </div>
    </div>
  );
};

export default Card;
