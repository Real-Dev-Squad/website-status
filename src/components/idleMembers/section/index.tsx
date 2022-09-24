import { FC } from 'react';
import Card from '@/components/idleMembers/card';
import classNames from '@/components/idleMembers/section/section.module.scss';
interface userNameImage  {
  name: string,
  imageURL: string
}

type Props = {
  heading: string
  content: Array<userNameImage>
  error: string | null
  isLoading: boolean
}


function renderCards(content: Array<userNameImage>) {
  return content.map((idleMember,index) => (
    <Card idleMemberUserName={idleMember.name} key={index} imageURL={idleMember.imageURL}/>
  ));
}

const Section: FC<Props> = ({
  heading, content, error, isLoading,
}) => (
  <div className={classNames.section}>
    <div className={classNames.heading}>{heading}</div>
    {
      (!!error) && (
        <span className={classNames.statusMessage}>
          Something went wrong, please contact admin!
        </span>
      )
    }
    {
      (isLoading)
        ? (
          <span className={classNames.statusMessage}>Loading...</span>
        )
        : (
          <div className={classNames.cardContainer}>{renderCards(content)}</div>
        )
    }
  </div>
);

export default Section;
