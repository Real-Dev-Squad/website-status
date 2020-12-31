import { FC } from 'react';
import classNames from './active-section.module.scss';
import Active from '../../challenges/active';
import { CHALLENGES_SCREEN } from '../../constants/display-sections.js';

type ActiveSectionProps = {
  sectionContent: {
    is_active: number;
    id: number;
    is_user_subscribed: number;
    title: string;
    level: string;
    start_date: string;
    end_date: string;
    participants: {
      user_id: string,
      first_name: string,
      last_name: string,
      yoe: number,
      company: string,
      designation: string,
      img: string,
      github_id: string,
      linkedin_id: string,
      twitter_id: string,
      instagram_id: string,
      is_member: number,
      rds_member_id: string
    }[];
  }[];
  screen: string;
};

const ActiveSection: FC<ActiveSectionProps> = ({
  sectionContent,
  screen,
}) => {
  let activeContent;

  if (screen === CHALLENGES_SCREEN) {
    activeContent = sectionContent
      .filter((challenge) => challenge.is_active)
      .map((activeChallenge) => (
        <Active key={activeChallenge.id} content={activeChallenge} />
      ));
  }
  return (
    <div className={classNames.active}>
      <h1 className={classNames.sectionHeading}>Active</h1>
      {activeContent}
    </div>
  );
};

export default ActiveSection;
