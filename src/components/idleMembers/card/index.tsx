import { FC } from 'react';
import classNames from '@/components/idleMembers/card/card.module.scss';

type Props = {
  idleMemberUserName: string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const imageGenerator = (name: string) => `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${name}/img.png`;

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
        src={imageGenerator(idleMemberUserName)}
        alt={idleMemberUserName}
      />
      <span className={classNames.name}>{idleMemberUserName}</span>
    </div>
  );
};

export default Card;
