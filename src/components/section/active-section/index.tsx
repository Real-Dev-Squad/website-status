import classNames from './active-section.module.scss';
import Active from '../../challenges/active';
import Constants from '../../constants/display-sections.js';
import PropTypes from 'prop-types';

const ActiveSection = ({ sectionContent, screen }) => {
  let activeContent;

  if (screen === Constants['CHALLENGES_SCREEN_NAME']) {
    activeContent = sectionContent
      .filter((challenge) => challenge.is_active)
      .map((activeChallenge) => (
        <Active key={activeChallenge.id} content={activeChallenge} />
      ));
  }
  return <div className={classNames.active}>{activeContent}</div>;
};

ActiveSection.propTypes = {
  sectionContent: PropTypes.array,
  screen: PropTypes.string,
};

export default ActiveSection;
