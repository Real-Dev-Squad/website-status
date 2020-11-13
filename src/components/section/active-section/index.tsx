import { FunctionComponent } from 'react';
import classNames from './active-section.module.scss';
import Active from '../../challenges/active';
import { CHALLENGES_SCREEN } from '../../constants/display-sections.js';

type ActiveSectionProps = {
  sectionContent: { is_active: number; id: number }[];
  screen: string;
};

const ActiveSection: FunctionComponent<ActiveSectionProps> = ({
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
