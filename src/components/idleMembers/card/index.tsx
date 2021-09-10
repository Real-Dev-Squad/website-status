import { FC } from 'react';
import classNames from '@/components/idleMembers/card/card.module.scss';

const dummyProfile = 'dummyProfile.png';
const url = process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL;

type Props = {
  idleMemberUserName: string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const assigneeProfilePic = (name: string) => `${url}/${name}/img.png`;
  const getMemberDetails = (name: string) => {
    const newWindow = window.open(`https://members.realdevsquad.com/${name}`, '_blank', ' noopener ,norefferrer');
    if (newWindow) newWindow.opener = null;
  };
  const assigneeImageOnError = (e) => {
    e.target.src = dummyProfile;
  };
  return (
    <div
      className={classNames.card}
      onClick={() => getMemberDetails(idleMemberUserName)}
      onKeyDown={() => getMemberDetails(idleMemberUserName)}
      aria-hidden="true"
    >
      <img
        className={classNames.image}
        src={assigneeProfilePic(idleMemberUserName)}
        alt={idleMemberUserName}
        onError={assigneeImageOnError}
      />
      <span className={classNames.name}>{idleMemberUserName}</span>
    </div>
  );
};

export default Card;
