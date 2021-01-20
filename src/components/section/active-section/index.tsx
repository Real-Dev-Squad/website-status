import { FC } from 'react';
import Active from '@/components/challenges/active';
import { CHALLENGES_SCREEN } from '@/components/constants/display-sections.js';
import classNames from '@/components/section/active-section/active-section.module.scss';

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
      user_id: string;
      first_name: string;
      last_name: string;
      yoe: number;
      company: string;
      designation: string;
      img: string;
      github_id: string;
      linkedin_id: string;
      twitter_id: string;
      instagram_id: string;
      is_member: number;
      rds_member_id: string;
    }[];
  }[];
  screen: string;
};

const ActiveSection: FC<ActiveSectionProps> = ({ sectionContent, screen }) => {
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
