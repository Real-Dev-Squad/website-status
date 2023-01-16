import { FC } from 'react';
import Card from '@/components/idleUsers/card';
import classNames from '@/components/idleUsers/section/section.module.scss';
import { IdleUserArray, IdleUser } from '@/interfaces/idleUser.type';

function renderCards(content: IdleUser[]) {
  return content.map((idleUser) => (
    <Card user={idleUser} key={idleUser.id} />
  ));
}

const Section: FC<IdleUserArray> = ({
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