import classNames from './completed-section.module.scss';
import Complete from '../../challenges/complete';
import { CHALLENGES_SCREEN } from '../../constants/display-sections.js';
import PropTypes from 'prop-types';

const CompletedSection = ({ sectionContent, screen }) => {
  let completeContent;

  if (screen === CHALLENGES_SCREEN) {
    completeContent = sectionContent
      .filter((challenge) => !challenge.is_active)
      .map((completedChallenge) => (
        <Complete key={completedChallenge.id} content={completedChallenge} />
      ));
  }
  return <div className={classNames.complete}>{completeContent}</div>;
};

CompletedSection.propTypes = {
  sectionContent: PropTypes.array,
  screen: PropTypes.string,
};

export default CompletedSection;
