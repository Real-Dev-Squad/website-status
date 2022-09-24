import { FC, SyntheticEvent, useEffect, useState , useCallback} from 'react';
import Image from 'next/image';
import classNames from '@/components/idleMembers/card/card.module.scss';
import { DUMMY_PROFILE, DUMMY_PROFILE_PATH } from '@/components/constants/display-sections.js';
import { getCloudinaryImgURL } from '@/helperFunctions/getCloudinaryImageUrl';

const CLOUDINARY_IMAGE_CONFIGS = 'w_160,h_160'

type Props = {
  idleMemberUserName: string,
  imageURL:string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const [isImageAvailable, setIsImageAvailable] = useState(false);

  const userImageUrl = `/dummyProfile.png`
  const [assigneeProfilePic, setAssigneeProfilePic] = useState(userImageUrl);
  if (idleMemberUserName){
    getCloudinaryImgURL(idleMemberUserName).then(response=> {
      if (response !== userImageUrl) {
        setAssigneeProfilePic(response)
      }
    })
  } 

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
        src={isImageAvailable ? `/${DUMMY_PROFILE}` : assigneeProfilePic}
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
