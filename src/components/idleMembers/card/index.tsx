import { FC, SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import classNames from '@/components/idleMembers/card/card.module.scss';
import { DUMMY_PROFILE } from '@/components/constants/display-sections.js';
import { getCloudinaryImgURL } from '@/helperFunctions/getCloudinaryImageUrl';

const CLOUDINARY_IMAGE_CONFIGS = 'w_160,h_160'

type Props = {
  idleMemberUserName: string,
  imageURL:string
}

const Card: FC<Props> = ({ idleMemberUserName }) => {
  const [isImageUnavailable, setIsImageUnavailable] = useState(false);

  const userImageURL = `/${DUMMY_PROFILE}`
  const [assigneeProfilePic, setAssigneeProfilePic] = useState(userImageURL);
  if (idleMemberUserName){
    getCloudinaryImgURL(idleMemberUserName,CLOUDINARY_IMAGE_CONFIGS).then(response=> {
      if (response !== userImageURL) {
        setAssigneeProfilePic(response)
      }
    })
  } 

  const getMemberDetails = (name: string) => {
    const newWindow = window.open(`https://members.realdevsquad.com/${name}`, '_blank', ' noopener ,norefferrer');
    if (newWindow) newWindow.opener = null;
  };
  const assigneeImageOnError = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsImageUnavailable(true);
  };
  return (
    <div
      className={classNames.card}
      onClick={() => getMemberDetails(idleMemberUserName)}
      onKeyDown={() => getMemberDetails(idleMemberUserName)}
      aria-hidden="true"
    >
      <Image
        src={isImageUnavailable ? `/${DUMMY_PROFILE}` : assigneeProfilePic}
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
