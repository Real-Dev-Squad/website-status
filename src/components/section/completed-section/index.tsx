import { FunctionComponent } from 'react';
import classNames from './completed-section.module.scss';
import Complete from '../../challenges/complete';
import { CHALLENGES_SCREEN } from '../../constants/display-sections.js';

type CompletedSectionProps = {
  sectionContent: { is_active: number; id: number }[];
  screen: string;
};

const CompletedSection: FunctionComponent<CompletedSectionProps> = ({
  sectionContent,
  screen,
}) => {
  let completeContent;

  if (screen === CHALLENGES_SCREEN) {
    completeContent = sectionContent
      .filter((challenge) => !challenge.is_active)
      .map((completedChallenge) => (
        <Complete key={completedChallenge.id} content={completedChallenge} />
      ));
  }
  return (
    <div className={classNames.complete}>
      <h1 className={classNames.sectionHeading}>Completed</h1>
      {completeContent}
    </div>
  );
};

export default CompletedSection;
