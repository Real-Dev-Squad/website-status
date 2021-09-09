import { FC, useState } from 'react';
import classNames from '@/components/idleMembers/card/card.module.scss';

type Props = {
  idleMemberUserName: string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const [assignedProfilePic, setAssigneeProfilePic] = useState(`${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}${idleMemberUserName}/img.png`);
  const assigneeImageOnError = () => setAssigneeProfilePic('dummyProfile.png');
  const getMemberDetails = (name: string) => {
    const newWindow = window.open(`https://members.realdevsquad.com/${name}`, '_blank', ' noopener ,norefferrer');
    if (newWindow) newWindow.opener = null;
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
        src={assignedProfilePic}
        alt={idleMemberUserName}
        onError={assigneeImageOnError}
      />
      <span className={classNames.name}>{idleMemberUserName}</span>
    </div>
  );
};

export default Card;
